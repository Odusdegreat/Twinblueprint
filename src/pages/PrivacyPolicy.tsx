import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/lib/constants";
import { getWebPageSchema, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from "@/lib/seo";
import { openAnalyticsConsent } from "@/lib/analytics";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, including: name, email address, phone number, company name, and project details when you fill out forms, request quotes, or communicate with us. We also collect usage data such as IP addresses, browser type, device information, and cookies to improve our service and user experience.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to: provide, maintain, and improve our services; process transactions and send related information; send promotional communications (with your consent); respond to your comments, questions, and requests; monitor and analyze usage patterns and trends; and detect, investigate, and prevent fraudulent or unauthorized activities.",
  },
  {
    title: "Information Sharing and Disclosure",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information with: service providers who assist us in operating our website and business; professional advisers such as lawyers and accountants when necessary; and when required by law or to protect our rights.",
  },
  {
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Cookies and Tracking Technologies",
    content:
      "We record anonymous page views and button clicks using our hosting provider to understand how the site is used; this first-party tracking does not use cookies or identify you personally. Google Analytics 4 is enabled only if you allow analytics. We do not send form contents, names, email addresses, phone numbers, or company contact details to Google Analytics. You can change your choice at any time using the analytics preferences below.",
  },
  {
    title: "Your Rights",
    content:
      "Depending on your location, you may have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion of your personal information; object to or restrict certain processing; data portability; and withdraw consent at any time.",
  },
  {
    title: "Third Party Links",
    content:
      "Our website may contain links to third party websites, services, or applications. We are not responsible for the privacy practices of these third parties, and we encourage you to review their privacy policies before providing any personal information.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of our services after any changes constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy or our privacy practices, please contact us at hello@meta-dology.com. We will endeavor to respond to your inquiry as soon as possible.",
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Twinblueprint</title>
        <meta name="description" content="Twinblueprint Privacy Policy - How we collect, use, and protect your personal information when you use our Digital Twin and architectural visualisation services." />
        <link rel="canonical" href={`${BASE_URL}/privacy-policy`} />
        <meta property="og:title" content="Privacy Policy | Twinblueprint" />
        <meta property="og:description" content="How we collect, use, and protect your personal information when you use our Digital Twin and architectural visualisation services." />
        <meta property="og:url" content={`${BASE_URL}/privacy-policy`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Twinblueprint" />
        <meta name="twitter:description" content="How we collect, use, and protect your personal information when you use our Digital Twin and architectural visualisation services." />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getWebPageSchema("Privacy Policy", `${BASE_URL}/privacy-policy`, "Twinblueprint Privacy Policy - How we collect, use, and protect your personal information."))}</script>
      </Helmet>
      <Navbar />
      <main>
        <header className="bg-hero pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-hero-foreground mb-6">
                Privacy <span className="text-gradient">Policy</span>
              </h1>
              <p className="text-hero-muted text-lg md:text-xl leading-relaxed">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
            </motion.div>
          </div>
        </header>

        <section className="section-padding bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-12 pb-8 border-b border-border"
              >
                <strong>Last Updated:</strong> April 21, 2026
              </motion.p>

              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="mb-10"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={openAnalyticsConsent}
                className="min-h-11 rounded-md border border-border px-4 text-sm font-medium text-foreground hover:bg-muted"
              >
                Manage analytics preferences
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;