import { FormSkeleton } from "@/components/loading/form-skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <FormSkeleton />
    </div>
  );
}
