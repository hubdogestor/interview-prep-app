import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

export const dayOneData = {
  hero: {
    title: "Amazon Payment Ops",
    subtitle: "Day 1 Readiness Hub",
    targetDate: "2025-12-15T09:00:00", // 15 de Dezembro de 2025
    role: "Program Manager",
    team: "Payment Business Operations",
  },
  modules: [
    {
      id: "culture",
      title: "The Amazonian Way",
      description: "Leadership Principles, Writing Culture & Mechanisms",
      icon: Lightbulb,
      href: "/amz-pay-ops/culture",
      progress: 0,
      topics: [
        "Leadership Principles in Ops",
        "Working Backwards",
        "6-Pagers & PR/FAQ",
      ],
    },
    {
      id: "domain",
      title: "Payments & Ops Domain",
      description: "Payment Flows, Amazon Pay Ecosystem & Operational Excellence",
      icon: ShieldCheck,
      href: "/amz-pay-ops/domain",
      progress: 0,
      topics: [
        "Payment Fundamentals (Auth/Capture)",
        "Amazon Pay Products",
        "Fraud Detector & Risk",
        "Lean & Six Sigma",
      ],
    },
    {
      id: "role",
      title: "Program Manager Toolkit",
      description: "Execution, Stakeholders & Artifacts",
      icon: Briefcase,
      href: "/amz-pay-ops/role",
      progress: 0,
      topics: [
        "PgM vs PM vs ProdM",
        "Stakeholder Management",
        "Key Artifacts & Roadmaps",
      ],
    },
  ],
  quickLinks: [
    {
      label: "Simulate Wiki",
      icon: BookOpen,
      href: "/amz-pay-ops/wiki",
      description: "Internal Knowledge Base",
    },
    {
      label: "Simulate Quip",
      icon: FileText,
      href: "/amz-pay-ops/quip",
      description: "Collaborative Docs",
    },
    {
      label: "Simulate JIRA",
      icon: LayoutDashboard,
      href: "/amz-pay-ops/jira",
      description: "Task Tracking",
    },
  ],
  dayOneChecklist: [
    { id: "1", label: "Configurar Laptop & VPN", completed: false },
    { id: "2", label: "Acessar AtoZ & Phonetool", completed: false },
    { id: "3", label: "Agendar 1:1 com Manager (Andreia)", completed: false },
    { id: "4", label: "Ler o 'The Amazon Way'", completed: false },
    { id: "5", label: "Revisar o OP1 (Operational Plan)", completed: false },
  ],
};
