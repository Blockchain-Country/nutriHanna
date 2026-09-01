import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.OWNER_EMAIL_APP_PASSWORD,
  },
})

const app  = express()
const PORT = process.env.PORT || 3001

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('[server] STRIPE_SECRET_KEY is not set. Payments will not work.')
  process.exit(1)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

// Amounts in the smallest currency unit (cents for USD).
// Defined server-side so the client cannot manipulate prices.
const PACKAGES = {
  consultation: { amount: 7500,  currency: 'usd', name: 'Индивидуальная консультация' },
  plan:         { amount: 20000, currency: 'usd', name: 'Онлайн-сопровождение (30 дней)' },
  program:      { amount: 45000, currency: 'usd', name: 'Сопровождение (3 месяца)' },
  course:       { amount: 20000, currency: 'usd', name: 'Групповой курс' },
}

// In-memory de-dup guard: Stripe retries webhooks on any non-2xx/timeout,
// which would otherwise re-send the owner notification email on every retry.
// Per-process only — resets on restart — but covers the common retry-storm case.
const PROCESSED_EVENT_IDS = new Set()
const MAX_PROCESSED_IDS = 500

const rememberEvent = (id) => {
  PROCESSED_EVENT_IDS.add(id)
  if (PROCESSED_EVENT_IDS.size > MAX_PROCESSED_IDS) {
    PROCESSED_EVENT_IDS.delete(PROCESSED_EVENT_IDS.values().next().value)
  }
}

// ── Webhook must receive the raw body BEFORE express.json() middleware ──────
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature']

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('[webhook] STRIPE_WEBHOOK_SECRET is not configured — refusing to process unverified events')
      return res.status(500).json({ error: 'Webhook secret not configured' })
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('[webhook] Signature verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'payment_intent.succeeded') {
      if (PROCESSED_EVENT_IDS.has(event.id)) {
        console.log(`[webhook] Duplicate event ${event.id} — already processed, skipping`)
        return res.json({ received: true })
      }
      rememberEvent(event.id)

      const intent = event.data.object
      const packageName = intent.metadata.packageName ?? intent.metadata.packageId ?? 'Unknown'
      const amountFormatted = (intent.amount / 100).toFixed(2)
      console.log(`[webhook] payment_intent.succeeded — id: ${intent.id}, package: ${packageName}`)

      if (process.env.OWNER_EMAIL && process.env.OWNER_EMAIL_APP_PASSWORD) {
        let customerName = 'not provided'
        if (intent.latest_charge) {
          try {
            const charge = await stripe.charges.retrieve(intent.latest_charge)
            customerName = charge.billing_details?.name ?? 'not provided'
          } catch (err) {
            console.warn('[webhook] Could not retrieve charge for billing details:', err.message)
          }
        }

        mailer.sendMail({
          from: process.env.OWNER_EMAIL,
          to:   process.env.OWNER_EMAIL,
          subject: `New payment received — ${packageName}`,
          text: [
            `A payment was successfully completed.`,
            ``,
            `Package:    ${packageName}`,
            `Amount:     ${amountFormatted} ${intent.currency.toUpperCase()}`,
            `Payment ID: ${intent.id}`,
            `Customer:   ${customerName}`,
            `Email:      ${intent.receipt_email ?? 'not provided'}`,
          ].join('\n'),
        }).catch(err => console.error('[webhook] Failed to send owner email:', err.message))
      }
    }

    // Acknowledge quickly; Stripe retries if response takes > ~30 s
    res.json({ received: true })
  }
)

// ── Regular JSON middleware (applied AFTER the raw-body webhook route) ────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173']

app.use(cors({ origin: allowedOrigins, credentials: false }))
app.use(express.json())

// ── Create PaymentIntent ──────────────────────────────────────────────────────
app.post('/api/create-payment-intent', async (req, res) => {
  const { packageId } = req.body ?? {}

  const pkg = PACKAGES[packageId]
  if (!pkg) {
    return res.status(400).json({ error: `Unknown packageId: "${packageId}"` })
  }

  try {
    const intent = await stripe.paymentIntents.create({
      amount:   pkg.amount,
      currency: pkg.currency,
      metadata: { packageId, packageName: pkg.name },
      automatic_payment_methods: { enabled: true },
    })

    res.json({ clientSecret: intent.client_secret })
  } catch (err) {
    console.error('[create-payment-intent] Stripe error:', err.message)
    res.status(500).json({ error: 'Не удалось инициализировать платёж. Попробуйте ещё раз.' })
  }
})

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`[server] Payment server running at http://localhost:${PORT}`)
})
