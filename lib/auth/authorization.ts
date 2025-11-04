/**
 * Authorization Helpers
 *
 * Funções para verificar permissões e controle de acesso
 * a recursos (icebreakers, speeches, competencias, etc.)
 */

import { prisma } from '@/server/db';
import { TRPCError } from '@trpc/server';

// ============================================================
// Types
// ============================================================

export type ResourceType =
  | 'icebreaker'
  | 'speech'
  | 'competencia'
  | 'experiencia'
  | 'question'
  | 'practice';

export type Permission = 'view' | 'comment' | 'edit';

// ============================================================
// Ownership Verification
// ============================================================

/**
 * Verifica se usuário é dono de um recurso
 *
 * @throws TRPCError se não for o dono
 */
export async function assertOwnership(
  resourceType: ResourceType,
  resourceId: string,
  userId: string
): Promise<void> {
  const isOwner = await checkOwnership(resourceType, resourceId, userId);

  if (!isOwner) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    });
  }
}

/**
 * Verifica se usuário é dono de um recurso
 *
 * @returns true se for o dono, false caso contrário
 */
export async function checkOwnership(
  resourceType: ResourceType,
  resourceId: string,
  userId: string
): Promise<boolean> {
  const modelMap = {
    icebreaker: 'icebreaker',
    speech: 'speech',
    competencia: 'competencia',
    experiencia: 'experiencia',
    question: 'question',
    practice: 'practiceSession',
  } as const;

  const model = modelMap[resourceType];

  try {
    // @ts-expect-error - Prisma typing complexa com nomes dinâmicos
    const resource = await prisma[model].findUnique({
      where: { id: resourceId },
      select: { userId: true },
    });

    return resource?.userId === userId;
  } catch (error) {
    return false;
  }
}

// ============================================================
// Sharing & Collaboration Permissions
// ============================================================

/**
 * Verifica se usuário tem acesso a um recurso compartilhado
 *
 * @param resourceType Tipo do recurso
 * @param resourceId ID do recurso
 * @param userId ID do usuário
 * @param requiredPermission Permissão mínima necessária
 * @returns true se tiver acesso, false caso contrário
 */
export async function checkSharedAccess(
  resourceType: ResourceType,
  resourceId: string,
  userId: string,
  requiredPermission: Permission = 'view'
): Promise<boolean> {
  // Verificar se é o dono (sempre tem acesso total)
  const isOwner = await checkOwnership(resourceType, resourceId, userId);
  if (isOwner) {
    return true;
  }

  // Verificar se foi compartilhado com o usuário
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user) {
    return false;
  }

  const sharedItem = await prisma.sharedItem.findFirst({
    where: {
      itemType: resourceType,
      itemId: resourceId,
      OR: [
        { sharedWith: { has: userId } },
        { sharedWith: { has: user.email } },
        { isPublic: true },
      ],
    },
  });

  if (!sharedItem) {
    return false;
  }

  // Verificar se o compartilhamento expirou
  if (sharedItem.expiresAt && sharedItem.expiresAt < new Date()) {
    return false;
  }

  // Verificar nível de permissão
  return hasPermissionLevel(sharedItem.permission, requiredPermission);
}

/**
 * Verifica se usuário tem acesso a recurso (dono ou compartilhado)
 *
 * @throws TRPCError se não tiver acesso
 */
export async function assertAccess(
  resourceType: ResourceType,
  resourceId: string,
  userId: string,
  requiredPermission: Permission = 'view'
): Promise<void> {
  const hasAccess = await checkSharedAccess(
    resourceType,
    resourceId,
    userId,
    requiredPermission
  );

  if (!hasAccess) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    });
  }
}

/**
 * Compara níveis de permissão
 *
 * Hierarquia: view < comment < edit
 */
function hasPermissionLevel(
  granted: string,
  required: Permission
): boolean {
  const hierarchy: Record<Permission, number> = {
    view: 1,
    comment: 2,
    edit: 3,
  };

  return hierarchy[granted as Permission] >= hierarchy[required];
}

// ============================================================
// Sharing Helpers
// ============================================================

/**
 * Compartilha recurso com usuários
 *
 * @param resourceType Tipo do recurso
 * @param resourceId ID do recurso
 * @param ownerId ID do dono do recurso
 * @param shareWith Lista de emails ou userIds para compartilhar
 * @param permission Nível de permissão
 * @param expiresAt Data de expiração (opcional)
 */
export async function shareResource(
  resourceType: ResourceType,
  resourceId: string,
  ownerId: string,
  shareWith: string[],
  permission: Permission,
  expiresAt?: Date
) {
  // Verificar ownership
  await assertOwnership(resourceType, resourceId, ownerId);

  // Criar ou atualizar compartilhamento
  const existing = await prisma.sharedItem.findFirst({
    where: {
      ownerId,
      itemType: resourceType,
      itemId: resourceId,
    },
  });

  if (existing) {
    // Atualizar compartilhamento existente
    return await prisma.sharedItem.update({
      where: { id: existing.id },
      data: {
        sharedWith: [...new Set([...existing.sharedWith, ...shareWith])],
        permission,
        expiresAt,
      },
    });
  } else {
    // Criar novo compartilhamento
    return await prisma.sharedItem.create({
      data: {
        ownerId,
        itemType: resourceType,
        itemId: resourceId,
        sharedWith: shareWith,
        permission,
        expiresAt,
      },
    });
  }
}

/**
 * Remove compartilhamento de recurso
 */
export async function unshareResource(
  resourceType: ResourceType,
  resourceId: string,
  ownerId: string,
  removeUsers: string[]
) {
  await assertOwnership(resourceType, resourceId, ownerId);

  const existing = await prisma.sharedItem.findFirst({
    where: {
      ownerId,
      itemType: resourceType,
      itemId: resourceId,
    },
  });

  if (existing) {
    const updatedSharedWith = existing.sharedWith.filter(
      (user) => !removeUsers.includes(user)
    );

    if (updatedSharedWith.length === 0) {
      // Se não sobrou ninguém, deletar o compartilhamento
      await prisma.sharedItem.delete({ where: { id: existing.id } });
    } else {
      // Atualizar lista
      await prisma.sharedItem.update({
        where: { id: existing.id },
        data: { sharedWith: updatedSharedWith },
      });
    }
  }
}

/**
 * Cria link público para compartilhamento
 */
export async function createPublicShareLink(
  resourceType: ResourceType,
  resourceId: string,
  ownerId: string,
  permission: Permission,
  expiresAt?: Date
): Promise<string> {
  await assertOwnership(resourceType, resourceId, ownerId);

  // Gerar token único
  const shareToken = generateShareToken();

  await prisma.sharedItem.create({
    data: {
      ownerId,
      itemType: resourceType,
      itemId: resourceId,
      isPublic: true,
      shareToken,
      permission,
      expiresAt,
      sharedWith: [],
    },
  });

  return shareToken;
}

/**
 * Gera token único para compartilhamento
 */
function generateShareToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// ============================================================
// Comments Authorization
// ============================================================

/**
 * Verifica se usuário pode comentar em recurso
 */
export async function canComment(
  resourceType: ResourceType,
  resourceId: string,
  userId: string
): Promise<boolean> {
  return await checkSharedAccess(resourceType, resourceId, userId, 'comment');
}

/**
 * Verifica se usuário pode editar comentário
 */
export async function canEditComment(
  commentId: string,
  userId: string
): Promise<boolean> {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  return comment?.userId === userId;
}
