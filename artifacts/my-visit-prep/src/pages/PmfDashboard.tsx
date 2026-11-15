import { useEffect, useMemo, useState } from "react";
import { getPmfSummary } from "@/lib/api";
import { VaaniApiError, type PmfSummaryResponse as PmfSummary } from "@workspace/api-client-react";
import { Helmet } from "react-helmet-async";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Users,
  MessageSquareText,
  Gauge,
  LogOut,
  RefreshCw,
  Lock,
} from "lucide-react";

const TOKEN_KEY = "pmf-admin-token";

const STEP_LABELS: Record<string, string> = {
  app_opened: "Opened app",
  condition_selected: "Selected condition",
  questions_prepared: "Prepared questions",
  prep_exported: "Exported prep",
};

const DISAPPOINTMENT_META: Record<string, { label: string; className: string }> =
  {
    very: { label: "Very disappointed", className: "bg-emerald-100 text-emerald-800" },
    somewhat: { label: "Somewhat disappointed", className: "bg-amber-100 text-amber-800" },
    not: { label: "Not disappointed", className: "bg-slate-100 text-slate-700" },
  };

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card data-testid={`card-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold leading-tight">{value}</p>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PmfDashboard() {
  const [token, setToken] = useState<string>(
    () => sessionStorage.getItem(TOKEN_KEY) ?? ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [data, setData] = useState<PmfSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(activeToken: string) {
    setLoading(true);
    setError(null);
    try {
      setData(await getPmfSummary(activeToken));
    } catch (e) {
      if (e instanceof VaaniApiError && e.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setData(null);
        setError("Invalid access token. Please try again.");
        return;
      }
      setError(e instanceof Error ? e.message : "Failed to load summary");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const funnelData = useMemo(
    () =>
      (data?.funnel ?? []).map((f) => ({
        ...f,
        label: STEP_LABELS[f.step] ?? f.step,
      })),
    [data]
  );

  const pmfBreakdown = useMemo(() => {
    if (!data) return [];
    return [
      { label: "Very", count: data.pmf.very, fill: "#059669" },
      { label: "Somewhat", count: data.pmf.somewhat, fill: "#d97706" },
      { label: "Not", count: data.pmf.notDisappointed, fill: "#94a3b8" },
    ];
  }, [data]);

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Helmet>
          <title>PMF Dashboard — My Visit Prep</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-4 w-4" /> PMF Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const t = tokenInput.trim();
                if (!t) return;
                sessionStorage.setItem(TOKEN_KEY, t);
                setToken(t);
              }}
              className="space-y-3"
            >
              <Input
                type="password"
                placeholder="Admin access token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                data-testid="input-admin-token"
              />
              {error && (
                <p className="text-sm text-destructive" data-testid="text-auth-error">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" data-testid="button-unlock">
                View dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PMF Dashboard — My Visit Prep</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold" data-testid="text-page-title">
              Vaani PMF Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Usage funnel, product-market-fit score, and recent feedback
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => load(token)}
              disabled={loading}
              data-testid="button-refresh"
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                sessionStorage.removeItem(TOKEN_KEY);
                setToken("");
                setData(null);
              }}
              data-testid="button-signout"
            >
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" data-testid="text-load-error">
            {error}
          </p>
        )}
        {loading && !data && (
          <p className="text-sm text-muted-foreground">Loading summary…</p>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                icon={Users}
                label="Devices"
                value={data.totals.devices.toLocaleString()}
              />
              <StatCard
                icon={Activity}
                label="Events"
                value={data.totals.events.toLocaleString()}
              />
              <StatCard
                icon={Gauge}
                label="PMF score"
                value={`${data.pmf.score}%`}
                hint={`${data.pmf.responses} survey responses · 40% = strong fit`}
              />
              <StatCard
                icon={MessageSquareText}
                label="Feedback notes"
                value={data.recentFeedback.length.toLocaleString()}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card data-testid="card-funnel">
                <CardHeader>
                  <CardTitle className="text-base">Activation funnel (unique devices)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={funnelData} layout="vertical" margin={{ left: 8, right: 40 }}>
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="label"
                          width={130}
                          tickLine={false}
                          axisLine={false}
                          style={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(v: number) => [v.toLocaleString(), "Devices"]}
                        />
                        <Bar dataKey="devices" fill="hsl(217 91% 60%)" radius={[0, 4, 4, 0]}>
                          <LabelList dataKey="devices" position="right" style={{ fontSize: 12 }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 space-y-1">
                    {funnelData
                      .filter((f) => f.conversionFromPrevious !== undefined)
                      .map((f) => (
                        <p key={f.step} className="text-xs text-muted-foreground">
                          → {f.label}: {f.conversionFromPrevious}% of previous step
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-pmf-breakdown">
                <CardHeader>
                  <CardTitle className="text-base">
                    “How disappointed if Vaani went away?”
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pmfBreakdown} margin={{ top: 16 }}>
                        <XAxis dataKey="label" tickLine={false} axisLine={false} style={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} width={32} style={{ fontSize: 12 }} />
                        <Tooltip formatter={(v: number) => [v.toLocaleString(), "Responses"]} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                          {pmfBreakdown.map((entry) => (
                            <Cell key={entry.label} fill={entry.fill} />
                          ))}
                          <LabelList dataKey="count" position="top" style={{ fontSize: 12 }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    PMF score = share answering “very disappointed”. Currently{" "}
                    <span className="font-medium text-foreground">{data.pmf.score}%</span>.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card data-testid="card-event-counts">
              <CardHeader>
                <CardTitle className="text-base">Event counts</CardTitle>
              </CardHeader>
              <CardContent>
                {data.eventCounts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="py-2 pr-4 font-medium">Event</th>
                          <th className="py-2 pr-4 font-medium">Count</th>
                          <th className="py-2 font-medium">Unique devices</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.eventCounts.map((e) => (
                          <tr key={e.name} className="border-b last:border-0">
                            <td className="py-2 pr-4 font-mono text-xs">{e.name}</td>
                            <td className="py-2 pr-4">{e.count.toLocaleString()}</td>
                            <td className="py-2">{e.devices.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-recent-feedback">
              <CardHeader>
                <CardTitle className="text-base">Recent feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {data.recentFeedback.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No written feedback yet.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {data.recentFeedback.map((f, i) => {
                      const meta =
                        DISAPPOINTMENT_META[f.disappointment] ?? {
                          label: f.disappointment,
                          className: "bg-slate-100 text-slate-700",
                        };
                      return (
                        <li
                          key={`${f.createdAt}-${i}`}
                          className="rounded-md border p-3"
                          data-testid={`feedback-item-${i}`}
                        >
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className={meta.className}>
                              {meta.label}
                            </Badge>
                            {f.lang && (
                              <Badge variant="outline" className="uppercase">
                                {f.lang}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(f.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{f.feedback}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
