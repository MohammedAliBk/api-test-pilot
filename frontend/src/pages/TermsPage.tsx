import React from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { navigateTo } from '@/lib/navigation';

export interface TermsPageProps {
  onBack? : () => void;
}

export const TermsPage : React.FC<TermsPageProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigateTo('/login');
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
          <span className="text-muted-foreground text-xs font-mono hidden sm:inline">Legal Terms</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="/privacy"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/privacy');
            }}
            className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground font-medium px-2.5 py-1.5 rounded-control transition-colors"
          >
            Privacy Policy
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
          <h1 className="text-2xl sm:text-3xl md :text-4xl font-display font-bold text-foreground tracking-tight leading-tight">
            Terms of Service
          </h1>
        </div>
        {/* Legal Sections */}
        <div className="space-y-8 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">01.</span>
              Acceptance of Terms
            </h2>
            <p>
              These Terms of Service represent a binding legal contract between you and API Test Pilot. Accessing our service, importing OpenAPI specifications, creating an account via email or Google SSO, or utilizing background execution workers establishes complete acceptance of these Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">02.</span>
              Permitted Use &amp; Target Endpoint Authorization
            </h2>
            <p>
              API Test Pilot issues synthetic HTTP requests and validation assertions against target URLs designated by you. Because test executions may generate load or simulate edge cases, you strictly agree to the following conditions :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1.5">
              <li>
                <strong className="text-foreground">Explicit Authorization Required :</strong> You represent and warrant that you own or have obtained formal authorization from the infrastructure owner to test every endpoint configured in your workspace.
              </li>
              <li>
                <strong className="text-foreground">Restricted Ingress &amp; Loopback Prohibition :</strong> Automated workers are strictly prohibited from targeting private loopback addresses, local subnet ranges (RFC 1918), internal cloud metadata IP addresses , or non-public services without specialized zero-trust agent authorization.
              </li>
              <li>
                <strong className="text-foreground">No Denial-of-Service or Exploitation :</strong> You may not use API Test Pilot to conduct denial-of-service (DDoS) attacks, unauthorized vulnerability fuzzing, credential stuffing, or destructive payloads intended to impair third-party services.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">03.</span>
              Deterministic Validation Proof vs. AI Heuristic Analysis
            </h2>
            <p>
              API Test Pilot maintains strict technical and visual segregation between deterministic validation proof and AI-assisted analysis :
            </p>

            <ul className="list-disc list-inside space-y-1.5 pl-1.5">
              <li>
                <strong className="text-foreground">Deterministic Proof : </strong>  Status codes, schema contract mismatches, and assertion validations reflect concrete HTTP network responses received from your target service.
              </li>
              <li>
                <strong className="text-foreground">AI Diagnostic Heuristics : </strong>  AI-generated failure explanations, recovery strategies, and test synthesis are automated advisory heuristics. You remain responsible for validating suggestions prior to production deployment.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">04.</span>
              Intellectual Property &amp; Customer Schemas
            </h2>
            <p>
              You retain all right, title, and interest in and to your OpenAPI specifications, endpoint definitions, payload schemas, and test results. API Test Pilot does not claim ownership over any customer-provided specifications. We do not sell, rent, or distribute your proprietary API schemas to third parties or use them to train public foundation models without explicit agreement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">05.</span>
              Security &amp; Secret Credential Management
            </h2>
            <p>
              The platform implements zero plain-text secret retention architecture. Authentication tokens, Bearer keys, and environment variables are encrypted in transit and at rest. You are responsible for safeguarding your user account credentials and ensuring team members adhere to least-privilege API key permissions.
            </p>
          </section> 
          
          {/* Section 6 */}
          <section className="space-y-2.5">
            <h2 className="text-base font-display font-bold text-foreground flex items-center gap-2">
              <span className="font-mono text-primary text-xs">06.</span>
              Modifications &amp; Inquiries
            </h2>
            <p>
              We may revise these Terms periodically to reflect evolving platform capabilities or regulatory requirements. Continued use of the platform after updates constitutes acceptance. For inquiries regarding enterprise licensing, custom compliance, or terms, contact us at{' '}
              <a href="mailto :legal@apitestpilot.com" className="text-primary hover:underline font-mono">
                legal@apitestpilot.com
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
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/privacy');
              }}
              className="flex-1 sm:flex-initial w-full sm:w-auto text-center h-9 min-h-[36px] px-3 sm:px-4 rounded-control border border-border/80 hover:border-foreground/30 bg-card hover:bg-accent text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 shadow-scalar-1 btn-press transition-colors cursor-pointer"
            >
              <span className="truncate">Privacy Policy</span>
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
