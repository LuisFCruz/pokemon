import { NextResponse } from "next/server";
import { generationService } from "@/server/container";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const result = await generationService.getGenerationDetailWithPokemons(id);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Falha ao buscar detalhes da geração '${id}'`, details: message },
      { status: 500 },
    );
  }
}
