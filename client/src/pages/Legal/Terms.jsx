import { useEffect } from "react";
import { Link } from "react-router-dom";

const Terms = () => {
    useEffect(() => {
        document.title = "Terms & Conditions | Imprenta";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', "Read Imprenta's Terms & Conditions covering website usage, printing and packaging enquiries, quotations, customized products and business communication.");
        }
    }, []);

    return (
        <div className="bg-[#050B14] min-h-screen pt-32 pb-24 font-sans text-white">
            <div className="w-full px-4 sm:px-7 lg:px-11 xl:px-15 2xl:px-19 max-w-4xl mx-auto">
                <div className="mb-12">
                    <span className="text-sky-400 font-bold uppercase tracking-wider text-sm mb-3 block">Legal</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Terms & Conditions</h1>
                    <p className="text-slate-400 text-lg">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-10 text-slate-300 leading-relaxed bg-white/5 border border-white/10 p-8 md:p-12 rounded-[30px] backdrop-blur-xl">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>Welcome to Imprenta. These Terms & Conditions govern your use of our website and our B2B printing, packaging, labels, and customized corporate branding enquiry workflow. By accessing or using our website, you agree to be bound by these terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Website Usage</h2>
                        <p>This website is intended to provide information about our products and services and facilitate business enquiries. You agree to use this site for lawful purposes and not to compromise its security or access unauthorized areas.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Products and Services</h2>
                        <p>Our solutions include, but are not limited to, shrink sleeves, seamless tubes, mono cartons, custom labels, and design services. Information provided on the website is for general guidance and may be updated without prior notice.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Product Information</h2>
                        <p>While we strive for accuracy, the descriptions and images of our printing and packaging solutions provided on the website may occasionally contain inaccuracies. Final product specifications will be confirmed during the quotation and ordering phase.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Custom Printing & Packaging Enquiries</h2>
                        <p>Enquiries submitted via our contact forms or request wizards establish a communication channel. Submitting an enquiry does not constitute a binding contract until a formal quotation is provided and approved by both parties.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Quotes and Pricing</h2>
                        <p>Pricing for custom B2B printing and packaging is calculated based on specific requirements, material selection, and volume. Formal quotations provided by our team govern the specific commercial terms of your order and are valid for the period stated on the quote itself.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Artwork / Design Responsibility</h2>
                        <p>For custom printed products, clients are responsible for providing high-resolution artwork as per our required specifications. We are not liable for production errors resulting from incorrect, low-resolution, or unapproved client-provided files. Final artwork proofs must be formally approved before production begins.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Product Specifications</h2>
                        <p>Due to the nature of custom manufacturing, slight variations in color, material texture, and sizing may occur. Such variations within standard industry tolerances are acceptable and do not constitute a defect.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Orders and Confirmations</h2>
                        <p>An order is only confirmed once you have approved the formal quotation, verified the artwork proof, and met the required payment terms as stipulated in the order confirmation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Production Timelines</h2>
                        <p>Estimated production dates will be provided upon order confirmation. However, manufacturing involves complex variables, and delays may occasionally occur. We will keep you updated on your order's status.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Delivery / Shipping</h2>
                        <p>Delivery obligations and guarantees are specifically governed by the terms established in your individual quotation/order confirmation. We are not liable for delays caused by third-party shipping carriers or unforeseen circumstances.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Samples</h2>
                        <p>Sample requests are subject to approval and may incur a fee depending on the complexity of the requirement. Sample terms will be directly communicated by our sales team.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Payments</h2>
                        <p>Payment terms will be explicitly defined in your order confirmation invoice. We do not process direct B2B manufacturing payments automatically through the website unless stated otherwise.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">14. Cancellations / Changes</h2>
                        <p>As orders are highly customized, cancellations or changes once mass production has commenced are typically not permitted and will incur costs commensurate with the work already executed.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">15. Intellectual Property</h2>
                        <p>All content on this website, including designs, text, graphics, and logos, is the property of Imprenta or its content suppliers and is protected by copyright and intellectual property laws.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">16. User-Submitted Content</h2>
                        <p>By submitting designs and artwork to us, you warrant that you hold the legal right and necessary licenses to use those materials, and you agree to indemnify Imprenta against any IP infringement claims.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">17. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law, Imprenta shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or services beyond the specific terms defined in your order confirmation.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">18. Third-Party Links/Services</h2>
                        <p>Our website may link to external sites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">19. Privacy</h2>
                        <p>Your privacy is important to us. Please review our <Link to="/privacy-policy" className="text-sky-400 hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information, including your communication preferences.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">20. Changes to Terms</h2>
                        <p>We reserve the right to modify these Terms at any time. Changes take effect immediately upon posting to the website. Your continued use of the site signifies your acceptance of the updated terms.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">21. Governing Law / Jurisdiction</h2>
                        <p>These terms and any customized manufacturing agreements shall be governed by and construed in accordance with the laws of India, particularly within the jurisdiction covering Vapi, Gujarat.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
