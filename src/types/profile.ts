export type ProfileLink = {
  type: "linkedin" | "github" | "email" | "phone";
  label: string;
  value: string;
};

export type ProfileMetric = {
  key: "experience" | "icebreakers" | "competencias" | "experiencias" | "speeches" | "questions";
  label: string;
  value: string;
  hint?: string;
};

export type ProfileSummary = {
  id: string | null;
  status: "ready" | "placeholder";
  name: string;
  title: string;
  avatarUrl: string;
  yearsExperience: number | null;
  summaryPt?: string | null;
  summaryEn?: string | null;
  updatedAt?: string | null;
  links: ProfileLink[];
  metrics: ProfileMetric[];
};

export const placeholderProfileSummary: ProfileSummary = {
  id: null,
  status: "placeholder",
  name: "Defina seu perfil principal",
  title: "Adicione título e resumo profissional",
  avatarUrl: "https://avatar.vercel.sh/interview-prep.svg?text=IP",
  yearsExperience: null,
  summaryPt:
    "Use o card de perfil para consolidar suas informações principais e vincular contatos importantes. Assim que houver dados no MongoDB, eles serão carregados automaticamente aqui.",
  summaryEn: null,
  updatedAt: null,
  links: [],
  metrics: [
    { key: "experience", label: "Experiência", value: "Configure no perfil" },
    { key: "icebreakers", label: "Icebreakers", value: "0" },
    { key: "competencias", label: "Competências", value: "0" },
    { key: "experiencias", label: "Experiências", value: "0" },
    { key: "speeches", label: "Speeches", value: "0" },
    { key: "questions", label: "Perguntas", value: "0" },
  ],
};
