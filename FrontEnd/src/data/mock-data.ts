export interface InterviewSession {
  id: string;
  date: string;
  topic: string;
  type: "resume" | "topic";
  difficulty: "Junior" | "Mid" | "Senior" | "Staff";
  score: number;
  status: "completed" | "in-progress";
  duration: string;
  scores: {
    technical: number;
    communication: number;
    confidence: number;
    tone: number;
  };
  transcript: TranscriptEntry[];
}

export interface TranscriptEntry {
  id: string;
  speaker: "ai" | "user";
  text: string;
  timestamp: string;
  feedback?: "positive" | "improvement";
  note?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  resumeUrl?: string;
  stats: {
    totalInterviews: number;
    avgScore: number;
    strengths: string[];
    completedThisWeek: number;
  };
}

export const mockUser: UserProfile = {
  name: "Alex Chen",
  email: "alex@example.com",
  stats: {
    totalInterviews: 24,
    avgScore: 78,
    strengths: ["Problem Solving", "Communication", "System Design"],
    completedThisWeek: 3,
  },
};

export const mockSessions: InterviewSession[] = [
  {
    id: "1",
    date: "2026-03-13",
    topic: "Frontend React",
    type: "topic",
    difficulty: "Senior",
    score: 85,
    status: "completed",
    duration: "32 min",
    scores: { technical: 88, communication: 82, confidence: 84, tone: 86 },
    transcript: [
      { id: "t1", speaker: "ai", text: "Can you explain how React's reconciliation algorithm works?", timestamp: "0:00" },
      { id: "t2", speaker: "user", text: "React uses a virtual DOM diffing algorithm. When state changes, React creates a new virtual DOM tree and compares it with the previous one using a heuristic O(n) algorithm.", timestamp: "0:15", feedback: "positive", note: "Excellent explanation of core concepts" },
      { id: "t3", speaker: "ai", text: "How would you optimize a React application that has performance issues?", timestamp: "1:30" },
      { id: "t4", speaker: "user", text: "I'd start by profiling with React DevTools, then look at unnecessary re-renders using React.memo, useMemo, and useCallback.", timestamp: "1:45", feedback: "positive", note: "Good systematic approach" },
      { id: "t5", speaker: "ai", text: "Explain the difference between controlled and uncontrolled components.", timestamp: "3:00" },
      { id: "t6", speaker: "user", text: "Controlled components have their state managed by React through props, while uncontrolled ones manage their own state internally.", timestamp: "3:12", feedback: "improvement", note: "Could elaborate more on use cases and trade-offs" },
    ],
  },
  {
    id: "2",
    date: "2026-03-11",
    topic: "System Design",
    type: "topic",
    difficulty: "Senior",
    score: 72,
    status: "completed",
    duration: "45 min",
    scores: { technical: 70, communication: 78, confidence: 68, tone: 72 },
    transcript: [
      { id: "t7", speaker: "ai", text: "Design a URL shortening service like bit.ly.", timestamp: "0:00" },
      { id: "t8", speaker: "user", text: "I'd use a hash function to generate short codes and store the mapping in a distributed database.", timestamp: "0:20", feedback: "improvement", note: "Should discuss scalability and caching strategy" },
    ],
  },
  {
    id: "3",
    date: "2026-03-10",
    topic: "Behavioral",
    type: "topic",
    difficulty: "Mid",
    score: 91,
    status: "completed",
    duration: "28 min",
    scores: { technical: 0, communication: 94, confidence: 90, tone: 88 },
    transcript: [],
  },
  {
    id: "4",
    date: "2026-03-14",
    topic: "Resume Review",
    type: "resume",
    difficulty: "Senior",
    score: 0,
    status: "in-progress",
    duration: "12 min",
    scores: { technical: 0, communication: 0, confidence: 0, tone: 0 },
    transcript: [],
  },
];
