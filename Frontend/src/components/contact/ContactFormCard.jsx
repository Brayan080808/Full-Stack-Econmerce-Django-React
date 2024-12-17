import ContactForm from "./ContactForm";

const ContactFormCard = () => (
    <div className="bg-white shadow-2xl   rounded-2xl p-6 md:p-12">
        <h2 className="text-2xl font-bold mb-4 text-yellow">Contact Us</h2>
        <p className="text-lg mb-12">
        "Déjanos los detalles y disfruta de más tiempo para hacer crecer tu negocio."
        </p>
        <ContactForm />
    </div>
);
export default ContactFormCard