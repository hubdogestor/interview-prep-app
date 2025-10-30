import type { ChatConversation, ChatData, ChatUser } from "@/types/chat";

const currentUser: ChatUser = {
  id: "leonardo",
  name: "Leonardo",
  username: "@leonardo.dev",
  avatar: "/avatars/user_joyboy.png",
  isOnline: true,
};

const contacts: Record<string, ChatUser> = {
  ana: {
    id: "ana",
    name: "Ana Vieira",
    username: "@coach.ana",
    avatar: "/avatars/user_mati.png",
    isOnline: true,
  },
  bruno: {
    id: "bruno",
    name: "Bruno Martins",
    username: "@mentor.bruno",
    avatar: "/avatars/user_krimson.png",
    isOnline: false,
  },
  sara: {
    id: "sara",
    name: "Sara Kim",
    username: "@feedback.sara",
    avatar: "/avatars/user_pek.png",
    isOnline: true,
  },
  community: {
    id: "community",
    name: "Comunidade Interview Prep",
    username: "@community",
    avatar: "/avatars/user_krimson.png",
    isOnline: false,
  },
};

const now = Date.now();

const conversations: ChatConversation[] = [
  {
    id: "conv-ana",
    participants: [currentUser, contacts.ana],
    unreadCount: 1,
    lastMessage: {
      id: "msg-ana-3",
      content: "Enviei comentários detalhados no STAR da experiência 2 🚀",
      timestamp: new Date(now - 5 * 60 * 1000).toISOString(),
      senderId: "ana",
      isFromCurrentUser: false,
    },
    messages: [
      {
        id: "msg-ana-1",
        content: "Como você se sentiu respondendo a pergunta de conflitos?",
        timestamp: new Date(now - 45 * 60 * 1000).toISOString(),
        senderId: "ana",
        isFromCurrentUser: false,
      },
      {
        id: "msg-ana-2",
        content: "Vou revisar seu vídeo agora de manhã e te retorno.",
        timestamp: new Date(now - 25 * 60 * 1000).toISOString(),
        senderId: "ana",
        isFromCurrentUser: false,
      },
      {
        id: "msg-ana-3",
        content: "Enviei comentários detalhados no STAR da experiência 2 🚀",
        timestamp: new Date(now - 5 * 60 * 1000).toISOString(),
        senderId: "ana",
        isFromCurrentUser: false,
      },
    ],
  },
  {
    id: "conv-bruno",
    participants: [currentUser, contacts.bruno],
    unreadCount: 0,
    lastMessage: {
      id: "msg-bruno-3",
      content: "Agenda confirmada para amanhã às 19h. Foque em métricas!",
      timestamp: new Date(now - 90 * 60 * 1000).toISOString(),
      senderId: "bruno",
      isFromCurrentUser: false,
    },
    messages: [
      {
        id: "msg-bruno-1",
        content: "Vamos treinar perguntas de produto? Tenho um case bacana.",
        timestamp: new Date(now - 120 * 60 * 1000).toISOString(),
        senderId: "bruno",
        isFromCurrentUser: false,
      },
      {
        id: "msg-bruno-2",
        content: "Sim! Quero aproveitar e testar as respostas em português.",
        timestamp: new Date(now - 110 * 60 * 1000).toISOString(),
        senderId: "leonardo",
        isFromCurrentUser: true,
      },
      {
        id: "msg-bruno-3",
        content: "Agenda confirmada para amanhã às 19h. Foque em métricas!",
        timestamp: new Date(now - 90 * 60 * 1000).toISOString(),
        senderId: "bruno",
        isFromCurrentUser: false,
      },
    ],
  },
  {
    id: "conv-sara",
    participants: [currentUser, contacts.sara],
    unreadCount: 0,
    lastMessage: {
      id: "msg-sara-4",
      content: "Check-in diário finalizado ✅",
      timestamp: new Date(now - 240 * 60 * 1000).toISOString(),
      senderId: "leonardo",
      isFromCurrentUser: true,
    },
    messages: [
      {
        id: "msg-sara-1",
        content: "Não esquece do check-in de perguntas técnicas hoje.",
        timestamp: new Date(now - 360 * 60 * 1000).toISOString(),
        senderId: "sara",
        isFromCurrentUser: false,
      },
      {
        id: "msg-sara-2",
        content: "Acabei de revisar as perguntas sobre arquitetura. Obrigado!",
        timestamp: new Date(now - 300 * 60 * 1000).toISOString(),
        senderId: "leonardo",
        isFromCurrentUser: true,
      },
      {
        id: "msg-sara-3",
        content: "Top! Marca o progresso na planilha da squad.",
        timestamp: new Date(now - 280 * 60 * 1000).toISOString(),
        senderId: "sara",
        isFromCurrentUser: false,
      },
      {
        id: "msg-sara-4",
        content: "Check-in diário finalizado ✅",
        timestamp: new Date(now - 240 * 60 * 1000).toISOString(),
        senderId: "leonardo",
        isFromCurrentUser: true,
      },
    ],
  },
  {
    id: "conv-community",
    participants: [currentUser, contacts.community],
    unreadCount: 3,
    lastMessage: {
      id: "msg-community-3",
      content: "Nova vaga compartilhada: Senior Frontend @ Nubank",
      timestamp: new Date(now - 30 * 60 * 1000).toISOString(),
      senderId: "community",
      isFromCurrentUser: false,
    },
    messages: [
      {
        id: "msg-community-1",
        content: "Hoje temos mock público às 21h no Discord.",
        timestamp: new Date(now - 45 * 60 * 1000).toISOString(),
        senderId: "community",
        isFromCurrentUser: false,
      },
      {
        id: "msg-community-2",
        content: "Enviei a planilha atualizada de perguntas comportamentais.",
        timestamp: new Date(now - 40 * 60 * 1000).toISOString(),
        senderId: "community",
        isFromCurrentUser: false,
      },
      {
        id: "msg-community-3",
        content: "Nova vaga compartilhada: Senior Frontend @ Nubank",
        timestamp: new Date(now - 30 * 60 * 1000).toISOString(),
        senderId: "community",
        isFromCurrentUser: false,
      },
    ],
  },
];

export const mockChatData: ChatData = {
  currentUser,
  conversations,
};
