import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, MicOff, SkipForward, PhoneOff, Code, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

function VoiceWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-primary transition-all ${active ? "animate-voice-wave" : "h-1"}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function InterviewRoom() {
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState<"transcript" | "code">("transcript");
  const [speaking, setSpeaking] = useState(true);
  const navigate = useNavigate();

  const mockTranscript = [
    { speaker: "ai" as const, text: "Welcome! Let's begin with your experience. Can you walk me through a complex React project you've worked on recently?" },
    { speaker: "user" as const, text: "Sure. I recently built a real-time collaboration tool using React, WebSockets, and CRDT for conflict resolution..." },
    { speaker: "ai" as const, text: "Interesting. How did you handle state synchronization across multiple clients?" },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm shrink-0">
        <span className="text-sm font-medium">Frontend React Interview · Senior</span>
        <span className="text-xs text-muted-foreground">12:34 elapsed</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          {/* AI Avatar */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="h-32 w-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            {speaking && (
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-pulse-ring" />
            )}
          </motion.div>

          <VoiceWave active={speaking} />
          <p className="text-sm text-muted-foreground mt-3">AI Interviewer is {speaking ? "speaking..." : "listening..."}</p>

          {/* User video placeholder */}
          <div className="absolute bottom-6 right-6 w-40 h-28 rounded-xl bg-card border border-border flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Voice activity */}
          {!muted && (
            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">Voice Active</span>
            </div>
          )}
        </div>

        {/* Right: Panel */}
        <div className="w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-border flex flex-col bg-card">
          {/* Panel tabs */}
          <div className="flex border-b border-border shrink-0">
            <button
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${panel === "transcript" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
              onClick={() => setPanel("transcript")}
            >
              <MessageSquare className="h-4 w-4" /> Transcript
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${panel === "code" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
              onClick={() => setPanel("code")}
            >
              <Code className="h-4 w-4" /> Code Editor
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {panel === "transcript" ? (
              <div className="space-y-4">
                {mockTranscript.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex gap-3 ${msg.speaker === "user" ? "flex-row-reverse" : ""}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-xs font-medium
                      ${msg.speaker === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {msg.speaker === "ai" ? "AI" : "You"}
                    </div>
                    <div className={`rounded-xl px-3.5 py-2.5 text-sm max-w-[80%]
                      ${msg.speaker === "ai" ? "bg-muted" : "bg-primary/10"}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-full rounded-lg bg-background border border-border p-4 font-mono text-sm text-muted-foreground">
                <span className="text-primary">{"// "}</span>Write your solution here...
                <div className="mt-2">
                  <span className="text-primary">function</span> <span className="text-foreground">solve</span>() {"{"}
                  <br />
                  <span className="text-muted-foreground ml-4">{"  // your code"}</span>
                  <br />
                  {"}"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-16 border-t border-border flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm shrink-0">
        <Button
          variant={muted ? "destructive" : "outline"}
          size="icon"
          className="h-11 w-11 rounded-full"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => setSpeaking(!speaking)}>
          <SkipForward className="h-4 w-4" /> Skip
        </Button>
        <Button variant="destructive" size="sm" className="gap-2 rounded-full" onClick={() => navigate("/feedback/1")}>
          <PhoneOff className="h-4 w-4" /> End Interview
        </Button>
      </div>
    </div>
  );
}
