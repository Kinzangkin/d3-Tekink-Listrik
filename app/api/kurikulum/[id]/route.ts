import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      .update({ kode, nama, sks, jenis, semester })
      .eq("id", id)
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error updating curriculum entry in Supabase:", error)
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data kurikulum", error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabase
      .from("kurikulum")
      .delete()
      .eq("id", id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, message: "Data berhasil dihapus" })
  } catch (error: any) {
    console.error("Error deleting curriculum entry from Supabase:", error)
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data kurikulum", error: error.message },
      { status: 500 }
    )
  }
}
