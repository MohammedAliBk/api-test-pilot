import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
  Send,
  Zap,
  HelpCircle,
  Search,
  Code,
  Copy,
  Check,
  Terminal,
  Server,
  Layers,
  Palette,
  Sliders,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Logo } from './ui/Logo';

// Zod Schema for Spec URL Input
const specFormSchema = z.object({
  specUrl: z
    .string()
    .url({ message: 'Must be a valid HTTP or HTTPS URL' })
    .refine((url) => !url.includes('localhost') && !url.includes('127.0.0.1'), {
      message: 'Loopback and private network targets are restricted by security policy',
    }),
});

type SpecFormValues = z.infer<typeof specFormSchema>;

const mockLatencyData = [
  { endpoint: 'Auth', duration: 42 },
  { endpoint: 'Projects', duration: 110 },
  { endpoint: 'Endpoints', duration: 75 },
  { endpoint: 'Test Runs', duration: 195 },
  { endpoint: 'Results', duration: 88 },
  { endpoint: 'Recover', duration: 145 },
];

export const TeamShowcase: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [copied, setCopied] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SpecFormValues>({
    resolver: zodResolver(specFormSchema),
    defaultValues: {
      specUrl: 'https://petstore.swagger.io/v2/swagger.json',
    },
  });

  const onSubmit = (data: SpecFormValues) => {
    setSubmittedUrl(data.specUrl);
    reset();
  };

  return (
    <div className="min-h-screen bg-surface text-text-primary p-6 max-w-7xl mx-auto flex flex-col gap-10">
      {/* 1. Header & Navigation Shell */}
      <header className="flex flex-wrap items-center justify-between pb-6 border-b border-line gap-4">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="px-2 py-0.5 rounded-pill bg-primary-subtle text-primary font-mono text-[11px] font-bold uppercase tracking-wider border border-primary/20">
            v0.0.1-alpha
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-control bg-surface-subtle text-text-secondary text-xs font-medium border border-line">
            Team Design & Component Reference
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="min-h-[36px] px-3.5 py-1.5 rounded-control border border-line-strong bg-surface-raised hover:bg-surface-subtle text-text-primary text-[13px] font-medium btn-press flex items-center gap-2 cursor-pointer transition-all duration-150 shadow-scalar-1"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-primary" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-warning" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. Color Palette & Surface Tokens */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Palette className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            1. Brand Identity & Surfaces (Landing Page + Dual Theme)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {/* Electric Azure */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-primary flex items-center justify-center text-white text-xs font-bold shadow-hero">
              Primary
            </div>
            <div>
              <p className="text-xs font-bold">Electric Azure</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-primary</p>
            </div>
          </div>

          {/* Electric Violet Glow */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-[var(--color-primary-glow)] flex items-center justify-center text-white text-xs font-bold shadow-glow-purple">
              Glow
            </div>
            <div>
              <p className="text-xs font-bold">Electric Violet</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-primary-glow</p>
            </div>
          </div>

          {/* Canvas Workspace */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-surface border border-line-strong flex items-center justify-center text-text-secondary text-xs font-medium">
              Canvas
            </div>
            <div>
              <p className="text-xs font-bold">Base Canvas</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-surface</p>
            </div>
          </div>

          {/* Elevated Card */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-surface-raised border border-line-strong flex items-center justify-center text-text-primary text-xs font-medium shadow-scalar-1">
              Raised
            </div>
            <div>
              <p className="text-xs font-bold">Elevated Card</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-surface-raised</p>
            </div>
          </div>

          {/* Subtle Row / Input */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-surface-subtle border border-line flex items-center justify-center text-text-secondary text-xs font-medium">
              Subtle
            </div>
            <div>
              <p className="text-xs font-bold">Active / Input</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-surface-subtle</p>
            </div>
          </div>

          {/* Success Emerald */}
          <div className="p-3.5 rounded-card border border-line bg-surface-raised flex flex-col gap-2">
            <div className="h-10 w-full rounded-control bg-state-passed-bg border border-state-passed-border text-state-passed-fg flex items-center justify-center text-xs font-bold">
              Verified
            </div>
            <div>
              <p className="text-xs font-bold">Neon Emerald</p>
              <p className="text-[11px] font-mono text-text-secondary">--color-success</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Domain Test States Bar (Scalar Pill Metaphor) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            2. Domain Test Execution States (Scalar Pill Ergonomics)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {/* Queued */}
          <div className="py-2 px-3 rounded-pill border border-state-queued-border bg-state-queued-bg text-state-queued-fg text-center flex items-center justify-center gap-1.5">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Queued</span>
          </div>

          {/* Running */}
          <div className="py-2 px-3 rounded-pill border border-state-running-border bg-state-running-bg text-state-running-fg text-center flex items-center justify-center">
            <span className="shimmer-text text-[11px] font-mono font-bold uppercase tracking-wide">
              Running
            </span>
          </div>

          {/* Passed */}
          <div className="py-2 px-3 rounded-pill border border-state-passed-border bg-state-passed-bg text-state-passed-fg text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Passed</span>
          </div>

          {/* Failed */}
          <div className="py-2 px-3 rounded-pill border border-state-failed-border bg-state-failed-bg text-state-failed-fg text-center flex items-center justify-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Failed</span>
          </div>

          {/* Error */}
          <div className="py-2 px-3 rounded-pill border border-state-error-border bg-state-error-bg text-state-error-fg text-center flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Error</span>
          </div>

          {/* Retrying */}
          <div className="py-2 px-3 rounded-pill border border-state-retrying-border bg-state-retrying-bg text-state-retrying-fg text-center flex items-center justify-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Retrying</span>
          </div>

          {/* Recovered */}
          <div className="py-2 px-3 rounded-pill border border-state-recovered-border bg-state-recovered-bg text-state-recovered-fg text-center flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Recovered</span>
          </div>

          {/* Uncertain */}
          <div className="py-2 px-3 rounded-pill border border-state-uncertain-border bg-state-uncertain-bg text-state-uncertain-fg text-center flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-medium uppercase tracking-wide">Uncertain</span>
          </div>
        </div>
      </section>

      {/* 4. Technical Form Controls & 36px Metric (Scalar Shapes) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Sliders className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            3. Technical Controls & Inputs (Scalar 4px Radius & 36px Metric)
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-6">
          {/* OpenAPI Input Box */}
          <div className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4 shadow-scalar-2">
            <div>
              <h3 className="text-base font-bold">OpenAPI Specification Importer</h3>
              <p className="text-text-secondary text-xs mt-1">
                Compact 36px height, 4px engineering radius, and sharp hairline focus.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="specUrl" className="text-xs font-bold text-text-secondary">
                  OpenAPI Specification URL
                </label>
                <input
                  id="specUrl"
                  type="text"
                  {...register('specUrl')}
                  placeholder="https://api.example.com/openapi.json"
                  className="min-h-[36px] px-3 py-1.5 rounded-control border border-line-strong bg-surface text-text-primary text-[13px] font-medium focus-ring w-full shadow-scalar-1"
                />
                {errors.specUrl && (
                  <span className="text-xs text-semantic-danger font-medium">
                    {errors.specUrl.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-[36px] px-3.5 py-1.5 rounded-control bg-primary hover:bg-primary-hover text-white text-[13px] font-medium btn-press flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 shadow-scalar-1 hero-glow"
              >
                <Send className="w-4 h-4" />
                <span>Validate & Parse Specification</span>
              </button>
            </form>

            {submittedUrl && (
              <div className="p-3 rounded-control border border-state-passed-border bg-state-passed-bg text-state-passed-fg text-xs font-medium">
                Specification URL queued for validation: <code className="font-mono">{submittedUrl}</code>
              </div>
            )}
          </div>

          {/* Form Elements Suite */}
          <div className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4 shadow-scalar-2">
            <div>
              <h3 className="text-base font-bold">Search, Selects & Textareas</h3>
              <p className="text-text-secondary text-xs mt-1">
                Standardized components ready for endpoints, headers, and parameter filtering.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Search with icon */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Filter endpoints by tag or path..."
                  className="min-h-[36px] pl-9 pr-3 py-1.5 rounded-control border border-line-strong bg-surface text-text-primary text-[13px] font-medium focus-ring w-full shadow-scalar-1"
                />
              </div>

              {/* Select */}
              <select className="min-h-[36px] px-3 py-1.5 rounded-control border border-line-strong bg-surface text-text-primary text-[13px] font-medium focus-ring w-full shadow-scalar-1 cursor-pointer">
                <option>All HTTP Operations (48)</option>
                <option>Failed Assertions (3)</option>
                <option>Uncertain Interrupted Requests (1)</option>
              </select>

              {/* Buttons row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button className="min-h-[36px] px-3.5 py-1.5 rounded-control border border-line-strong bg-surface-raised hover:bg-surface-subtle text-text-primary text-[13px] font-medium btn-press cursor-pointer transition-all duration-150 shadow-scalar-1">
                  Secondary Action
                </button>
                <button className="min-h-[36px] px-3.5 py-1.5 rounded-control border border-state-failed-border bg-state-failed-bg text-state-failed-fg text-[13px] font-medium btn-press cursor-pointer transition-all duration-150">
                  Destructive
                </button>
                <button
                  disabled
                  className="min-h-[36px] px-3.5 py-1.5 rounded-control border border-line bg-surface-subtle text-text-muted text-[13px] font-medium opacity-60 cursor-not-allowed"
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. API Endpoint Explorer & Code Preview (Scalar Aesthetics) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            4. API Endpoint Explorer & Code Viewers (Scalar Hairline Structure)
          </h2>
        </div>

        <div className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4 shadow-scalar-2">
          {/* Endpoint Bar */}
          <div className="flex flex-wrap items-center justify-between p-3 rounded-control border border-line bg-surface gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-pill bg-state-passed-bg border border-state-passed-border text-state-passed-fg font-mono text-[11px] font-bold">
                POST
              </span>
              <span className="font-mono text-xs text-text-primary">
                /api/v1/projects/<span className="text-primary">{'{projectId}'}</span>/test-runs
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted">Status 201 Created</span>
              <span className="px-2 py-0.5 rounded-pill bg-state-running-bg border border-state-running-border text-state-running-fg font-mono text-[10px]">
                Deterministic
              </span>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="rounded-control border border-line bg-surface overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-line bg-surface-subtle">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-text-muted" />
                <span className="font-mono text-[11px] text-text-secondary">request-payload.json</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary font-mono cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-text-primary overflow-x-auto leading-relaxed">
              <code>{`{
  "targetUrl": "https://api.example.com",
  "concurrency": 4,
  "resilientRecovery": true,
  "deterministicAssertions": [
    { "field": "status", "expected": 200 },
    { "field": "headers.content-type", "expected": "application/json" }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 6. AI Segregation vs. Deterministic Results */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Layers className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            5. Deterministic Assertions vs. AI Analysis (Clear Visual Segregation)
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-6">
          {/* Deterministic Card */}
          <div className="p-5 rounded-card border border-state-failed-border bg-state-failed-bg text-state-failed-fg flex flex-col gap-3 shadow-scalar-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
                Deterministic Validation Proof
              </span>
              <span className="text-xs font-mono">Status: 500 ≠ 200</span>
            </div>
            <p className="text-[13px] text-text-primary leading-relaxed">
              Target endpoint failed assertion: Expected HTTP 200 OK, received 500 Internal Server Error in{' '}
              <bdi className="tabular-nums font-mono font-bold text-white">142ms</bdi>.
            </p>
          </div>

          {/* AI Diagnostic Card */}
          <div className="p-5 rounded-card border border-[var(--color-ai-badge-border)] bg-[var(--color-ai-card-bg)] text-text-primary flex flex-col gap-3 shadow-glow-purple">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--color-primary-glow)]" />
                <span className="text-[11px] font-bold tracking-wider uppercase font-mono text-[var(--color-ai-badge-fg)]">
                  AI Failure Diagnosis
                </span>
              </div>
              <span className="text-[11px] text-text-muted italic">Non-proof heuristic</span>
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              The target API crashed with a NullReferenceException in the authentication middleware when the Authorization Bearer header was null or malformed.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Latency Analytics Specimen */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-line pb-2">
          <Server className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono">
            6. Execution Metrics & Latency Performance (Recharts)
          </h2>
        </div>

        <div className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4 shadow-scalar-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Execution Latency by Workflow Step</h3>
            <span className="font-mono text-xs text-text-muted">Average: 118ms</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockLatencyData}>
                <defs>
                  <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="endpoint" stroke="var(--color-text-secondary)" fontSize={11} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-raised)',
                    borderColor: 'var(--color-line-strong)',
                    borderRadius: 'var(--radius-control)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="duration"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#latencyGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};
