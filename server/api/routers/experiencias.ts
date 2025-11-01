import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateStarCase } from "@/lib/ai/gemini";

// Schema para STAR Case individual
const starCaseSchema = z.object({
  titulo: z.string().min(1, "Título do case é obrigatório"),
  situation: z.string().min(1, "Situation é obrigatória"),
  task: z.string().min(1, "Task é obrigatória"),
  action: z.string().min(1, "Action é obrigatória"),
  result: z.string().min(1, "Result é obrigatório"),
  idioma: z.enum(["pt", "en"]),
});

// Schema para criar experiência
const createExperienciaSchema = z.object({
  empresa: z.string().min(1, "Nome da empresa é obrigatório"),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  periodo: z.object({
    inicio: z.string().min(1, "Data de início é obrigatória"),
    fim: z.string().nullable(),
  }),
  pitchElevator: z.object({
    pt: z.string().min(1, "Pitch em português é obrigatório"),
    en: z.string().default(""),
  }),
  speechCompleto: z.object({
    pt: z.string().min(1, "Speech em português é obrigatório"),
    en: z.string().default(""),
  }),
  starCases: z.array(starCaseSchema).default([]),
  tecnologias: z.array(z.string()).default([]),
});

// Schema para atualizar experiência
const updateExperienciaSchema = z.object({
  id: z.string(),
  empresa: z.string().min(1, "Nome da empresa é obrigatório").optional(),
  cargo: z.string().min(1, "Cargo é obrigatório").optional(),
  periodo: z
    .object({
      inicio: z.string().min(1, "Data de início é obrigatória"),
      fim: z.string().nullable(),
    })
    .optional(),
  pitchElevator: z
    .object({
      pt: z.string().min(1, "Pitch em português é obrigatório"),
      en: z.string().default(""),
    })
    .optional(),
  speechCompleto: z
    .object({
      pt: z.string().min(1, "Speech em português é obrigatório"),
      en: z.string().default(""),
    })
    .optional(),
  starCases: z.array(starCaseSchema).optional(),
  tecnologias: z.array(z.string()).optional(),
});

export const experienciasRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.experiencia.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.experiencia.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(createExperienciaSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.experiencia.create({
        data: {
          empresa: input.empresa,
          cargo: input.cargo,
          periodo: input.periodo as any,
          pitchElevator: input.pitchElevator as any,
          speechCompleto: input.speechCompleto as any,
          starCases: input.starCases as any,
          tecnologias: input.tecnologias,
        },
      });
    }),

  update: publicProcedure
    .input(updateExperienciaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.experiencia.update({
        where: { id },
        data: {
          ...(data.empresa && { empresa: data.empresa }),
          ...(data.cargo && { cargo: data.cargo }),
          ...(data.periodo && { periodo: data.periodo as any }),
          ...(data.pitchElevator && { pitchElevator: data.pitchElevator as any }),
          ...(data.speechCompleto && {
            speechCompleto: data.speechCompleto as any,
          }),
          ...(data.starCases && { starCases: data.starCases as any }),
          ...(data.tecnologias && { tecnologias: data.tecnologias }),
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.experiencia.delete({
        where: { id: input.id },
      });
    }),

  generateStarCaseWithAI: publicProcedure
    .input(
      z.object({
        mode: z.enum(["auto", "guided", "rewrite"]),
        idioma: z.enum(["pt", "en"]),
        experienciaId: z.string().optional(),
        empresaNome: z.string().optional(),
        cargoNome: z.string().optional(),
        // Guided mode
        titulo: z.string().optional(),
        contexto: z.string().optional(),
        competenciaFoco: z.string().optional(),
        // Rewrite mode
        existingCase: starCaseSchema.optional(),
        rewriteInstructions: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return generateStarCase(
        input.mode,
        input.idioma,
        {
          empresa: input.empresaNome,
          cargo: input.cargoNome,
        },
        input.titulo && input.contexto
          ? {
              titulo: input.titulo,
              contexto: input.contexto,
              competenciaFoco: input.competenciaFoco,
            }
          : undefined,
        input.existingCase,
        input.rewriteInstructions
      );
    }),
});
