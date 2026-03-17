import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Terminal,
  Cpu,
  Command,
  Search,
  Zap,
  CheckCircle2,
  Lightbulb,
  Map as MapIcon,
  Compass,
  MapPin,
  BookOpen,
  ExternalLink,
  MessageCircle,
  Calendar,
  XCircle,
  Clock,
  Layers,
  Code,
  Rocket,
  Target,
  Wrench
} from 'lucide-react';

// --- Custom Hook untuk Animasi Scroll ---
const useInView = (options) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref);
      }
    }, options);
    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

// --- Komponen: Wrapper Animasi Reveal ---
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [setRef, isVisible] = useInView({ threshold: 0.1 });

  const baseClasses = "transition-all duration-1000";
  const easeStyle = {
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`
  };

  const hiddenClasses = direction === 'up'
    ? "opacity-0 translate-y-8"
    : direction === 'left'
      ? "opacity-0 -translate-x-8"
      : "opacity-0 translate-x-8";
  const visibleClasses = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div
      ref={setRef}
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`}
      style={easeStyle}
    >
      {children}
    </div>
  );
};

// --- Komponen: Demo AI Interaktif ---
const AIDemo = () => {
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState(['Sistem siap. Menunggu input...']);

  const runDemo = () => {
    if (status === 'processing') return;
    setStatus('processing');
    setLogs(['Menginisialisasi RAG Engine...']);

    const steps = [
      'Mengambil dokumen dari vector store...',
      'Embedding query: "Optimasi rute logistik"',
      'Konteks ditemukan di 4 chunks (cosine similarity: 0.89)',
      'Mensintesis respons via GPT-4o...',
      'Menerapkan konstrain logika bisnis...',
      'Sukses: Rute teroptimasi dihasilkan dalam 420ms'
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (i === steps.length - 1) setStatus('idle');
      }, (i + 1) * 600);
    });
  };

  return (
    <div className="premium-border rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden max-w-2xl mx-auto shadow-2xl">
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase flex items-center gap-2">
          <Zap size={10} className="text-yellow-400" /> AI Agent Runtime
        </div>
      </div>
      <div className="p-6 font-mono text-xs sm:text-sm h-64 overflow-y-auto space-y-2 custom-scrollbar text-left">
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-3 ${i === logs.length - 1 && status === 'processing' ? 'animate-pulse text-indigo-400' : 'text-white/60'}`}>
            <span className="text-white/30 shrink-0">[{new Date().toLocaleTimeString('id-ID', { hour12: false })}]</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white/[0.02] border-t border-white/5 flex gap-3 flex-wrap sm:flex-nowrap">
        <div className="flex-grow bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white/50 text-xs flex items-center gap-2 w-full sm:w-auto">
          <Command size={14} /> Optimasi rute logistik...
        </div>
        <button
          onClick={runDemo}
          disabled={status === 'processing'}
          className="w-full sm:w-auto px-6 py-3 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          {status === 'processing' ? 'MEMPROSES...' : 'EKSEKUSI'}
        </button>
      </div>
    </div>
  );
};

// --- Data Konstan (Pemisahan Data dari UI) ---
const CASE_STUDIES = [
  {
    id: "01",
    title: "Optimasi Latensi Vector Search",
    client: "Global Logistics Corp",
    challenge: "Hasil pencarian memakan waktu >2s karena indeks database yang tidak teroptimasi melintasi 1M+ chunk dokumen.",
    solution: "Menerapkan indeks HNSW dengan filter metadata kustom, menggabungkan pencarian hybrid.",
    impact: "Mengurangi latensi 85% menjadi <300ms. Sistem menangani 5x user bersamaan tanpa masalah."
  },
  {
    id: "02",
    title: "Integrasi CRM Multi-Agent",
    client: "FinTech Hub",
    challenge: "Kebutuhan agen otonom untuk menangani tiket dukungan pelanggan yang kompleks dengan akurasi 99.9%.",
    solution: "Merancang arsitektur agen hierarkis menggunakan LangGraph untuk mengelola state & verifikasi output.",
    impact: "Berhasil mengotomatisasi 60% tiket manual dengan feedback positif dari pelanggan."
  }
];

// DATA PROYEK BARU
const PROJECTS = [
  {
    title: "DirektoriSekolah.id",
    description: "Platform pencarian sekolah berbasis peta dengan data real-time dari OpenStreetMap. Pengguna bisa mencari sekolah berdasarkan lokasi, filter kategori, dan melihat detail lengkap secara visual.",
    problem: "Orang tua dan siswa kesulitan mencari sekolah terdekat dengan data yang akurat dan visualisasi peta yang jelas.",
    solution: "Membangun direktori sekolah berbasis peta interaktif memanfaatkan data terbuka (open data) untuk eksplorasi yang lebih mudah.",
    tech: ["React", "OpenStreetMap", "Leaflet", "API Integration"],
    highlights: ["Pencarian Berbasis Lokasi", "Peta Interaktif", "Data Real-time"],
    icon: MapIcon
  },
  {
    title: "Validasi Jarak & Survey Lapangan",
    description: "Web app untuk membantu tim lapangan memvalidasi lokasi, jarak, dan dokumentasi survey secara visual dan akurat.",
    problem: "Data survey dari lapangan sering kali tidak akurat, sulit diverifikasi, dan minim dokumentasi visual yang valid.",
    solution: "Menyediakan tool terintegrasi berbasis peta, foto, dan koordinat untuk validasi langsung secara real-time di lokasi lapangan.",
    tech: ["React", "Geolocation API", "Map Integration"],
    highlights: ["Tracking Lokasi Real-time", "Upload Foto Bukti", "Validasi Titik Koordinat"],
    icon: Compass
  },
  {
    title: "Direktori Masjid + Waktu Sholat",
    description: "Platform pencarian masjid lengkap dengan fasilitas dan jadwal waktu sholat otomatis yang disesuaikan dengan lokasi pengguna.",
    problem: "Pengguna sering kesulitan menemukan masjid terdekat dengan fasilitas tertentu (seperti parkir luas atau ramah anak) saat sedang dalam perjalanan.",
    solution: "Menghadirkan direktori masjid berbasis lokasi dengan informasi fasilitas lengkap dan fitur jadwal sholat otomatis.",
    tech: ["React", "API Jadwal Sholat", "Map Integration"],
    highlights: ["Auto Deteksi Lokasi", "Jadwal Sholat Akurat", "Filter Fasilitas Masjid"],
    icon: MapPin
  },
  {
    title: "Al-Qur'an App untuk Anak",
    description: "Aplikasi membaca Al-Qur'an yang dirancang khusus untuk anak-anak dengan antarmuka yang sederhana, interaktif, dan ramah anak.",
    problem: "Sebagian besar aplikasi Al-Qur'an yang ada terlalu kompleks, penuh teks, dan kurang menarik bagi pengguna usia anak-anak.",
    solution: "Menciptakan antarmuka (UI) minimalis dengan fokus pada pengalaman membaca yang nyaman dan fitur audio untuk mendukung belajar.",
    tech: ["React", "Audio API"],
    highlights: ["UI Sederhana & Ramah Anak", "Audio Pemutar Ayat", "Navigasi Intuitif"],
    icon: BookOpen
  }
];

const SKILLS = ["REACT", "NEXT.JS", "PYTHON", "OPENAI", "LANGCHAIN", "AWS", "POSTGRES", "DOCKER", "KUBERNETES"];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false); // Tutup menu mobile setelah klik
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#EDEDED] font-sans selection:bg-white/10 overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        
        body { 
          font-family: 'Inter', -apple-system, sans-serif; 
          -webkit-font-smoothing: antialiased;
        }

        .text-hero {
          background: linear-gradient(to bottom, #ffffff 0%, #a1a1a1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .premium-border {
          position: relative;
        }
        .premium-border::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .bg-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }

        .hero-glow {
          background: radial-gradient(circle at 50% -20%, rgba(120, 119, 198, 0.15) 0%, rgba(0, 0, 0, 0) 50%);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}} />

      {/* --- Lapisan Background --- */}
      <div className="fixed inset-0 z-0 bg-grid opacity-40 pointer-events-none" />
      <div className="fixed inset-0 z-0 hero-glow pointer-events-none" />

      {/* --- Efek Glow Mouse (Tersembunyi di layar kecil untuk performa) --- */}
      <div
        className="hidden md:block pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.03), transparent 80%)`
        }}
      />

      {/* --- NAVBAR --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-black text-sm transition-transform group-hover:scale-105">S</div>
            <span className="font-semibold tracking-tighter text-sm uppercase hidden sm:block">Suryo Studio</span>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium text-white/50 tracking-wide">
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">SERVICES</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-white transition-colors">PROCESS</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">WORK</button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white/5 px-5 py-2 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              LET'S TALK
            </button>
          </nav>

          {/* Tombol Toggle Mobile */}
          <button
            className="md:hidden text-white/80 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MENU MOBILE (Telah Ditambahkan) --- */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col px-6 py-6 gap-6 text-sm font-medium text-white/70">
            <button onClick={() => scrollToSection('services')} className="text-left py-2 hover:text-white">SERVICES</button>
            <button onClick={() => scrollToSection('process')} className="text-left py-2 hover:text-white">PROCESS</button>
            <button onClick={() => scrollToSection('projects')} className="text-left py-2 hover:text-white">WORK</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-white">LET'S TALK</button>
          </div>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-6 min-h-screen md:min-h-0">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-10">
              <Cpu size={12} className="text-white/20" />
              Empowering the web with AI
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] mb-8 md:mb-10 text-hero leading-[1.1] pb-2 max-w-5xl mx-auto">
              Saya bantu ubah ide <br className="hidden md:block" /> jadi web app berbasis AI <br className="hidden lg:block" /> yang bisa langsung dipakai.
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed tracking-tight px-4 flex items-center justify-center flex-wrap gap-2 md:gap-3">
              <span>Dari konsep</span>
              <ArrowRight size={20} className="text-indigo-400 opacity-80" />
              <span>MVP</span>
              <ArrowRight size={20} className="text-indigo-400 opacity-80" />
              <span className="text-white">siap digunakan user</span>
            </p>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-6 mb-16">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-10 py-4 md:py-4 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all tracking-wide flex items-center justify-center gap-2"
              >
                LIHAT PROJECT
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-10 py-4 md:py-4 bg-transparent border border-white/20 text-white text-[13px] font-bold rounded-full hover:bg-white/5 transition-all tracking-wide flex items-center justify-center gap-2"
              >
                KONSULTASI GRATIS <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>

          {/* --- TRUST BUILDER --- */}
          <Reveal delay={600}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[11px] md:text-[12px] font-bold tracking-widest text-white/30 uppercase opacity-80 border-t border-white/5 pt-8 md:pt-12 w-full max-w-3xl mx-auto">
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-400" /> Built multiple real-world apps</div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-400" /> Fokus solusi, bukan kosmetik</div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-400" /> 100% Functional Product</div>
            </div>
          </Reveal>
        </section>

        {/* --- PROBLEM & SOLUTION SECTION --- */}
        <section id="problem" className="py-20 md:py-32 px-6 md:px-8 max-w-[1200px] mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-red-400 uppercase mb-4">THE REALITY</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">Banyak bisnis punya ide, tapi tidak punya web app yang benar-benar jalan.</h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32">
            {[
              { icon: XCircle, title: "Bingung Mulai dari Mana", desc: "Punya konsep cemerlang di kepala, tapi bingung harus pakai teknologi apa dan mulai dari mana." },
              { icon: Clock, title: "Developer Mahal & Lambat", desc: "Budget seringkali membengkak dan timeline meleset jauh dari target tanpa hasil yang jelas." },
              { icon: Layers, title: "Berhenti di Desain Saja", desc: "Hanya mendapat file desain Figma yang cantik, tapi tidak bisa dipakai oleh end-user nyata." },
              { icon: Zap, title: "Tidak Tahu Integrasi AI", desc: "Tahu AI bisa efisienkan bisnis, tapi tidak punya tim yang ngerti cara menyambungkannya." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="premium-border rounded-[2rem] bg-white/[0.01] p-8 border border-white/5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                    <item.icon size={24} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="premium-border rounded-[2.5rem] bg-indigo-500/10 p-10 md:p-16 border border-indigo-500/20 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-50" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-[12px] font-bold tracking-[0.3em] text-indigo-400 uppercase mb-6">THE SOLUTION</h2>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Saya bantu ubah ide tersebut jadi web app yang siap dipakai.</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Pendekatan saya simpel: <strong className="text-white">bangun MVP cepat, integrasikan AI & automation, dan fokus ke solusi nyata.</strong> Saya bekerja selayaknya partner in-house Anda, memastikan produk selesai dan berfungsi.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-white/50 tracking-widest uppercase">
                  <span className="bg-black/40 px-4 py-2 rounded-full border border-white/10">100% Coded</span>
                  <span className="bg-black/40 px-4 py-2 rounded-full border border-white/10">AI-Ready</span>
                  <span className="bg-black/40 px-4 py-2 rounded-full border border-white/10">Scalable</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="services" className="py-20 md:py-32 px-6 md:px-8 max-w-[1200px] mx-auto relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase whitespace-nowrap">APA YANG BISA SAYA BANTU</h2>
              <div className="h-px flex-grow bg-white/10" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Web App Development", desc: "Membangun sistem kustom dengan React/Next.js. Dari SaaS, dashboard, hingga platform e-commerce kustom." },
              { icon: Cpu, title: "AI Integration", desc: "Menambahkan kecerdasan pada produk Anda. Chatbot RAG, automasi GPT, hingga pipeline data AI." },
              { icon: MapIcon, title: "Map-based Apps", desc: "Aplikasi berbasis peta interaktif dengan OpenStreetMap, Leaflet, tracking real-time & geolokasi." },
              { icon: Wrench, title: "Internal Tools", desc: "Otomatisasi operasional bisnis. Membuat sistem ERP mini atau CRM yang benar-benar pas untuk tim Anda." }
            ].map((srv, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="premium-border h-full rounded-[2rem] bg-black/40 backdrop-blur-sm border border-white/5 p-8 hover:bg-white/[0.04] transition-all cursor-default">
                  <srv.icon size={28} className="text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold tracking-tight mb-3">{srv.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{srv.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- PROCESS SECTION --- */}
        <section id="process" className="py-20 md:py-32 px-6 md:px-8 max-w-[1200px] mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase mb-4">WORKFLOW</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Cara saya bekerja.</h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10 -z-10" />
            {[
              { step: "01", icon: Lightbulb, title: "Diskusi Ide", desc: "Kita bedah ide Anda untuk mencari inti fitur yang paling penting (core value)." },
              { step: "02", icon: Target, title: "Breakdown Fitur", desc: "Memilih fitur prioritas untuk MVP agar aplikasi bisa secepat mungkin dirilis." },
              { step: "03", icon: Rocket, title: "Build MVP Cepat", desc: "Development intensif & transparan untuk mewujudkan produk Anda dengan solid." },
              { step: "04", icon: CheckCircle2, title: "Iterasi & Improve", desc: "Evaluasi data dan feedback dari pengguna asli, lalu kembangkan lebih lanjut." }
            ].map((proc, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="relative group">
                  <div className="w-16 md:w-24 h-16 md:h-24 mx-auto bg-black border border-white/10 rounded-full flex flex-col items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.02)] group-hover:border-white/30 transition-colors">
                    <span className="text-[10px] font-bold text-white/30 mb-1">STEP</span>
                    <span className="text-xl font-black">{proc.step}</span>
                  </div>
                  <div className="text-center px-4">
                    <h4 className="text-lg font-bold mb-2 tracking-tight">{proc.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{proc.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- LIVE DEMO SECTION --- */}
        <section id="demo" className="py-20 md:py-32 px-6 md:px-8 max-w-[1200px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase mb-4">Interactive Preview</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 md:mb-16">See the AI in action.</h3>
          </Reveal>

          <Reveal delay={200}>
            <AIDemo />
            <p className="mt-6 md:mt-8 text-white/30 text-xs md:text-sm uppercase tracking-widest font-bold">Simulated RAG (Retrieval-Augmented Generation) Pipeline</p>
          </Reveal>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-20 md:py-32 px-6 md:px-8 max-w-[1200px] mx-auto relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-12 md:mb-20">
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase whitespace-nowrap">SELECTED WORK</h2>
              <div className="h-px flex-grow bg-white/10" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 md:gap-16">
            {PROJECTS.map((proj, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="premium-border rounded-[2.5rem] bg-black/40 backdrop-blur-xl p-8 md:p-12 border border-white/5 hover:bg-white/[0.02] transition-colors group">

                  {/* Top: Icon + Title + Desc */}
                  <div className="mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <proj.icon className="text-indigo-400" size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{proj.title}</h3>
                    <p className="text-white/60 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">{proj.description}</p>
                  </div>

                  {/* Middle: Problem & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden mb-10">
                    <div className="bg-black/80 p-8">
                      <h4 className="text-[11px] font-bold text-white/60 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Search size={16} className="text-red-400" /> The Problem
                      </h4>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed">{proj.problem}</p>
                    </div>
                    <div className="bg-black/80 p-8">
                      <h4 className="text-[11px] font-bold text-white/60 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Lightbulb size={16} className="text-yellow-400" /> The Solution
                      </h4>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed">{proj.solution}</p>
                    </div>
                  </div>

                  {/* Tech & Highlights */}
                  <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-12">
                    <div className="flex-1">
                      <h4 className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-bold px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 tracking-widest uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-widest">Key Highlights</h4>
                      <div className="flex flex-col gap-3">
                        {proj.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm font-medium text-white/60">
                            <CheckCircle2 size={16} className="text-indigo-400 shrink-0" /> {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer / Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/10">
                    <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black text-[13px] font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all">
                      Live Demo <ExternalLink size={16} />
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white text-[13px] font-bold rounded-full hover:bg-white/10 transition-all">
                      Case Study <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- CASE STUDY SECTION (Diperbaiki) --- */}
        <section id="casestudy" className="py-20 md:py-32 bg-white/[0.02] border-y border-white/10 px-6 md:px-8 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase mb-12 md:mb-16">Deep Dives</h2>
            </Reveal>

            <div className="space-y-8 md:space-y-12">
              {CASE_STUDIES.map((study, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="premium-border rounded-[2rem] bg-black/60 p-6 md:p-12 hover:bg-white/[0.03] transition-all border border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">

                      {/* Kolom Judul & Klien */}
                      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                        <div className="text-indigo-400 font-bold mb-3 md:mb-4 text-xs tracking-widest">CASE STUDY {study.id}</div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{study.title}</h3>
                        <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{study.client}</div>
                      </div>

                      {/* Kolom Detail (Diperbaiki: Menambahkan Grid 3 Kolom untuk Solution) */}
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div>
                          <h4 className="text-[11px] font-bold text-white/60 mb-3 flex items-center gap-2 uppercase tracking-widest"><Search size={14} className="text-red-400" /> Challenge</h4>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">{study.challenge}</p>
                        </div>
                        <div>
                          {/* Bug diperbaiki: Merender isi dari study.solution */}
                          <h4 className="text-[11px] font-bold text-white/60 mb-3 flex items-center gap-2 uppercase tracking-widest"><Lightbulb size={14} className="text-yellow-400" /> Solution</h4>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-white/60 mb-3 flex items-center gap-2 uppercase tracking-widest"><CheckCircle2 size={14} className="text-green-400" /> Impact</h4>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">{study.impact}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- SKILLS / TECH --- */}
        <section id="skills" className="py-20 md:py-32 px-6 md:px-8 relative z-10">
          <div className="max-w-[1200px] mx-auto text-center">
            <Reveal>
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase mb-12 md:mb-20">The Stack</h2>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50">
              {SKILLS.map((tech, i) => (
                <Reveal key={i} delay={i * 50}>
                  <span className="text-xs md:text-[13px] font-black tracking-widest hover:text-white transition-colors cursor-default">{tech}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT / STRONG CTA --- */}
        <section id="contact" className="py-32 md:py-48 text-center px-6 md:px-8 relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-indigo-500/[0.03] blur-3xl rounded-full scale-150 -z-10 translate-y-1/2" />
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-[12px] font-bold tracking-[0.3em] text-white/40 uppercase mb-6">MULAI PROJECT ANDA</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-6 leading-tight text-white">
                Punya ide? <br className="hidden sm:block" /> Kita bikin jadi produk.
              </h3>
              <p className="text-white/50 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                Berhenti membuang waktu pada konsep dan desain yang tidak pernah diluncurkan. Mari jadwalkan konsultasi gratis untuk mendiskusikan ide Anda.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-6">
                <a
                  href="https://wa.me/yourwhatsappnumber"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-10 py-5 bg-[#25D366] text-black text-[14px] font-bold rounded-full hover:bg-[#20b858] hover:scale-105 transition-all tracking-wide flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                >
                  <MessageCircle size={20} /> CHAT WHATSAPP
                </a>
                <a
                  href="mailto:hello@suryo.ai"
                  className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white text-[14px] font-bold rounded-full hover:bg-white/10 transition-all tracking-wide flex items-center justify-center gap-3"
                >
                  <Calendar size={20} /> SCHEDULE CALL
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 md:py-20 px-6 md:px-8 border-t border-white/10 bg-black/20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>

          <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase text-center">
            SURYO STUDIOS © {new Date().getFullYear()} — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}