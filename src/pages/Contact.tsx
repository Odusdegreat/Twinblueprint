import { Helmet } from "react-helmet-async";
import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageNav from "@/components/PageNav";
import { BASE_URL, BUSINESS_TELEPHONE, BUSINESS_TELEPHONE_DISPLAY } from "@/lib/constants";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, getWebPageSchema } from "@/lib/seo";

const pageTitle = "Contact Twinblueprint | Speak with Our Team";
const pageDescription = "Contact Twinblueprint about technology consulting, digital transformation, Digital Twin and visualisation projects.";

const Contact = () => {
  const contactUrl = `${BASE_URL}/contact`;

  return (
    <>
      <Helmet defer={false}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={contactUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={contactUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(getWebPageSchema(pageTitle, contactUrl, pageDescription))}</script>
      </Helmet>
      <Navbar />
      <main>
        <header className="bg-hero pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-hero-foreground">Contact Twinblueprint</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-hero-muted">
              Talk with our team about your technology, Digital Twin or visualisation project.
            </p>
          </div>
        </header>
        <section className="section-padding bg-background">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Email or call us directly.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <a className="inline-flex items-center gap-3 text-lg font-semibold text-primary hover:underline" href="mailto:info@twinblueprint.com">
                <Mail className="h-5 w-5" aria-hidden="true" />
                info@twinblueprint.com
              </a>
              <a className="inline-flex items-center gap-3 text-lg font-semibold text-primary hover:underline" href={`tel:${BUSINESS_TELEPHONE}`}>
                {BUSINESS_TELEPHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>
      <PageNav />
    </>
  );
};

export default Contact;