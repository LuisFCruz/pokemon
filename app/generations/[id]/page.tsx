import { GenerationDetailPage } from "@/client/_pages/generation-detail";

export default async function GenerationDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GenerationDetailPage id={id} />;
}
