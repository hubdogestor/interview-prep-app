"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/lib/trpc/client";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: session?.user?.name || "",
    titulo: "",
    resumo: {
      pt: "",
      en: "",
    },
    anosExperiencia: 0,
    email: session?.user?.email || "",
    telefone: "",
    linkedin: "",
    github: "",
  });

  const createProfile = api.profile.create.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    createProfile.mutate({
      nome: formData.nome,
      titulo: formData.titulo,
      resumo: formData.resumo,
      anosExperiencia: formData.anosExperiencia,
      email: formData.email || undefined,
      telefone: formData.telefone || undefined,
      linkedin: formData.linkedin || undefined,
      github: formData.github || undefined,
    });
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.nome && formData.titulo;
    }
    if (step === 2) {
      return formData.resumo.pt && formData.anosExperiencia > 0;
    }
    return true;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Bem-vindo ao Interview Prep! 👋
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Vamos configurar seu perfil em 3 passos simples
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                    s <= step
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Básico</span>
              <span>Experiência</span>
              <span>Contatos</span>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: Maria Silva"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Título Profissional *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: Senior Software Engineer"
                />
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Resumo Profissional (Português) *
                </label>
                <textarea
                  value={formData.resumo.pt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resumo: { ...formData.resumo, pt: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Descreva sua experiência profissional brevemente..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Resumo Profissional (Inglês)
                </label>
                <textarea
                  value={formData.resumo.en}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      resumo: { ...formData.resumo, en: e.target.value },
                    })
                  }
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Describe your professional experience briefly..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Anos de Experiência *
                </label>
                <input
                  type="number"
                  value={formData.anosExperiencia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anosExperiencia: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  max="50"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="+55 11 99999-9999"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="https://linkedin.com/in/seu-perfil"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="https://github.com/seu-usuario"
                />
              </div>
            </div>
          )}

          {/* Error */}
          {createProfile.error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              Erro ao criar perfil. Tente novamente.
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Voltar
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || createProfile.isLoading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 3 ? (createProfile.isLoading ? "Criando..." : "Concluir") : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
