import type { LucideIcon } from "lucide-react";
import { CalendarClock, Layers3, PenTool } from "lucide-react";

export type AmazonHubNavItem = {
  label: string;
  href: string;
  description?: string;
  children?: AmazonHubNavItem[];
};

export type AmazonHubStructure = {
  navigation: {
    title: string;
    items: AmazonHubNavItem[];
  }[];
  rituals: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  referenceDocs: {
    label: string;
    description: string;
    href: string;
  }[];
  contacts: {
    name: string;
    role: string;
    focus: string;
    timezone: string;
  }[];
};

export const amazonHubStructure: AmazonHubStructure = {
  navigation: [
    {
      title: "Hub Overview",
      items: [
        { label: "Mission Control", href: "/amz-pay-ops#mission" },
        { label: "Launch Pillars", href: "/amz-pay-ops#pillars" },
        { label: "Knowledge Library", href: "/amz-pay-ops#knowledge" },
        { label: "Readiness Path", href: "/amz-pay-ops#readiness" },
      ],
    },
    {
      title: "Culture OS",
      items: [
        {
          label: "Culture Overview",
          href: "/amz-pay-ops/culture",
          children: [
            { label: "Leadership Principles", href: "/amz-pay-ops/culture/lps" },
            { label: "Working Backwards", href: "/amz-pay-ops/culture/working-backwards" },
            { label: "Writing Culture", href: "/amz-pay-ops/culture/writing" },
          ],
        },
      ],
    },
    {
      title: "Payments Domain",
      items: [
        {
          label: "Domain Overview",
          href: "/amz-pay-ops/domain",
          children: [
            { label: "Fundamentals", href: "/amz-pay-ops/domain/fundamentals" },
            { label: "Amazon Pay Ecosystem", href: "/amz-pay-ops/domain/amazon-pay" },
            { label: "Risk & Fraud", href: "/amz-pay-ops/domain/risk-fraud" },
            { label: "Operational Excellence", href: "/amz-pay-ops/domain/ops-excellence" },
          ],
        },
      ],
    },
    {
      title: "Execution Toolkit",
      items: [
        {
          label: "Role Overview",
          href: "/amz-pay-ops/role",
          children: [
            { label: "Role Clarity", href: "/amz-pay-ops/role/clarity" },
            { label: "Stakeholders", href: "/amz-pay-ops/role/stakeholders" },
            { label: "Key Artifacts", href: "/amz-pay-ops/role/artifacts" },
            { label: "Mechanisms", href: "/amz-pay-ops/role/mechanisms" },
          ],
        },
      ],
    },
    {
      title: "Resource Vault",
      items: [
        { label: "Day 1 Anchors", href: "/amz-pay-ops#anchors" },
        { label: "Tool Simulators", href: "/amz-pay-ops#tools" },
        { label: "Practice Prompts", href: "/questions" },
      ],
    },
  ],
  rituals: [
    {
      icon: CalendarClock,
      title: "Daily Read",
      description: "10 min para revisar Auth Rate, CoP e insights do WBR antes do stand-up.",
    },
    {
      icon: PenTool,
      title: "Writing Sprint",
      description: "Escreva um parágrafo novo para um 6-pager ou PR/FAQ até as 10h.",
    },
    {
      icon: Layers3,
      title: "Mechanism Check",
      description: "Valide owners para WBR, MBR e QBR e capture gaps do dia anterior.",
    },
  ],
  referenceDocs: [
    {
      label: "PgM Playbook",
      description: "Templates para status, roadmap e OP1.",
      href: "/amz-pay-ops/role/artifacts",
    },
    {
      label: "Culture Narrative",
      description: "Writing rituals + Working Backwards.",
      href: "/amz-pay-ops/culture/writing",
    },
    {
      label: "Risk Quick Guide",
      description: "Fraude, chargebacks e planos de contenção.",
      href: "/amz-pay-ops/domain/risk-fraud",
    },
  ],
  contacts: [
    {
      name: "Andreia Guarino",
      role: "Sr. Program Manager",
      focus: "Ops Excellence & Lean",
      timezone: "São Paulo (BRT)",
    },
    {
      name: "Sujash Biswas",
      role: "Head of Payments LATAM",
      focus: "Escala & Estratégia",
      timezone: "Seattle (PST)",
    },
    {
      name: "Tech Pods",
      role: "Auth & Risk Eng",
      focus: "APIs, débitos técnicos e SLAs",
      timezone: "Híbrido (IN/PT)",
    },
  ],
};
