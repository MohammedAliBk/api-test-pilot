import { useState } from 'react';
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
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// Zod Schema for OpenAPI Spec URL Input
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
  { endpoint: 'Auth', duration: 45 },
  { endpoint: 'Projects', duration: 120 },
  { endpoint: 'Endpoints', duration: 85 },
  { endpoint: 'Test Runs', duration: 210 },
  { endpoint: 'Results', duration: 95 },
  { endpoint: 'Recover', duration: 160 },
];

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
    <div className="min-h-screen bg-surface text-text-primary p-6 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between pb-6 border-b border-line gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-control bg-primary flex items-center justify-center text-white font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">API Test Pilot</h1>
              <span className="px-2 py-0.5 rounded-control bg-primary-subtle text-primary text-xs font-bold uppercase">
                v0.0.1-alpha
              </span>
            </div>
            <p className="text-text-secondary text-xs mt-0.5">
              AI-Assisted OpenAPI Testing with Resilient Recovery Execution
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="min-h-[36px] px-3 py-1.5 rounded-control border border-line-strong bg-surface-raised hover:bg-surface-subtle text-text-primary text-[13px] font-bold btn-press flex items-center gap-2 cursor-pointer transition-all duration-150"
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-4 h-4" /> <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-warning" /> <span>Light Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Domain Test States Bar */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
          1. Domain Test Execution States
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          <div className="p-2 rounded-control border border-state-queued-border bg-state-queued-bg text-state-queued-fg text-center">
            <span className="text-[11px] font-bold block uppercase">Queued</span>
          </div>
          <div className="p-2 rounded-control border border-state-running-border bg-state-running-bg text-state-running-fg text-center flex items-center justify-center gap-1">
            <Activity className="w-3 h-3 animate-spin" />
            <span className="text-[11px] font-bold uppercase">Running</span>
          </div>
          <div className="p-2 rounded-control border border-state-passed-border bg-state-passed-bg text-state-passed-fg text-center flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Passed</span>
          </div>
          <div className="p-2 rounded-control border border-state-failed-border bg-state-failed-bg text-state-failed-fg text-center flex items-center justify-center gap-1">
            <XCircle className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Failed</span>
          </div>
          <div className="p-2 rounded-control border border-state-error-border bg-state-error-bg text-state-error-fg text-center flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Error</span>
          </div>
          <div className="p-2 rounded-control border border-state-retrying-border bg-state-retrying-bg text-state-retrying-fg text-center flex items-center justify-center gap-1">
            <RotateCcw className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Retrying</span>
          </div>
          <div className="p-2 rounded-control border border-state-recovered-border bg-state-recovered-bg text-state-recovered-fg text-center flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Recovered</span>
          </div>
          <div className="p-2 rounded-control border border-state-uncertain-border bg-state-uncertain-bg text-state-uncertain-fg text-center flex items-center justify-center gap-1">
            <HelpCircle className="w-3 h-3" />
            <span className="text-[11px] font-bold uppercase">Uncertain</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Separation Card */}
      <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-6">
        {/* OpenAPI URL Form (React Hook Form + Zod) */}
        <section className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold">Import OpenAPI Specification</h3>
            <p className="text-text-secondary text-xs mt-1">
              Test execution URL form enforcing server-side validation UX and 36px control metric.
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
                className="min-h-[36px] px-3 py-1.5 rounded-control border border-line-strong bg-surface text-text-primary text-[13px] font-medium focus-ring w-full"
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
              className="min-h-[36px] px-3.5 py-1.5 rounded-control bg-primary hover:bg-primary-hover text-white text-[13px] font-bold btn-press flex items-center justify-center gap-2 cursor-pointer transition-all duration-150"
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
        </section>

        {/* AI Segregation Specimen */}
        <section className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold">Deterministic Results vs. AI Assistance</h3>
            <p className="text-text-secondary text-xs mt-1">
              Visual segregation ensures AI interpretations are never confused with deterministic validation proof.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Deterministic */}
            <div className="p-3.5 rounded-control border border-state-failed-border bg-state-failed-bg text-state-failed-fg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  Deterministic Assertion Failed
                </span>
                <span className="text-xs font-mono">Status 500 ≠ 200</span>
              </div>
              <p className="text-xs">
                Endpoint <code className="font-mono">POST /api/test-runs</code> returned status 500 with assertion failure on response schema.
              </p>
            </div>

            {/* AI Explanation */}
            <div className="p-3.5 rounded-control border border-ai-badge-border bg-ai-card-bg text-text-primary">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded border border-ai-badge-border bg-ai-badge-bg text-ai-badge-fg text-[10px] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI EXPLANATION
                </span>
                <span className="text-xs text-text-secondary">Non-proof diagnostic</span>
              </div>
              <p className="text-xs">
                The database connection timed out during execution because worker retry limits were exceeded.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Latency Distribution Chart (Recharts) */}
      <section className="p-5 rounded-card border border-line bg-surface-raised flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Execution Latency Distribution</h3>
            <p className="text-text-secondary text-xs mt-1">
              Recharts component rendering endpoint execution times in milliseconds.
            </p>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            Average: <bdi className="tabular-nums font-bold text-primary">119 ms</bdi>
          </span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockLatencyData}>
              <XAxis dataKey="endpoint" stroke="var(--color-text-secondary)" fontSize={11} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={11} unit="ms" />
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
                fill="var(--color-primary-subtle)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
