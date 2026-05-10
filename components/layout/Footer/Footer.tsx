import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { HiLocationMarker, HiPhone, HiMail, HiGlobe } from "react-icons/hi"

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Column 1: Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* Logo from public/img */}
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src="/img/Logo_Politeknik_Negeri_Manado.png"
                  alt="Logo Polimdo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">D3 Teknik Listrik</h3>
                <p className="text-gray-500 text-sm">Politeknik Negeri Manado</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Menghasilkan lulusan Sarjana Terapan yang unggul,
              inovatif, dan kompeten di bidang teknik listrik,
              sistem tenaga, dan instalasi kelistrikan untuk
              memenuhi tuntutan industri global.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Tautan Publik */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">Tautan Publik</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/visi-misi" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link href="/dosen" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  Direktori Pengajar
                </Link>
              </li>
              <li>
                <Link href="/kurikulum" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  Struktur Kurikulum
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  Fasilitas & Tri Dharma
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hubungi Kami */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-primary mt-0.5 shrink-0" size={18} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Kampus Politeknik Negeri Manado<br />
                  Jl. Raya Politeknik, Buha, Mapanget<br />
                  Kota Manado, Sulawesi Utara 95252
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-primary shrink-0" size={18} />
                <a href="tel:+624318111149" className="text-gray-400 text-sm hover:text-white transition-colors">
                  (0431) 811149
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-primary shrink-0" size={18} />
                <a href="mailto:info@polimdo.ac.id" className="text-gray-400 text-sm hover:text-white transition-colors">
                  info@polimdo.ac.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiGlobe className="text-primary shrink-0" size={18} />
                <a href="https://teknikelektropolimdo.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">
                  teknikelektropolimdo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Program Studi D3 Teknik Listrik, Politeknik Negeri Manado.</p>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hover:text-white transition-colors">Portal Login (Internal)</Link>
            <span>•</span>
            <span>Hak Cipta Dilindungi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
