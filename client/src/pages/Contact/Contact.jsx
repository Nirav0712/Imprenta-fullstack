import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ContactHero from "../../components/contact/ContactHero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import ContactMap from "../../components/contact/ContactMap";
import FAQ from "../../components/contact/FAQ";


const Contact = () => {

  const location = useLocation();

  useEffect(() => {

    if (location.hash) {

      const element = document.querySelector(location.hash);

      if (element) {

        setTimeout(() => {

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        }, 100);

      }

    }

  }, [location]);

  return (
    <>
      <ContactHero />

      <ContactForm />

      <ContactInfo />

      <ContactMap />

    </>
  );
};

export default Contact;