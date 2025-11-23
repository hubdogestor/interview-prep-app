import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * API para limpar todos os cards dos Kanbans e OKRs
 * POST /api/admin/clear-cards
 */
export async function POST() {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Limpar apenas os cards do usuário atual
    const userId = session.user.id;

    // Limpar Kanbans
    const kanbansResult = await prisma.kanbanBoard.deleteMany({
      where: { userId },
    });

    // Limpar OKRs
    const okrsResult = await prisma.oKR.deleteMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      message: "Todos os cards foram limpos com sucesso",
      deleted: {
        kanbans: kanbansResult.count,
        okrs: okrsResult.count,
      },
    });
  } catch (error) {
    console.error("Erro ao limpar cards:", error);
    return NextResponse.json(
      { error: "Erro ao limpar cards" },
      { status: 500 }
    );
  }
}
