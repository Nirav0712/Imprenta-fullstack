import { useState, useEffect } from "react";
import FooterTop from "./FooterTop";
import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";
import { fetchSettings } from "../../services/api";

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const res = await fetchSettings();
        if (res?.data) {
          setSettings(res.data);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };
    getSettings();
  }, []);

  return (
    <>
      <FooterTop />
      <FooterLinks />
      <FooterBottom settings={settings} />
    </>
  );
};

export default Footer;