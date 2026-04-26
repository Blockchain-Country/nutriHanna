import Modal from '@components/ui/Modal/Modal'
import ContactForm from '@components/Contact/ContactForm'
import './BookingModal.css'

const BookingModal = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Записаться на консультацию"
    size="md"
  >
    <div className="booking-modal__intro">
      <p>Оставьте контактные данные — я свяжусь в течение 24 часов и мы договоримся об удобном времени.</p>
    </div>
    <ContactForm />
  </Modal>
)

export default BookingModal
