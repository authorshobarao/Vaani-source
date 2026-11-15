import { Switch, Route, Router as WouterRouter, useParams } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ConditionPage from "@/pages/ConditionPage";
import Privacy from "@/pages/Privacy";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Faq from "@/pages/Faq";
import PmfDashboard from "@/pages/PmfDashboard";
import NotFound from "@/pages/not-found";
import { LANGUAGES, LanguageProvider } from "@/i18n";

const queryClient = new QueryClient();

const VALID_LOCALES = new Set<string>(LANGUAGES.map((l) => l.code));

function LocaleHome() {
  const { locale } = useParams<{ locale: string }>();
  if (!locale || !VALID_LOCALES.has(locale)) return <NotFound />;
  return <Home />;
}

function LocalePrivacy() {
  const { locale } = useParams<{ locale: string }>();
  if (!locale || !VALID_LOCALES.has(locale)) return <NotFound />;
  return <Privacy />;
}

function HomePage() {
  return <Home />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
        <Route path="/questions/:conditionId" component={ConditionPage} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/pmf" component={PmfDashboard} />
        <Route path="/:locale/" component={LocaleHome} />
        <Route path="/:locale/privacy" component={LocalePrivacy} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </LanguageProvider>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
