import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, Zap, Clock, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, interviewsData] = await Promise.all([
          api.get("/auth/me"),
          api.get("/interviews/")
        ]);
        setUser(userData);
        setInterviews(interviewsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>;
  }

  const statCards = [
    { label: "Interviews Completed", value: interviews.length, icon: BarChart3, color: "text-primary" },
    { label: "Average Score", value: "85%", icon: TrendingUp, color: "text-success" },
    { label: "This Week", value: interviews.length, icon: Zap, color: "text-warning" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.full_name?.split(" ")[0]}</h1>
          <p className="text-muted-foreground text-sm">Here's your interview progress</p>
        </div>
        <Link to="/setup">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Interview</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            className="p-5 rounded-xl border border-border bg-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Sessions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {interviews.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <Link
                to={session.status === "completed" ? `/feedback/${session.id}` : `/interview/${session.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{session.topic}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{session.difficulty}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{new Date(session.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={session.status === "completed" ? "default" : "secondary"} className={session.status === "completed" ? "bg-success/10 text-success border-success/20" : ""}>
                    {session.status === "completed" ? "Completed" : "In Progress"}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
