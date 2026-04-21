import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, MessageSquare, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export default function FeedbackPage() {
  const { id: interview_id } = useParams();
  const [interview, setInterview] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interviewData, feedbackData] = await Promise.all([
          api.get(`/interviews/${interview_id}`),
          api.get(`/feedback/${interview_id}`)
        ]);
        setInterview(interviewData);
        setFeedback(feedbackData);
      } catch (err) {
        console.error("Failed to fetch feedback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [interview_id]);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>;
  if (!feedback) return <div className="text-center p-8">Feedback not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{interview?.topic} Interview</h1>
          <p className="text-sm text-muted-foreground">{new Date(interview?.created_at).toLocaleDateString()} · {interview?.difficulty}</p>
        </div>
      </div>

      {/* Overall Score */}
      <motion.div
        className="p-6 rounded-xl border border-border bg-card text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
        <p className="text-5xl font-bold text-gradient mb-1">{(feedback.overall_score * 10).toFixed(0)}%</p>
        <Badge variant="secondary" className={feedback.overall_score >= 8 ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
          {feedback.overall_score >= 8 ? "Excellent" : feedback.overall_score >= 6 ? "Good" : "Needs Work"}
        </Badge>
      </motion.div>

      {/* Technical Analysis */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Technical Analysis</h2>
        <div className="p-5 rounded-xl border border-border bg-card">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feedback.technical_analysis}
          </p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-success/30 bg-success/5 space-y-3">
          <h3 className="font-semibold text-success flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Key Strengths</h3>
          <ul className="text-sm space-y-2">
            {feedback.strengths.map((s: string, i: number) => (
              <li key={i} className="flex gap-2">• {s}</li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-warning/30 bg-warning/5 space-y-3">
          <h3 className="font-semibold text-warning flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Areas for Improvement</h3>
          <ul className="text-sm space-y-2">
            {feedback.weaknesses.map((w: string, i: number) => (
              <li key={i} className="flex gap-2">• {w}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Next Steps</h2>
        <div className="p-5 rounded-xl border border-border bg-card space-y-3">
          {feedback.suggestions.map((tip: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/setup" className="flex-1">
          <Button variant="outline" className="w-full">Practice Again</Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button className="w-full">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
