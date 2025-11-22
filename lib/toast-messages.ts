import { toast } from "sonner";

/**
 * Toast messages helper
 * Provides user-friendly, consistent toast messages throughout the app
 */

export const toastMessages = {
  // Icebreakers
  icebreaker: {
    created: () => toast.success("Icebreaker criado com sucesso!"),
    updated: () => toast.success("Icebreaker atualizado!"),
    deleted: () => toast.success("Icebreaker removido"),
    favorited: () => toast.success("Adicionado aos favoritos"),
    unfavorited: () => toast.success("Removido dos favoritos"),
    archived: () => toast.success("Icebreaker arquivado"),
    unarchived: () => toast.success("Icebreaker desarquivado"),
    generating: () => toast.loading("Gerando icebreaker com IA..."),
    generated: (id: string, onView?: () => void) =>
      toast.success("Icebreaker gerado!", {
        action: onView
          ? {
              label: "Visualizar",
              onClick: onView,
            }
          : undefined,
      }),
    error: {
      create: () =>
        toast.error(
          "Não foi possível criar o icebreaker. Tente novamente.",
        ),
      update: () =>
        toast.error(
          "Não foi possível atualizar o icebreaker. Tente novamente.",
        ),
      delete: () =>
        toast.error(
          "Não foi possível remover o icebreaker. Tente novamente.",
        ),
      favorite: () =>
        toast.error("Não foi possível favoritar. Tente novamente."),
      archive: () =>
        toast.error("Não foi possível arquivar. Tente novamente."),
      generate: () =>
        toast.error(
          "Não foi possível gerar o icebreaker. Verifique sua conexão e tente novamente.",
        ),
      load: () =>
        toast.error("Não foi possível carregar o icebreaker."),
    },
  },

  // Speeches
  speech: {
    created: () => toast.success("Speech criado com sucesso!"),
    updated: () => toast.success("Speech atualizado!"),
    deleted: () => toast.success("Speech removido"),
    favorited: () => toast.success("Adicionado aos favoritos"),
    unfavorited: () => toast.success("Removido dos favoritos"),
    archived: () => toast.success("Speech arquivado"),
    unarchived: () => toast.success("Speech desarquivado"),
    generating: () => toast.loading("Gerando speech com IA..."),
    generated: (id: string, onView?: () => void) =>
      toast.success("Speech gerado!", {
        action: onView
          ? {
              label: "Visualizar",
              onClick: onView,
            }
          : undefined,
      }),
    error: {
      create: () =>
        toast.error("Não foi possível criar o speech. Tente novamente."),
      update: () =>
        toast.error("Não foi possível atualizar o speech. Tente novamente."),
      delete: () =>
        toast.error("Não foi possível remover o speech. Tente novamente."),
      favorite: () =>
        toast.error("Não foi possível favoritar. Tente novamente."),
      archive: () =>
        toast.error("Não foi possível arquivar. Tente novamente."),
      generate: () =>
        toast.error(
          "Não foi possível gerar o speech. Verifique sua conexão e tente novamente.",
        ),
      load: () => toast.error("Não foi possível carregar o speech."),
      missingData: () => toast.error("Por favor, preencha todos os campos obrigatórios"),
    },
  },

  // Questions
  question: {
    created: () => toast.success("Pergunta criada com sucesso!"),
    updated: () => toast.success("Pergunta atualizada!"),
    deleted: () => toast.success("Pergunta removida"),
    favorited: () => toast.success("Adicionado aos favoritos"),
    unfavorited: () => toast.success("Removido dos favoritos"),
    archived: () => toast.success("Pergunta arquivada"),
    unarchived: () => toast.success("Pergunta desarquivada"),
    generating: () => toast.loading("Gerando perguntas com IA..."),
    generated: (count: number) =>
      toast.success(`${count} ${count === 1 ? "pergunta gerada" : "perguntas geradas"}!`),
    error: {
      create: () =>
        toast.error("Não foi possível criar a pergunta. Tente novamente."),
      update: () =>
        toast.error("Não foi possível atualizar a pergunta. Tente novamente."),
      delete: () =>
        toast.error("Não foi possível remover a pergunta. Tente novamente."),
      favorite: () =>
        toast.error("Não foi possível favoritar. Tente novamente."),
      archive: () =>
        toast.error("Não foi possível arquivar. Tente novamente."),
      generate: () =>
        toast.error(
          "Não foi possível gerar as perguntas. Verifique sua conexão e tente novamente.",
        ),
      load: () => toast.error("Não foi possível carregar a pergunta."),
    },
  },

  // Experiências
  experiencia: {
    created: () => toast.success("Experiência criada com sucesso!"),
    updated: () => toast.success("Experiência atualizada!"),
    deleted: () => toast.success("Experiência removida"),
    favorited: () => toast.success("Adicionado aos favoritos"),
    unfavorited: () => toast.success("Removido dos favoritos"),
    starCaseGenerated: () => toast.success("STAR Case gerado com IA!"),
    error: {
      create: () =>
        toast.error("Não foi possível criar a experiência. Tente novamente."),
      update: () =>
        toast.error(
          "Não foi possível atualizar a experiência. Tente novamente.",
        ),
      delete: () =>
        toast.error("Não foi possível remover a experiência. Tente novamente."),
      favorite: () =>
        toast.error("Não foi possível favoritar. Tente novamente."),
      generateStarCase: () =>
        toast.error(
          "Não foi possível gerar o STAR Case. Verifique sua conexão e tente novamente.",
        ),
      load: () => toast.error("Não foi possível carregar a experiência."),
    },
  },

  // Competências
  competencia: {
    created: () => toast.success("Competência criada com sucesso!"),
    updated: () => toast.success("Competência atualizada!"),
    deleted: () => toast.success("Competência removida"),
    favorited: () => toast.success("Adicionado aos favoritos"),
    unfavorited: () => toast.success("Removido dos favoritos"),
    trackRecordGenerated: () => toast.success("Track Record gerado com IA!"),
    generating: () => toast.loading("Gerando competência com IA..."),
    generated: () => toast.success("Competência gerada com IA!"),
    error: {
      create: () =>
        toast.error("Não foi possível criar a competência. Tente novamente."),
      update: () =>
        toast.error(
          "Não foi possível atualizar a competência. Tente novamente.",
        ),
      delete: () =>
        toast.error("Não foi possível remover a competência. Tente novamente."),
      favorite: () =>
        toast.error("Não foi possível favoritar. Tente novamente."),
      generate: () =>
        toast.error(
          "Não foi possível gerar a competência. Verifique sua conexão e tente novamente.",
        ),
      generateTrackRecord: () =>
        toast.error(
          "Não foi possível gerar o Track Record. Verifique sua conexão e tente novamente.",
        ),
      load: () => toast.error("Não foi possível carregar a competência."),
    },
  },

  // Practice/Audio
  practice: {
    started: () => toast.info("Gravação iniciada"),
    stopped: () => toast.info("Gravação finalizada"),
    analyzing: () => toast.loading("Analisando sua prática com IA..."),
    analyzed: () => toast.success("Análise concluída!"),
    saved: () => toast.success("Prática salva com sucesso!"),
    error: {
      record: () =>
        toast.error(
          "Não foi possível gravar o áudio. Verifique as permissões do microfone.",
        ),
      analyze: () =>
        toast.error(
          "Não foi possível analisar a prática. Tente novamente.",
        ),
      save: () =>
        toast.error("Não foi possível salvar a prática. Tente novamente."),
      load: () => toast.error("Não foi possível carregar o histórico de práticas."),
    },
  },

  // Export
  export: {
    generating: () => toast.loading("Gerando export..."),
    success: (filename: string) =>
      toast.success(`${filename} baixado com sucesso!`),
    error: () =>
      toast.error(
        "Não foi possível gerar o export. Tente novamente.",
      ),
  },

  // Translation
  translation: {
    translating: () => toast.loading("Traduzindo..."),
    success: () => toast.success("Tradução concluída!"),
    error: () =>
      toast.error(
        "Não foi possível traduzir o conteúdo. Tente novamente.",
      ),
  },

  // Generic
  generic: {
    loading: (message?: string) => toast.loading(message || "Carregando..."),
    success: (message?: string) => toast.success(message || "Operação concluída!"),
    error: (message?: string) =>
      toast.error(message || "Algo deu errado. Tente novamente."),
    info: (message: string) => toast.info(message),
    copied: () => toast.success("Copiado para a área de transferência!"),
    saved: () => toast.success("Salvo com sucesso!"),
  },
};

/**
 * Progress toast helper
 * Returns toast ID that can be updated with progress
 */
export function createProgressToast(message: string) {
  return toast.loading(message);
}

export function updateProgressToast(
  toastId: string | number,
  message: string,
  type: "loading" | "success" | "error" = "loading",
) {
  if (type === "success") {
    toast.success(message, { id: toastId });
  } else if (type === "error") {
    toast.error(message, { id: toastId });
  } else {
    toast.loading(message, { id: toastId });
  }
}
