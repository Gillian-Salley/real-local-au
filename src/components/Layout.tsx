import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router'
import AiChatModal from './AiChatModal'
import kangarooIcon from '../imports/openmoji_kangaroo.svg'

const NAV_LINKS = [
  { label: '투어 목록', href: '/tours' },
  { label: '나의 스토리', href: '/about' },
  { label: '예약 확인', href: '/bookings' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navBg = isHome
    ? scrolled
      ? 'bg-[#FDFAF6]/95 backdrop-blur-md shadow-sm border-b border-[#1B2D4F]/8'
      : 'bg-transparent'
    : 'bg-[#FDFAF6]/95 backdrop-blur-md shadow-sm border-b border-[#1B2D4F]/8'

  const logoColor = isHome && !scrolled ? 'text-white' : 'text-[#1B2D4F]'
  const linkColor = isHome && !scrolled ? 'text-white/80 hover:text-white' : 'text-[#1B2D4F]/65 hover:text-[#1B2D4F]'
  const ctaBg = isHome && !scrolled
    ? 'bg-white/15 border border-white/30 text-white hover:bg-white/25'
    : 'bg-[#1B2D4F] text-white hover:bg-[#2a4170]'

  return (
    <div className="min-h-screen bg-[#FDFAF6] text-[#1B2D4F]" style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={kangarooIcon} alt="캥거루 아이콘" className="w-8 h-8" />
              <span className={`font-semibold tracking-tight transition-colors duration-300 ${logoColor}`} style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                AusReal<span className="text-[#C4603A]">Tour</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${linkColor}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/tours"
                className={`text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200 ${ctaBg}`}
              >
                투어 찾기
              </Link>
            </div>

            <button
              className={`md:hidden p-2 rounded-md transition-colors duration-300 ${isHome && !scrolled ? 'text-white' : 'text-[#1B2D4F]'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴 열기"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#FDFAF6] border-t border-[#1B2D4F]/10 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.href} className="text-[#1B2D4F] font-medium py-1">
                {link.label}
              </Link>
            ))}
            <Link
              to="/tours"
              className="bg-[#1B2D4F] text-white text-sm font-medium px-5 py-3 rounded-full text-center mt-1"
            >
              투어 찾기
            </Link>
          </div>
        )}
      </nav>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <Outlet />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f1e35] text-white/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={kangarooIcon} alt="캥거루 아이콘" className="w-7 h-7" />
                <span className="font-semibold text-white text-sm" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                  AusReal<span className="text-[#C4603A]">Tour</span>
                </span>
              </div>
              <p className="text-white/40 text-xs whitespace-nowrap">
                호주 유학·워홀·거주 경험자가 직접 검증한 로컬 투어 예약 매칭 플랫폼
              </p>
              <div className="flex gap-3 mt-5">
                {/* Instagram */}
                <a href="#" aria-label="인스타그램" className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" aria-label="유튜브" className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* KakaoTalk */}
                <a href="#" aria-label="카카오톡" className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/16 flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.582 2 11c0 2.884 1.782 5.424 4.5 6.938L5.5 21l3.75-2.156C10.186 19.27 11.077 19.4 12 19.4c5.523 0 10-3.582 10-8s-4.477-8.4-10-8.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">서비스</p>
              <ul className="space-y-2.5">
                <li><Link to="/tours" className="text-xs hover:text-white/80 transition-colors duration-200">투어 목록</Link></li>
                <li><Link to="/guide-apply" className="text-xs hover:text-white/80 transition-colors duration-200">가이드 지원</Link></li>
                <li><a href="#" className="text-xs hover:text-white/80 transition-colors duration-200">기업 투어</a></li>
                <li><a href="#" className="text-xs hover:text-white/80 transition-colors duration-200">자주 묻는 질문</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-4">고객지원</p>
              <ul className="space-y-2.5">
                {['예약 확인', '환불 정책', '이용약관', '개인정보처리방침'].map((item) => (
                  <li key={item}><a href="#" className="text-xs hover:text-white/80 transition-colors duration-200">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between gap-3">
            <p className="text-[10px] text-white/30 leading-relaxed">
              상호: 오스리얼투어(주) · 대표: 홍길동 · 사업자등록번호: 000-00-00000<br />
              통신판매업신고: 제2024-서울강남-0000호 · 관광사업등록: 제2024-000호
            </p>
            <p className="text-[10px] text-white/25">© 2026 AusRealTour. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Floating AI Button ───────────────────────────────────────────── */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className={`fixed bottom-6 right-5 z-[61] w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${chatOpen ? 'bg-[#1B2D4F] hover:bg-[#2a4170]' : 'bg-[#C4603A] hover:bg-[#D97A56]'}`}
        aria-label={chatOpen ? 'AI 상담 닫기' : 'AI 상담 열기'}
      >
        {chatOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span className="absolute right-full mr-3 bg-[#1B2D4F] text-white text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              AI 상담
            </span>
          </>
        )}
      </button>

      <AiChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
