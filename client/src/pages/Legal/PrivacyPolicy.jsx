import { useEffect } from "react";

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | Imprenta";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Read Imprenta's Privacy Policy to understand how we collect, use, protect and manage information submitted through our website and enquiry forms.");
        }
    }, []);

    return (
        <div className="bg-[#050B14] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 max-w-4xl mx-auto border-none">
                <div className="mb-12">
                    <span className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Privacy Policy</h1>
                    <p className="text-slate-400 text-lg">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-10 text-slate-300 leading-relaxed bg-white/5 border border-white/10 p-8 md:p-12 rounded-[30px] backdrop-blur-xl">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>Welcome to Imprenta. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our printing, packaging, labelling, and corporate branding services. We are committed to protecting your personal data and your privacy.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-3">We may collect personal identification and business information, including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Name, email address, and phone number.</li>
                            <li>Company and business details.</li>
                            <li>Product and project requirements, including sample enquiries.</li>
                            <li>Messages and artwork submitted through our forms.</li>
                            <li>Communication preferences.</li>
                            <li>Technical and usage information (e.g., IP address, browser type) where applicable.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Responding to your business enquiries and providing quotations.</li>
                            <li>Processing request/sample inquiries for flexible packaging, mono cartons, and labels.</li>
                            <li>Customer and business communication regarding your projects.</li>
                            <li>Improving our customized branding services and website functionality.</li>
                            <li>Sending updates, offers, or newsletters where you have explicitly provided consent.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Communication Consent</h2>
                        <p>By opting into our communications, you consent to receive information via SMS, RCS, Email, and WhatsApp. This includes transactional updates regarding your orders and promotional communications. You may opt out of promotional communications at any time by contacting us or using an unsubscribe link.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Website Analytics</h2>
                        <p>We may use cookies and similar tracking technologies to track activity on our website, enhance user experience, and analyze trends. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Data Sharing and Disclosure</h2>
                        <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with trusted affiliates for the purposes outlined above. We may also disclose information to comply with legal obligations or protect our rights.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Data Security</h2>
                        <p>We adopt reasonable data collection, storage, processing practices, and security measures designed to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, transaction information, and data stored on our site.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                        <p>We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, and to the extent necessary to comply with our legal obligations or resolve disputes.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. User Rights / Choices</h2>
                        <p>Depending on your location, you may have rights to access, correct, or delete your personal data. If you have any inquiries regarding your data, please contact us directly.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Services</h2>
                        <p>We may use third-party service providers (such as hosting, analytics, and shipping partners) to help us operate our business. These third parties have access to your personal information only to perform these tasks on our behalf.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. External Links</h2>
                        <p>Our website may contain links to other sites. If you click on a third-party link, you will be directed to that site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for third-party content.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Children's Privacy</h2>
                        <p>Our services and this website are intended for B2B audiences and adult consumers. We do not knowingly collect personally identifiable information from anyone under the age of 18.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Policy Updates</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                        <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                        <ul className="mt-2 list-none space-y-1 text-sky-300">
                            <li>Phone: +91 94270 61888</li>
                            <li>Email: contact@imprenta.in</li>
                            <li>Address: Plot No: - 822/1, Block No:- 2024/1, Rakanpur Gam Road, Nr. Leo Polymers, Rakanpur, Tal:- Kalol, Dist.:- Gandhinagar Gujarat:- 382 721</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
