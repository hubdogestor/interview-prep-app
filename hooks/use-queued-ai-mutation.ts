import { useAIQueue } from "@/hooks/use-ai-queue";

/**
 * Wrapper for AI generation mutations that integrates with the queue system
 */
export function useQueuedAIMutation<TInput, TOutput>({
  type,
  priority = 5,
  mutation,
  onSuccess,
  onError,
}: {
  type: "icebreaker" | "speech" | "competencia" | "experiencia" | "review";
  priority?: number;
  mutation: {
    mutate: (input: TInput) => void;
    mutateAsync: (input: TInput) => Promise<TOutput>;
    isPending: boolean;
  };
  onSuccess?: (data: TOutput) => void;
  onError?: (error: Error) => void;
}) {
  const { addToQueue, startProcessing, completeProcessing, canProcess } = useAIQueue();

  const queuedMutate = async (input: TInput, metadata?: Record<string, unknown>) => {
    // Add to queue
    const queueId = addToQueue({
      type,
      priority,
      metadata: { ...metadata, input },
    });

    // Check if can process immediately
    if (!canProcess) {
      // Will be processed when rate limit resets
      return;
    }

    try {
      // Start processing
      startProcessing(queueId);

      // Execute mutation
      const result = await mutation.mutateAsync(input);

      // Mark as completed
      completeProcessing(queueId);

      // Call success callback
      onSuccess?.(result);

      return result;
    } catch (error) {
      // Mark as failed
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      completeProcessing(queueId, errorMessage);

      // Call error callback
      onError?.(error instanceof Error ? error : new Error(errorMessage));

      throw error;
    }
  };

  return {
    queuedMutate,
    isPending: mutation.isPending,
    canProcess,
  };
}
