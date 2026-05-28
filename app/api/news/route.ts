import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://berita-indo-api-next.vercel.app/api/cnn-news/teknologi", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch from news API, status: ${res.status}`);
    }

    const json = await res.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error fetching live news in API route:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil berita dari API publik" },
      { status: 500 }
    );
  }
}
