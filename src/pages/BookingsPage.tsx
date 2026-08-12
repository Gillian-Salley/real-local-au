import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import SEOMeta from '../components/SEOMeta'
import { SITE_NAME } from '../lib/seo'

export const metadata = {
  title: `나의 예약 내역 | ${SITE_NAME}`,
  description: `예약 시 입력한 이메일 또는 연락처로 투어 예약 내역을 조회하세요.`,
}

type BookingStatus = '대기중' | '확정' | '취소됨'

type Booking = {
  id: string
  tourTitle: string
  region: string
  img: string
  date: string
  headcount: number
  status: BookingStatus
  appliedAt: string
  priceKRW: number
  email: string
  phone: string
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'ART-2026-0841',
    tourTitle: '하버브리지 & 록스 골목 투어',
    region: '시드니',
    img: 'https://images.unsplash.com/photo-1546499275-102456d6b737?w=400&h=280&fit=crop&auto=format',
    date: '2026-09-14',
    headcount: 2,
    status: '확정',
    appliedAt: '2026-08-05',
    priceKRW: 89000,
    email: 'kim@example.com',
    phone: '010-1234-5678',
  },
  {
    id: 'ART-2026-0792',
    tourTitle: '울루루 선셋 & 애보리진 문화',
    region: '울루루',
    img: 'https://images.unsplash.com/photo-1605235904827-2fc511a86dd0?w=400&h=280&fit=crop&auto=format',
    date: '2026-10-02',
    headcount: 2,
    status: '대기중',
    appliedAt: '2026-08-09',
    priceKRW: 210000,
    email: 'lee@example.com',
    phone: '010-2345-6789',
  },
  {
    id: 'ART-2026-0755',
    tourTitle: '그레이트 배리어 리프 스노클링',
    region: '골드코스트',
    img: 'https://images.unsplash.com/photo-1717293520171-b1d8b5d5e3f2?w=400&h=280&fit=crop&auto=format',
    date: '2026-09-20',
    headcount: 3,
    status: '확정',
    appliedAt: '2026-07-28',
    priceKRW: 178000,
    email: 'park@example.com',
    phone: '010-3456-7890',
  },
  {
    id: 'ART-2026-0701',
    tourTitle: '레인 웨이즈 & 로컬 커피 투어',
    region: '멜번',
    img: 'https://images.unsplash.com/photo-1581716664010-2ba06ce8f51a?w=400&h=280&fit=crop&auto=format',
    date: '2026-08-30',
    headcount: 1,
    status: '취소됨',
    appliedAt: '2026-07-15',
    priceKRW: 65000,
    email: 'choi@example.com',
    phone: '010-4567-8901',
  },
]

const STATUS_STYLE: Record<BookingStatus, { bg: string; text: string; dot: string; label: string }> = {
  '확정':  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: '예약 확정' },
  '대기중': { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400',   label: '확인 대기중' },
  '취소됨': { bg: 'bg-gray-100',   text: 'text-gray-500',    dot: 'bg-gray-400',    label: '취소됨' },
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${y}년 ${m}월 ${d}일`
}

export default function BookingsPage() {
  const [searched, setSearched] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null)
  const [cancelDone, setCancelDone] = useState<Set<string>>(new Set())

  // TODO: 실제 API 연동 시 /api/bookings?q=... 으로 GET 요청 예정
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = (new FormData(e.currentTarget).get('contact') as string).trim().toLowerCase()
    const filtered = MOCK_BOOKINGS.filter((b) =>
      b.id.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.replace(/-/g, '').includes(q.replace(/-/g, ''))
    )
    setBookings(filtered)
    setSearched(true)
  }

  const confirmCancel = () => {
    if (!cancelTarget) return
    setCancelDone((prev) => new Set(prev).add(cancelTarget.id))
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelTarget.id ? { ...b, status: '취소됨' as BookingStatus } : b))
    )
    setCancelTarget(null)
  }

  const inputCls = 'flex-1 bg-white border border-[#1B2D4F]/15 rounded-xl px-4 py-3 text-[#1B2D4F] text-sm placeholder:text-[#1B2D4F]/35 focus:outline-none focus:border-[#1B2D4F]/35 focus:ring-2 focus:ring-[#1B2D4F]/6 transition-all duration-200'

  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      <SEOMeta {...metadata} />

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="bg-[#1B2D4F] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-3">My Bookings</p>
          <h1
            className="text-white text-3xl md:text-4xl font-light"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            나의 예약 내역
          </h1>
          <p className="text-white/50 text-sm mt-3">
            예약 시 입력한 이메일 또는 연락처로 조회하세요.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* ── Search form ──────────────────────────────────────────────── */}
        <form
          onSubmit={handleSearch}
          className="bg-white border border-[#1B2D4F]/10 rounded-2xl p-5 md:p-6 mb-10 shadow-sm"
        >
          <p className="text-[#1B2D4F] font-semibold text-sm mb-4">예약 조회</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="contact"
              required
              placeholder="이메일 또는 연락처 (010-0000-0000)"
              className={inputCls}
            />
            <button
              type="submit"
              className="bg-[#1B2D4F] hover:bg-[#2a4170] text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              조회하기
            </button>
          </div>
          <p className="text-[#1B2D4F]/35 text-xs mt-3">
            회원가입 없이 예약 시 입력하신 정보로 조회할 수 있습니다.
          </p>
        </form>

        {/* ── Results ──────────────────────────────────────────────────── */}
        {searched && (
          <>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                <p className="text-[#1B2D4F]/45 text-xs mb-2">
                  총 <span className="text-[#1B2D4F] font-semibold">{bookings.length}</span>건의 예약 내역
                </p>

                {bookings.map((b) => {
                  const st = STATUS_STYLE[b.status]
                  const isCancellable = b.status === '확정' || b.status === '대기중'

                  return (
                    <article
                      key={b.id}
                      className={`bg-white border border-[#1B2D4F]/8 rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-opacity duration-200 ${b.status === '취소됨' ? 'opacity-60' : ''}`}
                    >
                      {/* Thumbnail */}
                      <div className="relative sm:w-40 shrink-0 aspect-[16/9] sm:aspect-auto bg-[#EDE3D6]">
                        <img
                          src={b.img}
                          alt={b.tourTitle}
                          className="w-full h-full object-cover"
                        />
                        {b.status === '취소됨' && (
                          <div className="absolute inset-0 bg-white/50" />
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex-1 p-5 flex flex-col gap-3 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="bg-[#1B2D4F]/8 text-[#1B2D4F] text-[10px] font-medium px-2 py-0.5 rounded-full">{b.region}</span>
                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${st.bg} ${st.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                {st.label}
                              </span>
                            </div>
                            <h2 className="text-[#1B2D4F] font-semibold text-sm leading-snug truncate">
                              {b.tourTitle}
                            </h2>
                          </div>
                          <p className="text-[#1B2D4F]/35 text-[10px] shrink-0 pt-0.5">#{b.id}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4">
                          <div>
                            <p className="text-[#1B2D4F]/40 text-[10px] mb-0.5">희망 날짜</p>
                            <p className="text-[#1B2D4F] text-xs font-medium">{formatDate(b.date)}</p>
                          </div>
                          <div>
                            <p className="text-[#1B2D4F]/40 text-[10px] mb-0.5">인원수</p>
                            <p className="text-[#1B2D4F] text-xs font-medium">{b.headcount}명</p>
                          </div>
                          <div>
                            <p className="text-[#1B2D4F]/40 text-[10px] mb-0.5">신청일</p>
                            <p className="text-[#1B2D4F] text-xs font-medium">{formatDate(b.appliedAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[#1B2D4F]/6 mt-auto">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[#1B2D4F]/40 text-xs">합계</span>
                            <span
                              className="text-[#1B2D4F] font-bold text-base"
                              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                            >
                              {(b.priceKRW * b.headcount).toLocaleString('ko-KR')}원
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/tour/${MOCK_BOOKINGS.findIndex((m) => m.id === b.id) + 1}`}
                              className="text-[#1B2D4F] border border-[#1B2D4F]/20 hover:border-[#1B2D4F]/40 text-xs font-medium px-3.5 py-2 rounded-full transition-colors duration-200"
                            >
                              상세보기
                            </Link>
                            {isCancellable && (
                              <button
                                onClick={() => setCancelTarget(b)}
                                className="text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 text-xs font-medium px-3.5 py-2 rounded-full transition-colors duration-200"
                              >
                                예약 취소
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              /* ── Empty state ──────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1B2D4F]/6 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-[#1B2D4F]/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3
                  className="text-[#1B2D4F] text-xl font-light mb-2"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  예약 내역이 없어요
                </h3>
                <p className="text-[#1B2D4F]/45 text-sm leading-relaxed mb-7 max-w-xs">
                  입력하신 정보로 조회된 예약이 없습니다.<br />
                  이메일 또는 연락처를 다시 확인해주세요.
                </p>
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 bg-[#C4603A] hover:bg-[#D97A56] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors duration-200"
                >
                  투어 둘러보기
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Cancel confirm modal ────────────────────────────────────── */}
      {cancelTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCancelTarget(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-5">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <div className="text-center">
              <h3 className="text-[#1B2D4F] font-semibold text-base mb-1.5" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                예약을 취소하시겠어요?
              </h3>
              <p className="text-[#1B2D4F]/55 text-sm leading-relaxed">
                <span className="font-medium text-[#1B2D4F]">{cancelTarget.tourTitle}</span><br />
                {formatDate(cancelTarget.date)} · {cancelTarget.headcount}명
              </p>
              <p className="text-[#1B2D4F]/40 text-xs mt-3 leading-relaxed">
                취소 후에는 되돌릴 수 없습니다.<br />
                환불은 취소 정책에 따라 처리됩니다.
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 bg-[#1B2D4F]/6 hover:bg-[#1B2D4F]/12 text-[#1B2D4F] text-sm font-medium py-3 rounded-xl transition-colors duration-200"
              >
                돌아가기
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-3 rounded-xl transition-colors duration-200"
              >
                예약 취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
