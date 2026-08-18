import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Link } from 'react-router'
import TourCard from '../components/TourCard'
import { FEATURED_TOURS, ALL_TOURS } from '../data/tours'
import SEOMeta from '../components/SEOMeta'
import { SITE_NAME } from '../lib/seo'

export const metadata = {
  title: `호주 로컬 투어 예약 | 5년 이상 거주 가이드 매칭 서비스`,
  description: `호주 유학·워홀·거주 5년 이상 가이드가 직접 큐레이션한 로컬 투어 예약 매칭 서비스. ${SITE_NAME}에서 진짜 호주를 경험하세요.`,
}

const HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1774257784483-f3fc96d42730?w=1800&h=1200&fit=crop&auto=format&q=85',
    state: '노던 테리토리',
    spot: '울루루',
  },
  {
    src: 'https://images.unsplash.com/photo-1515482758760-9535c2f0a18c?w=1800&h=1200&fit=crop&auto=format&q=85',
    state: '뉴사우스웨일스',
    spot: '시드니',
  },
  {
    src: 'https://images.unsplash.com/photo-1610183880843-52fc754207a8?w=1800&h=1200&fit=crop&auto=format&q=85',
    state: '빅토리아',
    spot: '멜번',
  },
  {
    src: 'https://images.unsplash.com/photo-1760256454373-1557a5a7b2e8?w=1800&h=1200&fit=crop&auto=format&q=85',
    state: '퀸즐랜드',
    spot: '그레이트 배리어 리프',
  },
  {
    src: 'https://images.unsplash.com/photo-1559330280-64b674f081f1?w=1800&h=1200&fit=crop&auto=format&q=85',
    state: '웨스턴 오스트레일리아',
    spot: '퍼스',
  },
]

const FADE_DURATION = 1400   // ms — crossfade length
const SLIDE_INTERVAL = 5800  // ms — time each slide is fully visible

function HeroSlideshow() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const lockRef = useRef(false)

  const goTo = (idx: number) => {
    if (lockRef.current) return
    lockRef.current = true
    setPrev(idx === 0 ? HERO_SLIDES.length - 1 : idx - 1)
    setCur(idx)
    setTimeout(() => {
      setPrev(null)
      lockRef.current = false
    }, FADE_DURATION)
  }

  const goToManual = (idx: number) => {
    if (lockRef.current || idx === cur) return
    lockRef.current = true
    setPrev(cur)
    setCur(idx)
    setTimeout(() => {
      setPrev(null)
      lockRef.current = false
    }, FADE_DURATION)
  }

  useEffect(() => {
    const iv = setInterval(() => {
      setCur((c) => {
        const next = (c + 1) % HERO_SLIDES.length
        setPrev(c)
        setTimeout(() => setPrev(null), FADE_DURATION)
        return next
      })
    }, SLIDE_INTERVAL)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="absolute inset-0">
      {/* Always-on dark base so there's never a flash */}
      <div className="absolute inset-0 bg-[#0a1520]" />

      {/* Previous slide — fades out */}
      {prev !== null && (
        <img
          key={`p${prev}`}
          src={HERO_SLIDES[prev].src}
          alt={HERO_SLIDES[prev].spot}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
        />
      )}

      {/* Current slide — fades in */}
      <img
        key={`c${cur}`}
        src={HERO_SLIDES[cur].src}
        alt={HERO_SLIDES[cur].spot}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          animation: `heroFadeIn ${FADE_DURATION}ms ease-in-out forwards`,
        }}
      />

      {/* Dim overlay for text legibility */}
      <div className="absolute inset-0 bg-[#0a1520]/55" />
      {/* Bottom gradient for extra readability */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a1520]/70 to-transparent" />

      {/* Slide indicators + location label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goToManual(i)}
              aria-label={s.spot}
              className="flex items-center"
            >
              <div
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: i === cur ? 28 : 8,
                  backgroundColor: i === cur ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                }}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="text-white/60 text-[10px] tracking-[0.2em] uppercase transition-all duration-700"
            key={cur}
          >
            {HERO_SLIDES[cur].state} · {HERO_SLIDES[cur].spot}
          </span>
        </div>
      </div>
    </div>
  )
}

function ConsultForm() {
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // TODO: 실제 API 연동 시 /api/consult 엔드포인트로 POST 요청 처리 예정
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('[상담 신청 데이터]', data)
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/35 focus:bg-white/12 transition-all duration-200'

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1B2D4F]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-4">Consult</p>
          <h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            투어가 고민되신다면<br />
            <em className="not-italic text-[#D97A56]">상담부터 시작하세요</em>
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            가이드가 직접 연락드려 일정과 취향에 맞는 투어를 안내해드립니다.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/8 border border-white/12 rounded-2xl p-8 md:p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#C4603A]/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#C4603A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              상담 신청이 완료됐어요!
            </h3>
            <p className="text-white/55 text-sm leading-relaxed">
              담당 가이드가 영업일 기준 1일 이내로 연락드릴 예정이에요.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/6 border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 이름 */}
              <div>
                <label className="block text-white/70 text-xs font-medium mb-2">
                  이름 <span className="text-[#C4603A]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="홍길동"
                  className={inputCls}
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-white/70 text-xs font-medium mb-2">
                  전화번호 <span className="text-[#C4603A]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="010-0000-0000"
                  className={inputCls}
                />
              </div>
            </div>

            {/* 투어 선택 */}
            <div>
              <label className="block text-white/70 text-xs font-medium mb-2">
                생각하고 있는 투어
              </label>
              <div className="relative">
                <select
                  name="tour"
                  defaultValue=""
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/35 focus:bg-white/12 transition-all duration-200 appearance-none pr-10 [&>option]:bg-[#1B2D4F] [&>option]:text-white"
                >
                  <option value="" disabled className="text-white/40">
                    투어를 선택해주세요 (선택)
                  </option>
                  <option value="아직 미정">아직 미정 / 추천 받고 싶어요</option>
                  {ALL_TOURS.map((t) => (
                    <option key={t.id} value={t.title}>
                      [{t.region}] {t.title}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>

            {/* 동의 항목 */}
            <div className="space-y-3 pt-1">
              {/* 개인정보 수집 동의 (필수) */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 accent-[#C4603A] shrink-0 cursor-pointer"
                />
                <span className="text-xs leading-relaxed text-white/55 group-hover:text-white/70 transition-colors">
                  <span className="text-white/85 font-medium">[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                  <br />
                  <span className="text-white/35">
                    수집 항목: 이름, 전화번호 / 목적: 투어 상담 연락 / 보유 기간: 상담 완료 후 6개월
                  </span>
                </span>
              </label>

              {/* 마케팅 문자 수신 동의 (선택) */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="marketingAgreed"
                  checked={marketingChecked}
                  onChange={(e) => setMarketingChecked(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#C4603A] shrink-0 cursor-pointer"
                />
                <span className="text-xs leading-relaxed text-white/55 group-hover:text-white/70 transition-colors">
                  <span className="text-white/85 font-medium">[선택] 마케팅 문자 수신에 동의합니다.</span>
                  <br />
                  <span className="text-white/35">
                    신규 투어 오픈, 할인 이벤트 등 유용한 정보를 문자로 받아보실 수 있어요.
                  </span>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!privacyChecked}
              className="w-full bg-[#C4603A] hover:bg-[#D97A56] disabled:bg-white/10 disabled:text-white/25 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all duration-200 text-sm tracking-wide mt-2"
            >
              상담 예약하기
            </button>

            <p className="text-white/25 text-[10px] text-center">
              담당 가이드가 영업일 기준 1일 이내로 연락드립니다
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-[#C4603A]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const TESTIMONIALS = [
  { name: '박*연', role: '시드니 워홀러', text: '일반 여행사 투어랑 차원이 달라요. 가이드분이 직접 살던 동네 맛집이랑 숨은 명소를 알려줘서 정말 특별했어요.', tour: '하버브리지 & 록스 골목 투어', rating: 5 },
  { name: '정*우', role: '멜버른 유학생', text: '예약부터 투어 당일까지 소통이 너무 편했어요. 가이드분이 제 영어 실력에 맞게 설명도 해주시고, 호주 생활 꿀팁도 많이 알려주셨습니다.', tour: '그레이트 배리어 리프 스노클링', rating: 5 },
  { name: '강*나', role: '브리즈번 거주자', text: 'AI 상담으로 내 일정에 맞는 투어를 추천받았는데 완벽하게 맞았어요. 가격 대비 퀄리티가 정말 높고, 가이드분의 진정성이 느껴졌어요.', tour: '울루루 선셋 & 애보리진 문화', rating: 5 },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'AI 상담으로 투어 매칭', desc: '여행 기간, 관심사, 예산을 입력하면 AI가 나에게 딱 맞는 투어를 추천해드려요.' },
  { step: '02', title: '검증된 로컬 가이드 확인', desc: '모든 가이드는 호주 실거주 경험자로, 직접 인터뷰와 후기 검증을 거쳤어요.' },
  { step: '03', title: '간편 예약 & 확정', desc: '카드/카카오페이 결제 후 예약 확정 문자 즉시 발송. 변경/취소도 유연하게.' },
]

export default function HomePage() {
  return (
    <>
      <SEOMeta {...metadata} />
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[560px] max-h-[900px] flex flex-col overflow-hidden">
        <HeroSlideshow />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-start mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C4603A] animate-pulse" />
                <span className="text-white/90 text-xs font-medium tracking-wide">호주 현지인이 직접 큐레이션한 투어</span>
              </div>
            </div>

            <h1
              className="text-white text-center md:text-left text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-light leading-[1.1] tracking-tight mb-5 md:mb-6"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              직접 살아본 사람만<br />
              아는 <em className="not-italic text-[#E8845C]" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)' }}>호주 여행</em>
            </h1>

            <p className="text-white/70 text-center md:text-left text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md mx-auto md:mx-0">
              유학·워홀·거주 최소 5년 이상 경험으로<br className="hidden sm:block" />
              큐레이션한 로컬 투어
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start md:justify-start justify-center">
              <Link
                to="/tours"
                className="w-full sm:w-auto bg-[#C4603A] hover:bg-[#D97A56] active:scale-95 text-white font-medium px-8 py-4 rounded-full transition-all duration-200 text-center text-sm tracking-wide shadow-lg shadow-[#C4603A]/30"
              >
                투어 둘러보기
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 active:scale-95 border border-white/40 hover:border-white/60 text-white font-medium px-8 py-4 rounded-full transition-all duration-200 text-center text-sm"
              >
                나의 스토리 보기
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ── Why AusRealTour ───────────────────────────────────────────── */}
      <section className="bg-[#1B2D4F] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-4">Why AusRealTour</p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                왜 로컬 가이드여야<br /><em className="not-italic text-[#D97A56]">하는가</em>
              </h2>
              <p className="text-white/60 leading-relaxed text-sm md:text-base mb-6">
                호주에서 실제로 살아본 사람만이 알 수 있는 것들이 있어요. 어느 카페가 진짜 맛있는지, 어느 해변이 현지인들이 가는 곳인지. AusRealTour는 그 경험을 연결합니다.
              </p>
              <Link
                to="/why-local"
                className="inline-flex items-center gap-2 text-[#D97A56] hover:text-[#E8845C] text-sm font-medium transition-colors duration-200 group"
              >
                왜 로컬 가이드인지 읽어보기
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: '실거주 검증 가이드', desc: '최소 5년 이상 호주 거주 경험자만 가이드로 등록 가능', anchor: 'verified' },
                { title: '3단계 검증 프로세스', desc: '서류 심사 → 인터뷰 → 시범 투어 운영 후 최종 승인', anchor: 'process' },
                { title: '한국어 소통 100%', desc: '영어 걱정 없이 편안한 한국어로 진행되는 투어', anchor: 'korean' },
                { title: '안심 환불 정책', desc: '투어 48시간 전까지 전액 환불, 당일 취소도 50% 환불', anchor: 'refund' },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={`/why-local#${item.anchor}`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/12 hover:border-white/20 transition-all duration-200 group text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C4603A]/20 flex items-center justify-center mb-3">
                    <span className="text-[#C4603A] text-sm font-bold">✓</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#C4603A] text-xs font-medium group-hover:gap-2 transition-all duration-200">
                    자세히 보기
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 대표 투어 3선 ─────────────────────────────────────────────── */}
      <section id="tours" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
            <div>
              <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-3">Best of AusRealTour</p>
              <h2
              className="text-[#1B2D4F] text-2xl md:text-3xl lg:text-4xl font-light leading-snug whitespace-nowrap"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              지금 가장 인기 있는 투어
            </h2>
            </div>
            <Link
              to="/tours"
              className="self-start md:self-auto inline-flex items-center gap-2 text-[#1B2D4F]/55 hover:text-[#C4603A] text-sm font-medium transition-colors duration-200 group"
            >
              전체 투어 보기
              <span className="inline-flex items-center transition-transform duration-300 group-hover:translate-x-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_TOURS.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-[#1B2D4F] text-3xl md:text-4xl font-light" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              예약까지 단 3단계
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="bg-white rounded-2xl p-6 md:p-8 border border-[#1B2D4F]/8">
                <div className="text-4xl md:text-5xl font-light text-[#1B2D4F]/12 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                  {step.step}
                </div>
                <h3 className="text-[#1B2D4F] font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-[#1B2D4F]/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section id="story" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFAF6]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-3">Real Reviews</p>
            <h2 className="text-[#1B2D4F] text-3xl md:text-4xl font-light" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              여행자들의 진짜 이야기
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-[#1B2D4F]/8 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
                <StarRating rating={t.rating} />
                <p className="text-[#1B2D4F]/75 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="pt-4 border-t border-[#1B2D4F]/6">
                  <p className="text-[#1B2D4F] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#1B2D4F]/45 text-xs">{t.role}</p>
                  <p className="text-[#C4603A] text-xs mt-1">{t.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 가이드 모집 CTA ───────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#1B2D4F] rounded-3xl overflow-hidden px-8 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Decorative background element */}
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#C4603A]/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute right-16 bottom-0 w-40 h-40 rounded-full bg-white/4 translate-y-1/3 pointer-events-none" />

            {/* Text */}
            <div className="relative text-center md:text-left max-w-xl">
              <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">Become a Guide</p>
              <h2
                className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                AusRealTour의<br />
                <em className="not-italic text-[#E8845C]">가이드</em>가 되어보세요
              </h2>
              <p className="text-white/55 text-sm leading-relaxed">
                호주에서 살아온 경험이 누군가의 특별한 여행이 됩니다.<br className="hidden sm:block" />
                5년 이상 거주 경험자라면 지금 바로 지원해보세요.
              </p>

              {/* Benefits */}
              <ul className="mt-6 space-y-2 text-left inline-block">
                {[
                  '원하는 일정에만 투어 진행 (부업 가능)',
                  '투어 수익의 85% 직접 수령',
                  '마케팅·예약 관리는 AusRealTour가 담당',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/60 text-xs">
                    <span className="text-[#C4603A] mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            <div className="relative shrink-0 flex flex-col items-center gap-3">
              <a
                href="/guide-apply"
                className="inline-flex items-center gap-2.5 bg-[#C4603A] hover:bg-[#D97A56] active:scale-95 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-sm tracking-wide shadow-lg shadow-[#C4603A]/30 whitespace-nowrap"
              >
                지원 신청하기
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-white/30 text-[10px] text-center">현재 {' '}<span className="text-white/50 font-medium">28명</span>의 가이드가 활동 중</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 상담 신청 폼 ─────────────────────────────────────────────── */}
      <ConsultForm />
    </>
  )
}
