import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";

type UploadState = "idle" | "uploading" | "done";

export default function ResumePage() {
  const [state, setState] = useState<UploadState>("idle");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    simulateUpload();
  }, []);

  const handleFileChange = () => {
    simulateUpload();
  };

  const simulateUpload = () => {
    setState("uploading");
    setTimeout(() => setState("done"), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume Portal</h1>
        <p className="text-muted-foreground text-sm">Upload your resume to generate tailored interview questions</p>
      </div>

      <motion.div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer
          ${state === "idle" ? "border-border hover:border-primary/50" : ""}
          ${state === "uploading" ? "border-primary/50 bg-primary/5" : ""}
          ${state === "done" ? "border-success/50 bg-success/5" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("resume-input")?.click()}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input id="resume-input" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />

        {state === "idle" && (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium mb-1">Drop your resume here</p>
            <p className="text-sm text-muted-foreground">PDF files up to 10MB</p>
          </>
        )}
        {state === "uploading" && (
          <>
            <Loader2 className="h-10 w-10 text-primary mx-auto mb-3 animate-spin" />
            <p className="font-medium mb-1">Parsing your resume...</p>
            <p className="text-sm text-muted-foreground">AI is analyzing your experience</p>
          </>
        )}
        {state === "done" && (
          <>
            <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
            <p className="font-medium mb-1">Resume analyzed successfully</p>
            <p className="text-sm text-muted-foreground">23 relevant interview questions generated</p>
          </>
        )}
      </motion.div>

      {state === "done" && (
        <motion.div
          className="p-5 rounded-xl border border-border bg-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-medium">resume_alex_chen.pdf</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Skills detected</p>
              <p className="font-medium">React, TypeScript, Node.js, AWS</p>
            </div>
            <div>
              <p className="text-muted-foreground">Experience level</p>
              <p className="font-medium">Senior (5+ years)</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
