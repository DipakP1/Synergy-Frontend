import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg" style={{ height: "80vh", marginTop: "90px", overflow: "scroll" }}>
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
            <p className="text-gray-600 text-sm text-center mb-4">Effective Date: March 1st, 2024</p>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                <p>
                    SynergiSolutions LLC ("we," "our," or "us") values your privacy and is committed
                    to protecting your personal information. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when you visit our
                    website, synergisolutions.net (the "Site"). By using our Site, you agree to the
                    terms of this Privacy Policy.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
                <h3 className="text-lg font-medium mt-2">a. Personal Information</h3>
                <ul className="list-disc list-inside">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Business information (if applicable)</li>
                    <li>Any information you submit through our contact form or consultation requests</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">b. Technical Information</h3>
                <ul className="list-disc list-inside">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our Site</li>
                    <li>Cookies and tracking technology data</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">c. Payment Information</h3>
                <p>
                    If you engage our services, we may collect billing details, payment method, and
                    transaction history.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside">
                    <li>To Provide Services: Facilitate consultations and respond to inquiries.</li>
                    <li>To Improve Our Services: Analyze visitor trends and enhance user experience.</li>
                    <li>To Process Payments: Handle transactions for our consulting services.</li>
                    <li>To Communicate With You: Send updates, newsletters, and promotional content.</li>
                    <li>Legal and Compliance Obligations: Adhere to applicable regulations.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. How We Share Your Information</h2>
                <p>We do not sell or rent your personal information. However, we may share it under the following circumstances:</p>
                <ul className="list-disc list-inside">
                    <li>Service Providers: Third-party vendors assisting in service delivery.</li>
                    <li>Legal Obligations: Compliance with legal and regulatory requirements.</li>
                    <li>Business Transfers: In case of mergers, acquisitions, or sales.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
                <p>
                    We implement technical and organizational measures to protect your information.
                    While no method is 100% secure, we take reasonable precautions to safeguard your data.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Your Privacy Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside">
                    <li>Access, correct, or delete your personal information.</li>
                    <li>Opt-out of marketing emails via the "unsubscribe" link.</li>
                </ul>
                <p>To exercise these rights, contact us at synergicare@synergisolutions.net.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Cookies and Tracking Technologies</h2>
                <p>
                    Our Site may use cookies. You can control cookie settings in your browser. Disabling
                    cookies may affect certain functionalities.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
                <p>
                    Our Site may contain links to third-party websites. We are not responsible for their
                    privacy practices and encourage you to review their policies before providing any
                    information.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy periodically. Changes will be posted with an
                    updated "Effective Date." Continued use of our Site after changes indicates
                    acceptance.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                <p>
                    If you have any questions, contact us at:
                    <br />
                    <strong>SynergiSolutions LLC</strong>
                    <br />
                    Email: <a href="mailto:synergicare@synergisolutions.net" className="text-blue-600 underline">synergicare@synergisolutions.net</a>
                    <br />
                    Phone: [Insert Phone Number]
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
