import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { FileText, Code, Brain, MessageSquare, Mic, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const topics = [
  { id: "resume", label: "Resume-based", icon: FileText, description: "Questions from your resume" },
  { id: "frontend", label: "Frontend React", icon: Code, description: "React, hooks, performance" },
  { id: "system", label: "System Design", icon: Brain, description: "Architecture & scalability" },
  { id: "behavioral", label: "Behavioral", icon: MessageSquare, description: "Leadership & teamwork" },
];

const levels = ["Junior", "Mid", "Senior", "Staff"];

export default function SetupPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState([2]);
  const [micOk, setMicOk] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const checkMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicOk(true);
    } catch { setMicOk(false); }
  };

  const startInterview = async () => {
    if (!selectedTopic) return;
    try {
      const interview = await api.post<any>("/interviews/", {
        topic: topics.find(t => t.id === selectedTopic)?.label || selectedTopic,
        difficulty: levels[difficulty[0]],
      });
      navigate(`/interview/${interview.id}`);
    } catch (error) {
      console.error("Failed to start interview:", error);
    }
  };

  const canStart = selectedTopic && micOk;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Set Up Your Interview</h1>
        <p className="text-muted-foreground text-sm">Choose your topic and configure the session</p>
      </div>

      {/* Topic Selection */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Interview Type</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {topics.map((t) => (
            <motion.button
              key={t.id}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedTopic === t.id ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-card hover:border-primary/30"
              }`}
              onClick={() => setSelectedTopic(t.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${selectedTopic === t.id ? "bg-primary/20" : "bg-muted"}`}>
                  <t.icon className={`h-4 w-4 ${selectedTopic === t.id ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Difficulty Level</h2>
        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex justify-between text-xs text-muted-foreground mb-4">
            {levels.map((l, i) => (
              <span key={l} className={difficulty[0] === i ? "text-primary font-medium" : ""}>{l}</span>
            ))}
          </div>
          <Slider value={difficulty} onValueChange={setDifficulty} min={0} max={3} step={1} />
        </div>
      </div>

      {/* System Check */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">System Check</h2>
        <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Microphone</span>
          </div>
          {micOk === null ? (
            <Button size="sm" variant="outline" onClick={checkMic}>Test</Button>
          ) : micOk ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )}
        </div>
      </div>

      {/* Start */}
      <Button
        size="lg"
        className="w-full gap-2"
        disabled={!canStart}
        onClick={startInterview}
      >
        Start Interview <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
