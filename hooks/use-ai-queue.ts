"use client";

import { create } from "zustand";

export interface AIQueueItem {
  id: string;
  type: "icebreaker" | "speech" | "competencia" | "experiencia" | "review";
  status: "queued" | "processing" | "completed" | "failed";
  priority: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  metadata?: Record<string, unknown>;
}

interface AIQueueState {
  queue: AIQueueItem[];
  isProcessing: boolean;
  rateLimitInfo: {
    remaining: number;
    resetAt: Date | null;
    maxPerMinute: number;
  };
  
  // Actions
  addToQueue: (item: Omit<AIQueueItem, "id" | "status" | "createdAt">) => string;
  removeFromQueue: (id: string) => void;
  updateQueueItem: (id: string, updates: Partial<AIQueueItem>) => void;
  startProcessing: (id: string) => void;
  completeProcessing: (id: string, error?: string) => void;
  updateRateLimit: (remaining: number, resetAt: Date) => void;
  clearCompleted: () => void;
  getNextInQueue: () => AIQueueItem | undefined;
}

/**
 * Global AI Queue Store
 * Manages queue of AI generation requests with rate limiting
 */
export const useAIQueueStore = create<AIQueueState>((set, get) => ({
  queue: [],
  isProcessing: false,
  rateLimitInfo: {
    remaining: 10,
    resetAt: null,
    maxPerMinute: 10,
  },

  addToQueue: (item) => {
    const id = `${item.type}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const newItem: AIQueueItem = {
      ...item,
      id,
      status: "queued",
      createdAt: new Date(),
    };

    set((state) => ({
      queue: [...state.queue, newItem].sort((a, b) => b.priority - a.priority),
    }));

    return id;
  },

  removeFromQueue: (id) => {
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    }));
  },

  updateQueueItem: (id, updates) => {
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  startProcessing: (id) => {
    set((state) => ({
      isProcessing: true,
      queue: state.queue.map((item) =>
        item.id === id
          ? { ...item, status: "processing" as const, startedAt: new Date() }
          : item
      ),
    }));
  },

  completeProcessing: (id, error?) => {
    const newStatus: AIQueueItem["status"] = error ? "failed" : "completed";
    set((state) => ({
      isProcessing: false,
      queue: state.queue.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              completedAt: new Date(),
              error,
            }
          : item
      ),
    }));
  },

  updateRateLimit: (remaining, resetAt) => {
    set((state) => ({
      rateLimitInfo: {
        ...state.rateLimitInfo,
        remaining,
        resetAt,
      },
    }));
  },

  clearCompleted: () => {
    set((state) => ({
      queue: state.queue.filter(
        (item) => item.status !== "completed" && item.status !== "failed"
      ),
    }));
  },

  getNextInQueue: () => {
    const state = get();
    return state.queue.find((item) => item.status === "queued");
  },
}));

/**
 * Hook for managing AI queue operations
 */
export function useAIQueue() {
  const {
    queue,
    isProcessing,
    rateLimitInfo,
    addToQueue,
    removeFromQueue,
    updateQueueItem,
    startProcessing,
    completeProcessing,
    updateRateLimit,
    clearCompleted,
    getNextInQueue,
  } = useAIQueueStore();

  const queuedCount = queue.filter((item) => item.status === "queued").length;
  const processingCount = queue.filter((item) => item.status === "processing").length;
  const completedCount = queue.filter((item) => item.status === "completed").length;
  const failedCount = queue.filter((item) => item.status === "failed").length;

  const canProcess = rateLimitInfo.remaining > 0 && !isProcessing;

  return {
    queue,
    isProcessing,
    rateLimitInfo,
    queuedCount,
    processingCount,
    completedCount,
    failedCount,
    canProcess,
    addToQueue,
    removeFromQueue,
    updateQueueItem,
    startProcessing,
    completeProcessing,
    updateRateLimit,
    clearCompleted,
    getNextInQueue,
  };
}
