import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mic, BarChart3, CheckCircle2, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";


const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume and get AI-powered interview questions tailored to your experience.",
  },
  {
    icon: Mic,
    title: "Real-time Voice",
    description: "Practice with natural voice conversations powered by advanced speech recognition.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Get detailed breakdowns of your technical accuracy, communication, and confidence.",
  },
];

const steps = [
  { number: "01", title: "Upload Resume", description: "Drop your PDF and our AI parses your experience instantly." },
  { number: "02", title: "Choose Your Path", description: "Select topic, difficulty, and interview style." },
  { number: "03", title: "Practice Live", description: "Engage in a realistic AI-driven mock interview." },
  { number: "04", title: "Get Feedback", description: "Receive actionable scores and improvement tips." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">InterviewAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-hero pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(234_62%_46%/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(260_60%_52%/0.1),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Mock Interviews</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-primary-foreground">Ace Your Next</span>
              <br />
              <span className="text-gradient">Technical Interview</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Practice with an AI interviewer that adapts to your resume, gives real-time feedback, and tracks your improvement over time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/auth/signup">
                <Button size="lg" className="gap-2 shadow-glow">
                  Start Free Mock <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button variant="outline" size="lg" className="border-border/50 text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Prepare</h2>
            <p className="text-muted-foreground max-w-md mx-auto">From resume parsing to detailed analytics, we've got every angle covered.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to interview mastery.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.number}
                className="flex gap-6 relative"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0">
                    {s.number}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 bg-border my-2" />}
                </div>
                <div className="pb-10">
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(234_62%_46%/0.12),transparent_60%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-primary-foreground mb-3">Ready to Level Up?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Join thousands of engineers who aced their interviews with AI-powered practice.</p>
            <Link to="/auth/signup">
              <Button size="lg" className="gap-2 shadow-glow">
                Start Free Mock <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 InterviewAI. Built for ambitious engineers.
        </div>
      </footer>
    </div>
  );
}
