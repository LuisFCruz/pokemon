import { NextRequest, NextResponse } from "next/server";
import { pokemonService } from "@/server/container";
import { NotFoundError } from "@/server/shared/errors/NotFoundError";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : 20;
    const offset = offsetParam ? parseInt(offsetParam, 10) : undefined;

    const data = await pokemonService.getPokemonList({
      page: page && !isNaN(page) ? page : undefined,
      limit: limit && !isNaN(limit) ? limit : 20,
      offset: offset && !isNaN(offset) ? offset : undefined,
    });

    return NextResponse.json(data, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
