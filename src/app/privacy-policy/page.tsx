// @/app/privacy-policy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>Welcome to Houzze Tec. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@houzzetec.com.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when registering at the Website, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website or otherwise contacting us.</p>
        <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect can include the following: Name and Contact Data, Credentials, Payment Data.</p>
      </section>
      
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
        <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>To facilitate account creation and logon process.</li>
          <li>To send administrative information to you.</li>
          <li>To fulfill and manage your orders.</li>
          <li>To post testimonials.</li>
          <li>To request feedback.</li>
        </ul>
      </section>

      {/* Add more sections as needed: Sharing Your Information, Cookies, Data Retention, Your Privacy Rights, Contact Us */}

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Contact Us</h2>
        <p>If you have questions or comments about this policy, you may email us at privacy@houzzetec.com or by post to:</p>
        <p>Houzze Tec<br />123 Innovation Drive<br />Tech City, TX 75001<br />United States</p>
      </section>
      <p className="text-sm text-muted-foreground">This is a template privacy policy. You should consult with a legal professional to ensure it meets your specific needs and complies with all applicable laws and regulations.</p>
    </div>
  );
}
