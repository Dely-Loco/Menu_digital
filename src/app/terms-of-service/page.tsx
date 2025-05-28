// @/app/terms-of-service/page.tsx
export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-4xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
        <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the Site or through other communications.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">2. Use of Services</h2>
        <p>You may use the Services only if you are 18 years or older and are not barred from using the Services under applicable law. You agree not to use the Services for any illegal or unauthorized purpose.</p>
      </section>
      
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">3. Accounts</h2>
        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">4. Purchases</h2>
        <p>If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
      </section>
      
      {/* Add more sections as needed: Content, Intellectual Property, Termination, Disclaimer of Warranties, Limitation of Liability, Governing Law, Contact Us */}

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at legal@houzzetec.com.</p>
      </section>
      <p className="text-sm text-muted-foreground">This is a template terms of service. You should consult with a legal professional to ensure it meets your specific needs and complies with all applicable laws and regulations.</p>
    </div>
  );
}
