import { useState, type FormEvent } from 'react'
import { useParams, Link } from 'react-router'
import { ALL_TOURS } from '../data/tours'

function StarFill({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-4 h-4 ${filled ? 'text-[#C4603A]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>()
  const tour = ALL_TOURS.find((t) => t.id === Number(id))

  const [activeImg, setActiveImg] = useState(0)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!tour) {
    return (
      <div className="pt-16 min-h-screen bg-[#FDFAF6] flex flex-col items-center justify-center gap-4">
        <p className="text-[#1B2D4F]/50 text-lg">투어를 찾을 수 없어요.</p>
        <Link to="/tours" className="text-[#C4603A] text-sm font-medium hover:underline">← 투어 목록으로</Link>
      </div>
    )
  }

  // TODO: 실제 API 라우트 연결 시 /api/bookings 엔드포인트로 POST 요청 처리 예정
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('[예약 문의 데이터]', data)
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-[#F5EFE6] border border-[#1B2D4F]/12 rounded-xl px-4 py-3 text-[#1B2D4F] text-sm placeholder:text-[#1B2D4F]/35 focus:outline-none focus:border-[#1B2D4F]/40 focus:ring-2 focus:ring-[#1B2D4F]/8 transition-all duration-200'

  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 text-xs text-[#1B2D4F]/45">
          <Link to="/" className="hover:text-[#1B2D4F] transition-colors">홈</Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-[#1B2D4F] transition-colors">투어 목록</Link>
          <span>/</span>
          <span className="text-[#1B2D4F]/70 truncate max-w-[160px]">{tour.title}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 xl:gap-14">

          {/* ── Left column ─────────────────────────────────────────── */}
          <div className="min-w-0">

            {/* Image gallery */}
            <div className="mb-8">
              {/* Main image */}
              <div className="relative aspect-[16/9] md:aspect-[3/2] rounded-2xl overflow-hidden bg-[#EDE3D6] mb-3">
                <img
                  key={activeImg}
                  src={tour.images[activeImg]}
                  alt={`${tour.title} 이미지 ${activeImg + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C4603A] text-white text-xs font-medium px-3 py-1.5 rounded-full">{tour.badge}</span>
                </div>
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {tour.images.slice(1).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i + 1)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE3D6] transition-all duration-200 ${
                      activeImg === i + 1 ? 'ring-2 ring-[#C4603A] ring-offset-1' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`썸네일 ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour basic info */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-[#1B2D4F]/8 text-[#1B2D4F] text-xs font-medium px-3 py-1 rounded-full">{tour.region}</span>
                <span className="bg-[#F5EFE6] text-[#C4603A] text-xs font-medium px-3 py-1 rounded-full">{tour.theme}</span>
              </div>
              <h1
                className="text-[#1B2D4F] text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-4"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {tour.title}
              </h1>

              {/* Rating + meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-[#1B2D4F]/8">
                <div className="flex items-center gap-1.5">
                  <div className="flex">{Array.from({ length: 5 }).map((_, i) => <StarFill key={i} filled={i < Math.round(tour.rating)} />)}</div>
                  <span className="text-[#1B2D4F] text-sm font-semibold">{tour.rating}</span>
                  <span className="text-[#1B2D4F]/45 text-sm">({tour.reviews}개 후기)</span>
                </div>
                <span className="text-[#1B2D4F]/20">|</span>
                <div className="flex items-center gap-1.5 text-sm text-[#1B2D4F]/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#1B2D4F]/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  {tour.groupSize}
                </div>
              </div>

              {/* Guide info */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#1B2D4F] flex items-center justify-center shrink-0">
                  <span className="text-white text-lg font-bold">{tour.guide[0]}</span>
                </div>
                <div>
                  <p className="text-[#1B2D4F] font-semibold text-sm">{tour.guide} 가이드</p>
                  <p className="text-[#1B2D4F]/50 text-xs">{tour.guideRole} · 직접 검증된 가이드</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-[#1B2D4F]/6 text-[#1B2D4F] text-[10px] font-medium px-2.5 py-1 rounded-full">검증 완료 ✓</span>
                </div>
              </div>

              {/* Includes / Excludes */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#F5EFE6] rounded-2xl p-5">
                  <h3 className="text-[#1B2D4F] font-semibold text-sm mb-3 flex items-center gap-1.5">
                    <span className="text-[#C4603A]">✓</span> 포함 사항
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#1B2D4F]/70 text-xs">
                        <span className="text-[#C4603A] mt-0.5 shrink-0">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1B2D4F]/4 rounded-2xl p-5">
                  <h3 className="text-[#1B2D4F] font-semibold text-sm mb-3 flex items-center gap-1.5">
                    <span className="text-[#1B2D4F]/40">✕</span> 불포함 사항
                  </h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#1B2D4F]/50 text-xs">
                        <span className="mt-0.5 shrink-0">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Real story section */}
            <div className="mb-10">
              <h2
                className="text-[#1B2D4F] text-xl md:text-2xl font-light mb-5"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                실제 경험담
              </h2>
              <blockquote className="relative bg-[#1B2D4F] rounded-2xl px-8 py-7">
                <svg className="absolute top-5 left-6 w-8 h-8 text-[#C4603A]/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z" />
                </svg>
                <p className="text-white/80 text-sm md:text-base leading-relaxed pt-4 pl-6">
                  {tour.story}
                </p>
                <footer className="mt-5 pl-6 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#C4603A] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{tour.guide[0]}</span>
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold">{tour.guide}</span>
                    <span className="text-white/40 text-xs ml-2">· {tour.guideRole}</span>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Reviews */}
            <div className="mb-10">
              <h2
                className="text-[#1B2D4F] text-xl md:text-2xl font-light mb-5"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                참가자 후기
              </h2>
              <div className="space-y-4">
                {tour.reviewList.map((r) => (
                  <div key={r.name} className="bg-white border border-[#1B2D4F]/8 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#F5EFE6] flex items-center justify-center shrink-0">
                          <span className="text-[#C4603A] text-sm font-semibold">{r.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-[#1B2D4F] font-semibold text-sm">{r.name}</p>
                          <p className="text-[#1B2D4F]/45 text-xs">{r.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex">{Array.from({ length: 5 }).map((_, i) => <StarFill key={i} filled={i < r.rating} />)}</div>
                        <span className="text-[#1B2D4F]/35 text-[10px]">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-[#1B2D4F]/70 text-sm leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Booking form ───────────────────────────── */}
          {/* Desktop: sticky card / Mobile: fixed bottom sheet trigger */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <BookingForm tour={tour} inputCls={inputCls} agreedToPrivacy={agreedToPrivacy} setAgreedToPrivacy={setAgreedToPrivacy} submitted={submitted} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: bottom fixed booking bar */}
      <MobileBookingBar tour={tour} inputCls={inputCls} agreedToPrivacy={agreedToPrivacy} setAgreedToPrivacy={setAgreedToPrivacy} submitted={submitted} handleSubmit={handleSubmit} />
    </div>
  )
}

type BookingProps = {
  tour: ReturnType<typeof ALL_TOURS[number]['reviewList']['find']> extends undefined ? never : (typeof ALL_TOURS)[number]
  inputCls: string
  agreedToPrivacy: boolean
  setAgreedToPrivacy: (v: boolean) => void
  submitted: boolean
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function BookingForm({ tour, inputCls, agreedToPrivacy, setAgreedToPrivacy, submitted, handleSubmit }: BookingProps) {
  if (submitted) {
    return (
      <div className="bg-white border border-[#1B2D4F]/10 rounded-2xl p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#C4603A]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#C4603A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-[#1B2D4F] font-semibold text-base mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>예약 문의 완료!</h3>
        <p className="text-[#1B2D4F]/55 text-sm leading-relaxed">가이드가 24시간 내로 연락드릴 예정이에요. 이메일을 확인해주세요.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#1B2D4F]/10 rounded-2xl overflow-hidden shadow-sm">
      {/* Price header */}
      <div className="bg-[#1B2D4F] px-6 py-5">
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-white/55 text-xs">1인 from</span>
          <span className="text-white text-3xl font-light" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            {tour.priceKRW.toLocaleString('ko-KR')}
          </span>
          <span className="text-white/55 text-xs">원</span>
        </div>
        <p className="text-white/40 text-xs">{tour.duration} · {tour.groupSize}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3.5">
        <div>
          <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">이름 *</label>
          <input type="text" name="name" required placeholder="홍길동" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">이메일 *</label>
          <input type="email" name="email" required placeholder="example@email.com" className={inputCls} />
        </div>
        <div>
          <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">연락처 *</label>
          <input type="tel" name="phone" required placeholder="010-0000-0000" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">희망 날짜 *</label>
            <input type="date" name="date" required className={inputCls} />
          </div>
          <div>
            <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">인원수 *</label>
            <input type="number" name="headcount" min={1} max={20} defaultValue={1} required className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-[#1B2D4F] text-xs font-medium mb-1.5">요청사항</label>
          <textarea name="message" rows={3} placeholder="알레르기, 특별 요청 등 있으면 알려주세요." className={`${inputCls} resize-none`} />
        </div>

        {/* Privacy consent */}
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            name="privacyAgreed"
            checked={agreedToPrivacy}
            onChange={(e) => setAgreedToPrivacy(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#C4603A] shrink-0"
            required
          />
          <span className="text-[#1B2D4F]/55 text-xs leading-relaxed group-hover:text-[#1B2D4F]/70 transition-colors">
            <span className="text-[#1B2D4F]/80 font-medium">개인정보 수집 및 이용에 동의합니다.</span>
            {' '}수집 항목: 이름, 이메일, 연락처 / 목적: 예약 문의 처리 / 보유 기간: 예약 완료 후 1년
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreedToPrivacy}
          className="w-full bg-[#C4603A] hover:bg-[#D97A56] disabled:bg-[#1B2D4F]/20 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all duration-200 text-sm tracking-wide mt-1"
        >
          예약 문의하기
        </button>
        <p className="text-[#1B2D4F]/35 text-[10px] text-center">결제는 가이드 확정 후 진행됩니다</p>
      </form>
    </div>
  )
}

function MobileBookingBar({ tour, inputCls, agreedToPrivacy, setAgreedToPrivacy, submitted, handleSubmit }: BookingProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#1B2D4F]/10 px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <p className="text-[#1B2D4F]/50 text-xs">1인 from</p>
          <p className="text-[#1B2D4F] font-bold text-lg" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            {tour.priceKRW.toLocaleString('ko-KR')}원
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#C4603A] hover:bg-[#D97A56] text-white font-medium px-6 py-3 rounded-full text-sm transition-colors duration-200 shrink-0"
        >
          예약 문의하기
        </button>
      </div>

      {/* Bottom sheet */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-[#FDFAF6] rounded-t-3xl max-h-[90dvh] overflow-y-auto">
            <div className="sticky top-0 bg-[#FDFAF6] px-6 pt-4 pb-2 flex items-center justify-between border-b border-[#1B2D4F]/6">
              <h3 className="text-[#1B2D4F] font-semibold text-sm">예약 문의</h3>
              <button onClick={() => setOpen(false)} className="text-[#1B2D4F]/40 hover:text-[#1B2D4F] p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 pb-8 pt-2">
              <BookingForm
                tour={tour}
                inputCls={inputCls}
                agreedToPrivacy={agreedToPrivacy}
                setAgreedToPrivacy={setAgreedToPrivacy}
                submitted={submitted}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
