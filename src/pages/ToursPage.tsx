import { useState } from 'react'
import TourCard from '../components/TourCard'
import { ALL_TOURS } from '../data/tours'

const REGIONS = ['전체', '시드니', '멜번', '골드코스트', '브리즈번']
const THEMES = ['전체', '워홀러코스', '신혼여행코스', '가족여행코스']

export default function ToursPage() {
  const [activeRegion, setActiveRegion] = useState('전체')
  const [activeTheme, setActiveTheme] = useState('전체')

  const filtered = ALL_TOURS.filter((t) => {
    const regionMatch = activeRegion === '전체' || t.region === activeRegion
    const themeMatch = activeTheme === '전체' || t.theme === activeTheme
    return regionMatch && themeMatch
  })

  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="bg-[#1B2D4F] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-3">All Tours</p>
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            모든 투어 둘러보기
          </h1>
          <p className="text-white/55 mt-3 text-sm md:text-base">
            검증된 가이드의 {ALL_TOURS.length}개 투어를 지역과 테마별로 찾아보세요.
          </p>
        </div>
      </div>

      {/* ── Filter bar ────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-[#FDFAF6]/95 backdrop-blur-md border-b border-[#1B2D4F]/8 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">
          {/* Region filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#1B2D4F]/45 text-xs font-medium shrink-0">지역</span>
            <div className="flex gap-1.5 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeRegion === r
                      ? 'bg-[#1B2D4F] text-white'
                      : 'bg-[#1B2D4F]/8 text-[#1B2D4F]/60 hover:bg-[#1B2D4F]/14'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-px bg-[#1B2D4F]/12 self-stretch" />

          {/* Theme filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#1B2D4F]/45 text-xs font-medium shrink-0">테마</span>
            <div className="flex gap-1.5 flex-wrap">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTheme(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeTheme === t
                      ? 'bg-[#C4603A] text-white'
                      : 'bg-[#C4603A]/8 text-[#C4603A]/70 hover:bg-[#C4603A]/14'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="sm:ml-auto flex items-center shrink-0">
            <span className="text-[#1B2D4F]/40 text-xs">
              <span className="text-[#1B2D4F] font-semibold">{filtered.length}</span>개 투어
            </span>
          </div>
        </div>
      </div>

      {/* ── Tour grid ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        ) : (
          /* ── Empty state ──────────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1B2D4F]/6 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-[#1B2D4F]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 16.803z" />
              </svg>
            </div>
            <h3
              className="text-[#1B2D4F] text-xl font-light mb-2"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              해당하는 투어가 없어요
            </h3>
            <p className="text-[#1B2D4F]/50 text-sm leading-relaxed max-w-xs">
              선택한 조건의 투어를 준비 중이에요.<br />
              다른 지역이나 테마를 선택해보세요.
            </p>
            <button
              onClick={() => { setActiveRegion('전체'); setActiveTheme('전체') }}
              className="mt-6 text-[#C4603A] text-sm font-medium hover:underline"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
