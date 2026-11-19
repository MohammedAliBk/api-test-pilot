import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export interface PrivacyPageProps {
  onBack? : () => void;
}

export const PrivacyPage : React.FC<PrivacyPageProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col selection:bg-primary-subtle selection:text-primary">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 w-full max-w-full border-b border-border bg-background/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            title="Return to ApiTestPilot"
          >
            <div className="w-8 h-8 rounded-control border border-input bg-secondary flex items-center justify-center p-1.5 shadow-scalar-1">
              <Logo size={22} showWordmark={false} />
            </div>
            <span className="font-display font-bold tracking-tight text-foreground text-sm sm:text-base">
              ApiTest<span className="gradient-text">Pilot</span>
            </span>
          </button>
          <span className="text-muted-foreground text-xs hidden sm:inline">&bull;</span>
          <span className="text-muted-foreground text-xs font-mono hidden sm:inline">Privacy Center</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="#terms"
            className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground font-medium px-2.5 py-1.5 rounded-control transition-colors"
          >
            Terms of Service
          </a>
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="h-9 min-h-[36px] px-3 sm:px-3.5 rounded-control text-xs font-semibold flex items-center gap-1.5 border border-border/80 hover:border-foreground/30 bg-card hover:bg-accent text-foreground shadow-scalar-1 btn-press transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Back to Sign In</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 overflow-x-hidden">
        {/* Page Hero Header */}
        <div className="mb-8 pb-6 border-b border-border">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight leading-tight">
            Privacy Policy
          </h1>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">01.</span>
              Information We Collect
            </h2>
            <p>
              To provide autonomous API testing, deterministic validation, and failure diagnosis, we collect the following categories of information :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1.5">
              <li>
                <strong className="text-foreground">Authentication &amp; Profile Data :</strong> Email address, user name, and authentication tokens provided when signing in via email/password or single sign-on (SSO) through Google Firebase Auth.
              </li>
              <li>
                <strong className="text-foreground">OpenAPI Specifications &amp; Schemas :</strong> JSON and YAML specification documents ingested to discover endpoints, schemas, headers, and parameter definitions.
              </li>
              <li>
                <strong className="text-foreground">Test Execution Telemetry :</strong> HTTP response status codes, latency timings, assertion outputs (passed, failed, retried, uncertain), and diagnostic worker execution traces.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">02.</span>
              Handling of Sensitive Credentials &amp; API Keys
            </h2>
            <p>
              API Test Pilot incorporates an engineering-grade secret management architecture :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1.5">
              <li>
                <strong className="text-foreground">Zero Client Plain-Text Secrets :</strong> Target API keys, Bearer tokens, and Basic Auth headers are never stored in client browser localStorage, index databases, or plain-text cookies.
              </li>
              <li>
                <strong className="text-foreground">Redacted Logging :</strong> Worker execution traces automatically mask sensitive authentication headers prior to telemetry persistence.
              </li>
              <li>
                <strong className="text-foreground">Encryption in Transit :</strong> All communications between your browser, our background workers, and your target APIs utilize encrypted TLS 1.3 protocol.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">03.</span>
              AI Processing &amp; Model Governance
            </h2>
            <p>
              When utilizing AI-assisted features (such as automated failure analysis, test payload proposals, or assertion repair) :
            </p>
              <p className="text-xs text-muted-foreground">
                 <strong className="text-foreground">Isolated Ephemeral Processing  :</strong>  Payload schemas and error stack traces sent to the AI service are processed in isolated runtime sessions solely to produce diagnostic recommendations. Your data is not retained by AI model vendors for public training or foundational dataset enrichment.
              </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">04.</span>
              How We Use Collected Information
            </h2>
            <p>We process your data exclusively for legitimate operational purposes :</p>
            <ul className="list-disc list-inside space-y-1 pl-1.5">
              <li>Executing deterministic test runs against designated API targets.</li>
              <li>Calculating endpoint performance and response latency percentiles.</li>
              <li>Providing real-time worker execution logs and resilient workflow recovery.</li>
              <li>Authenticating authorized team members and enforcing workspace permissions.</li>
              <li>Preventing abuse, rate-limit violations, and malicious loopback targeting.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">05.</span>
              Data Retention, Export &amp; Deletion Rights
            </h2>
            <p>
              In accordance with global data protection standards (including GDPR and CCPA principles), you possess complete authority over your stored workspace assets :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1.5">
              <li>
                <strong className="text-foreground">Workspace Purge :</strong> You may delete uploaded OpenAPI specifications and historical test run logs directly from your project settings.
              </li>
              <li>
                <strong className="text-foreground">Account Deletion :</strong> You may request complete erasure of your account and associated team telemetry. Upon verification, all records are permanently excised from active storage within 30 days.
              </li>
              <li>
                <strong className="text-foreground">Data Portability :</strong> Test execution matrices and assertion results may be exported in standard JSON and OpenAPI formats at any time.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">06.</span>
              Subprocessors &amp; Infrastructure
            </h2>
            <p>
              We partner with enterprise-grade cloud providers for authentication (Firebase Auth), containerized worker orchestration, and database persistence. Every subprocessor undergoes rigorous security review and is bound by data processing agreements (DPAs).
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">07.</span>
              Contact Privacy Engineering
            </h2>
            <p>
              If you have inquiries regarding our data handling practices or wish to submit a formal data privacy or deletion request, please reach out directly to our privacy team at{' '}
              <a href="mailto :privacy@apitestpilot.com" className="text-primary hover:underline font-mono">
                privacy@apitestpilot.com
              </a>.
            </p>
          </section>
        </div>

        {/* Page Footer CTA */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>API Test Pilot</span>
            <span className="text-muted-foreground text-xs hidden sm:inline">&bull;</span>
            <span className="text-muted-foreground text-xs font-mono hidden sm:inline">Legal Terms</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="#terms"
              className="flex-1 sm:flex-initial w-full sm:w-auto text-center h-9 min-h-[36px] px-3 sm:px-4 rounded-control border border-border/80 hover:border-foreground/30 bg-card hover:bg-accent text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 shadow-scalar-1 btn-press transition-colors cursor-pointer"
            >
              <span className="truncate">Terms of Service</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <Button
              type="button"
              onClick={handleBack}
              className="flex-1 sm:flex-initial w-full sm:w-auto h-9 min-h-[36px] px-3 sm:px-5 rounded-control bg-primary text-primary-foreground hover:bg-primary-hover border border-primary/20 text-xs font-semibold cursor-pointer shadow-scalar-2 hover:shadow-hero btn-press transition-all"
            >
              <span className="truncate">Return to Sign In</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
