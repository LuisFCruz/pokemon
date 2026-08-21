import { NextResponse } from "next/server";

import { generationService } from "@/server/container";

export async function GET() {
  try {
    const result = await generationService.getGenerationList();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Falha ao buscar gerações", details: message },
      { status: 500 },
    );
  }
}
