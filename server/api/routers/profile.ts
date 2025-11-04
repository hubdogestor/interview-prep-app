import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { BilingualContentSchema } from "@/types/prisma-json";
import { sanitizeText, sanitizeUrl, sanitizeEmail } from "@/lib/security/input-sanitizer";
import type { Prisma } from "@prisma/client";

// Schema para criar/atualizar perfil
const profileSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(200),
  titulo: z.string().min(1, "Título é obrigatório").max(200),
  foto: z.string().url("URL inválida").max(500).optional(),
  email: z.string().email("Email inválido").max(255).optional(),
  linkedin: z.string().url("URL do LinkedIn inválida").max(500).optional(),
  github: z.string().url("URL do GitHub inválida").max(500).optional(),
  resumo: BilingualContentSchema,
  anosExperiencia: z.number().int().min(0).max(100),
});

const updateProfileSchema = profileSchema.partial().extend({
  id: z.string(),
});

export const profileRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findFirst();

    if (!profile) {
      return null;
    }

    return profile;
  }),

  create: publicProcedure
    .input(profileSchema)
    .mutation(async ({ ctx, input }) => {
      // Verificar se já existe um perfil
      const existingProfile = await ctx.prisma.profile.findFirst();
      if (existingProfile) {
        throw new Error("Perfil já existe. Use 'update' para modificá-lo.");
      }

      // Sanitizar inputs
      const nomeSanitizado = sanitizeText(input.nome, 200);
      const tituloSanitizado = sanitizeText(input.titulo, 200);

      const data: Prisma.ProfileCreateInput = {
        nome: nomeSanitizado,
        titulo: tituloSanitizado,
        resumo: input.resumo as unknown as Prisma.InputJsonValue,
        anosExperiencia: input.anosExperiencia,
      };

      // Sanitizar URLs e email opcionais
      if (input.foto) {
        const fotoSanitizada = sanitizeUrl(input.foto);
        if (fotoSanitizada) {
          data.foto = fotoSanitizada;
        }
      }

      if (input.email) {
        try {
          data.email = sanitizeEmail(input.email);
        } catch {
          throw new Error("Email inválido");
        }
      }

      if (input.linkedin) {
        const linkedinSanitizado = sanitizeUrl(input.linkedin);
        if (linkedinSanitizado) {
          data.linkedin = linkedinSanitizado;
        }
      }

      if (input.github) {
        const githubSanitizado = sanitizeUrl(input.github);
        if (githubSanitizado) {
          data.github = githubSanitizado;
        }
      }

      return ctx.prisma.profile.create({ data });
    }),

  update: publicProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Verificar se perfil existe
      const existing = await ctx.prisma.profile.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("Perfil não encontrado");
      }

      // Preparar dados de atualização
      const updateData: Prisma.ProfileUpdateInput = {};

      if (data.nome) {
        updateData.nome = sanitizeText(data.nome, 200);
      }

      if (data.titulo) {
        updateData.titulo = sanitizeText(data.titulo, 200);
      }

      if (data.resumo) {
        updateData.resumo = data.resumo as unknown as Prisma.InputJsonValue;
      }

      if (data.anosExperiencia !== undefined) {
        updateData.anosExperiencia = data.anosExperiencia;
      }

      // Sanitizar URLs e email opcionais
      if (data.foto !== undefined) {
        if (data.foto) {
          const fotoSanitizada = sanitizeUrl(data.foto);
          if (fotoSanitizada) {
            updateData.foto = fotoSanitizada;
          }
        } else {
          updateData.foto = null;
        }
      }

      if (data.email !== undefined) {
        if (data.email) {
          try {
            updateData.email = sanitizeEmail(data.email);
          } catch {
            throw new Error("Email inválido");
          }
        } else {
          updateData.email = null;
        }
      }

      if (data.linkedin !== undefined) {
        if (data.linkedin) {
          const linkedinSanitizado = sanitizeUrl(data.linkedin);
          if (linkedinSanitizado) {
            updateData.linkedin = linkedinSanitizado;
          }
        } else {
          updateData.linkedin = null;
        }
      }

      if (data.github !== undefined) {
        if (data.github) {
          const githubSanitizado = sanitizeUrl(data.github);
          if (githubSanitizado) {
            updateData.github = githubSanitizado;
          }
        } else {
          updateData.github = null;
        }
      }

      return ctx.prisma.profile.update({
        where: { id },
        data: updateData,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.profile.findUnique({
        where: { id: input.id },
      });

      if (!existing) {
        throw new Error("Perfil não encontrado");
      }

      return ctx.prisma.profile.delete({
        where: { id: input.id },
      });
    }),
});
