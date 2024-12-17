import ContactInfo from "./ContactInfo";
import ContactFormCard from "./ContactFormCard";

const ContactBoxMain = () => {
    return (
        <section className="bg-lightGrey py-14 text-zinc-900 flex justify-center sm:px-[10%] lg:px-[5%] ">
            <div className="container px-4">
                <div className="grid grid-cols-12 py-6 lg:gap-8">
                    <div className="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
                        <h2 className="text-2xl text-yellow font-bold mb-6">How can we help you?</h2>
                        <p className="text-lg">
                        ¡Estamos aquí para ayudarte a llevar tu proyecto al siguiente nivel! No dudes en contactarnos
                        </p>
                        <ContactInfo />
                    </div>
                    <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                        <ContactFormCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBoxMain;