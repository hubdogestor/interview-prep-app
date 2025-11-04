/**
 * Collaboration Router - tRPC
 *
 * Endpoints para funcionalidades de colaboração:
 * - Compartilhamento de recursos
 * - Comentários e discussões
 * - Gerenciamento de permissões
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import {
  assertOwnership,
  shareResource,
  unshareResource,
  createPublicShareLink,
  canComment,
  canEditComment,
  type ResourceType,
  type Permission,
} from '@/lib/auth/authorization';

// ============================================================
// Input Schemas
// ============================================================

const resourceTypeSchema = z.enum([
  'icebreaker',
  'speech',
  'competencia',
  'experiencia',
  'question',
]);

const permissionSchema = z.enum(['view', 'comment', 'edit']);

const shareResourceSchema = z.object({
  resourceType: resourceTypeSchema,
  resourceId: z.string(),
  shareWith: z.array(z.string().email()),
  permission: permissionSchema,
  expiresAt: z.date().optional(),
});

const createCommentSchema = z.object({
  resourceType: resourceTypeSchema,
  resourceId: z.string(),
  content: z.string().min(1).max(5000),
  parentId: z.string().optional(),
});

// ============================================================
// Router
// ============================================================

export const collaborationRouter = createTRPCRouter({
  // ========================================
  // SHARING
  // ========================================

  /**
   * Compartilhar recurso com usuários específicos
   */
  share: protectedProcedure
    .input(shareResourceSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const sharedItem = await shareResource(
        input.resourceType,
        input.resourceId,
        userId,
        input.shareWith,
        input.permission,
        input.expiresAt
      );

      return {
        success: true,
        sharedItem,
      };
    }),

  /**
   * Remover compartilhamento
   */
  unshare: protectedProcedure
    .input(
      z.object({
        resourceType: resourceTypeSchema,
        resourceId: z.string(),
        removeUsers: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      await unshareResource(
        input.resourceType,
        input.resourceId,
        userId,
        input.removeUsers
      );

      return { success: true };
    }),

  /**
   * Criar link público de compartilhamento
   */
  createPublicLink: protectedProcedure
    .input(
      z.object({
        resourceType: resourceTypeSchema,
        resourceId: z.string(),
        permission: permissionSchema,
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const shareToken = await createPublicShareLink(
        input.resourceType,
        input.resourceId,
        userId,
        input.permission,
        input.expiresAt
      );

      return {
        success: true,
        shareToken,
        shareUrl: `${process.env.NEXTAUTH_URL}/shared/${shareToken}`,
      };
    }),

  /**
   * Listar compartilhamentos de um recurso
   */
  listShares: protectedProcedure
    .input(
      z.object({
        resourceType: resourceTypeSchema,
        resourceId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verificar ownership
      await assertOwnership(input.resourceType, input.resourceId, userId);

      const shares = await ctx.prisma.sharedItem.findMany({
        where: {
          ownerId: userId,
          itemType: input.resourceType,
          itemId: input.resourceId,
        },
        orderBy: { createdAt: 'desc' },
      });

      return shares;
    }),

  /**
   * Listar recursos compartilhados COMIGO
   */
  sharedWithMe: protectedProcedure
    .input(
      z
        .object({
          resourceType: resourceTypeSchema.optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const userEmail = ctx.session.user.email;

      const shares = await ctx.prisma.sharedItem.findMany({
        where: {
          itemType: input?.resourceType,
          OR: [
            { sharedWith: { has: userId } },
            { sharedWith: { has: userEmail } },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });

      return shares;
    }),

  // ========================================
  // COMMENTS
  // ========================================

  /**
   * Criar comentário
   */
  createComment: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verificar se pode comentar
      const hasPermission = await canComment(
        input.resourceType,
        input.resourceId,
        userId
      );

      if (!hasPermission) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to comment on this resource',
        });
      }

      const comment = await ctx.prisma.comment.create({
        data: {
          userId,
          itemType: input.resourceType,
          itemId: input.resourceId,
          content: input.content,
          parentId: input.parentId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return comment;
    }),

  /**
   * Listar comentários de um recurso
   */
  listComments: protectedProcedure
    .input(
      z.object({
        resourceType: resourceTypeSchema,
        resourceId: z.string(),
        parentId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          itemType: input.resourceType,
          itemId: input.resourceId,
          parentId: input.parentId || null,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      return comments;
    }),

  /**
   * Atualizar comentário
   */
  updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        content: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verificar se pode editar
      const canEdit = await canEditComment(input.commentId, userId);

      if (!canEdit) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only edit your own comments',
        });
      }

      const comment = await ctx.prisma.comment.update({
        where: { id: input.commentId },
        data: { content: input.content },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return comment;
    }),

  /**
   * Deletar comentário
   */
  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verificar se pode editar
      const canEdit = await canEditComment(input.commentId, userId);

      if (!canEdit) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own comments',
        });
      }

      await ctx.prisma.comment.delete({
        where: { id: input.commentId },
      });

      return { success: true };
    }),

  /**
   * Marcar comentário como resolvido
   */
  resolveComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        isResolved: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verificar se pode editar
      const canEdit = await canEditComment(input.commentId, userId);

      if (!canEdit) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only resolve your own comments',
        });
      }

      const comment = await ctx.prisma.comment.update({
        where: { id: input.commentId },
        data: { isResolved: input.isResolved },
      });

      return comment;
    }),

  /**
   * Contar comentários de um recurso
   */
  countComments: protectedProcedure
    .input(
      z.object({
        resourceType: resourceTypeSchema,
        resourceId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.comment.count({
        where: {
          itemType: input.resourceType,
          itemId: input.resourceId,
        },
      });

      const unresolvedCount = await ctx.prisma.comment.count({
        where: {
          itemType: input.resourceType,
          itemId: input.resourceId,
          isResolved: false,
        },
      });

      return {
        total: count,
        unresolved: unresolvedCount,
        resolved: count - unresolvedCount,
      };
    }),
});
