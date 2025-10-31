import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Schema para versão individual de icebreaker
const versaoSchema = z.object({
  nome: z.string().min(1, "Nome da versão é obrigatório"),
  conteudo: z.object({
    pt: z.string().min(1, "Conteúdo em português é obrigatório"),
    en: z.string().default(""),
  }),
  duracao: z.number().positive("Duração deve ser maior que zero"),
  tags: z.array(z.string()).default([]),
});

// Schema para criar icebreaker
const createIcebrekerSchema = z.object({
  tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]),
  titulo: z.string().min(1, "Título é obrigatório"),
  versoes: z.array(versaoSchema).min(1, "Adicione pelo menos uma versão"),
});

// Schema para atualizar icebreaker
const updateIcebrekerSchema = z.object({
  id: z.string(),
  tipo: z.enum(["elevator_pitch", "quick_intro", "personal_story"]).optional(),
  titulo: z.string().min(1, "Título é obrigatório").optional(),
  versoes: z.array(versaoSchema).optional(),
});

export const icebreakersRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.icebreaker.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.icebreaker.findUnique({
        where: { id: input.id },
      });
    }),

  create: publicProcedure
    .input(createIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.icebreaker.create({
        data: {
          tipo: input.tipo,
          titulo: input.titulo,
          versoes: input.versoes as any,
        },
      });
    }),

  update: publicProcedure
    .input(updateIcebrekerSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.icebreaker.update({
        where: { id },
        data: {
          ...(data.tipo && { tipo: data.tipo }),
          ...(data.titulo && { titulo: data.titulo }),
          ...(data.versoes && { versoes: data.versoes as any }),
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.icebreaker.delete({
        where: { id: input.id },
      });
    }),
});
