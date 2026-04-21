import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, MessageSquare, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSessions } from "@/data/mock-data";

export default function FeedbackPage() {
  const { id } = useParams();
  const session = mockSessions.find((s) => s.id === id) || mockSessions[0];

  const tips = [
    "Practice explaining trade-offs in system design questions",
    "Use the STAR method for behavioral questions",
    "Review React concurrent features and Suspense patterns",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{session.topic} Interview</h1>
          <p className="text-sm text-muted-foreground">{session.date} · {session.duration} · {session.difficulty}</p>
        </div>
      </div>

      {/* Overall Score */}
      <motion.div
        className="p-6 rounded-xl border border-border bg-card text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
        <p className="text-5xl font-bold text-gradient mb-1">{session.score}%</p>
        <Badge variant="secondary" className={session.score >= 80 ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
          {session.score >= 80 ? "Excellent" : session.score >= 60 ? "Good" : "Needs Work"}
        </Badge>
      </motion.div>

      {/* Transcript */}
      {session.transcript.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Transcript Analysis</h2>
          <div className="space-y-3">
            {session.transcript.map((entry) => (
              <motion.div
                key={entry.id}
                className={`p-4 rounded-xl border ${
                  entry.feedback === "positive" ? "border-success/30 bg-success/5" :
                  entry.feedback === "improvement" ? "border-warning/30 bg-warning/5" :
                  "border-border bg-card"
                }`}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {entry.speaker === "ai" ? "Interviewer" : "You"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  {entry.feedback === "positive" && <CheckCircle2 className="h-4 w-4 text-success ml-auto" />}
                  {entry.feedback === "improvement" && <AlertCircle className="h-4 w-4 text-warning ml-auto" />}
                </div>
                <p className="text-sm">{entry.text}</p>
                {entry.note && (
                  <p className="text-xs text-muted-foreground mt-2 italic">💡 {entry.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" /> Next Steps</h2>
        <div className="p-5 rounded-xl border border-border bg-card space-y-3">
          {tips.map((tip, i) => (
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
