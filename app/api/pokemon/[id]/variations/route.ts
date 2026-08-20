import { NextRequest, NextResponse } from "next/server";
import { pokemonService } from "@/server/container";
import { NotFoundError } from "@/server/shared/errors/NotFoundError";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const variations = await pokemonService.getPokemonVariations(id);
    return NextResponse.json({ variations }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
