import { FaEnvelopeOpenText, FaPhoneAlt } from "react-icons/fa";


const contactInfoList = [
    {
        icon: <FaEnvelopeOpenText />,
        label: "bryanayalaacosta@gmail.com",
        href: "bryanayalaacosta@gmail.com",
    },
    {
        icon: <FaPhoneAlt />,
        label: "+53 58683048",
        href: "+53 58683048",
    },

];

const ContactInfo = () => (
    <div className="mt-5">
        {contactInfoList.map((info, index) => (
            <div
                className=" bg-white shadow dark:bg-gray-800 max-w-[350px] mt-6 flex items-center rounded-xl p-5 "
                key={index}
            >
                <div className="text-3xl px-2 text-yellow">{info.icon}</div>
                <a className="sm:text-lg text-wrap font-medium ml-4 text-textgrey" href={info.href || "#!"}>
                    {info.label}
                </a>
            </div>
        ))}
    </div>
);
export default ContactInfo;