import { NextResponse } from "next/server";
import { locationService } from "@/server/container";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;

  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!, 10)
    : 20;

  try {
    const result = await locationService.getLocationList({ page, limit });
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Falha ao buscar localizações", details: message },
      { status: 500 },
    );
  }
}
