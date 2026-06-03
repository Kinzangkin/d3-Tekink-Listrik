import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("kurikulum")
      .select("*")
      .order("semester", { ascending: true })
      .order("kode", { ascending: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error fetching curriculum from Supabase:", error)
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kurikulum", error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { kode, nama, sks, jenis, semester } = body

    if (!kode || !nama || !sks || !jenis || !semester) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("kurikulum")
      .insert([{ kode, nama, sks, jenis, semester }])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error creating curriculum entry in Supabase:", error)
    return NextResponse.json(
      { success: false, message: "Gagal menambah data kurikulum", error: error.message },
      { status: 500 }
    )
  }
}
