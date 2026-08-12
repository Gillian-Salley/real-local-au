import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import SEOMeta from '../components/SEOMeta'
import { SITE_NAME } from '../lib/seo'

export const metadata = {
  title: `가이드 지원 신청 | ${SITE_NAME}`,
  description: `호주 거주 5년 이상의 경험을 투어로 나눠보세요. AusRealTour 가이드로 지원하세요.`,
}

const REGIONS = ['시드니', '멜번', '브리즈번', '골드코스트', '케언즈', '울루루', '퍼스', '애들레이드', '기타']
const THEMES = ['도시·문화', '자연·액티비티', '음식·카페', '워홀·유학 생활', '신혼여행', '가족여행', '기타']

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '자유로운 일정',
    desc: '원하는 날짜에만 투어를 열 수 있어요. 본업·육아 등 개인 일정과 병행 가능합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: '수익의 85% 직접 수령',
    desc: '투어 수익의 85%가 가이드에게 직접 지급됩니다. 플랫폼 수수료는 15%뿐이에요.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    title: '마케팅은 저희가',
    desc: '예약 관리, SNS 홍보, 사진 촬영 지원까지 AusRealTour가 담당합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 010 3.296 3.745 3.745 0 01-3.296 3.296 3.745 3.745 0 01-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296 0 3.745 3.745 0 01-3.296-3.296 3.745 3.745 0 01-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 010-3.296 3.745 3.745 0 013.296-3.296 3.745 3.745 0 013.068-1.593c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 0 3.745 3.745 0 013.296 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: '검증 뱃지 부여',
    desc: '승인 후 "AusRealTour 검증 가이드" 뱃지가 프로필에 표시되어 신뢰도가 높아져요.',
  },
]

const STEPS = [
  { num: '01', title: '지원서 제출', desc: '아래 폼을 작성해 제출해주세요. 검토 후 3영업일 내로 연락드립니다.' },
  { num: '02', title: '화상 인터뷰', desc: '간단한 영상통화로 거주 경험과 투어 아이디어를 이야기 나눕니다.' },
  { num: '03', title: '시범 투어 진행', desc: '실제 소규모 투어를 함께 진행하며 가이드 역량을 확인합니다.' },
  { num: '04', title: '가이드 등록 완료', desc: '검증 뱃지 발급 후 바로 투어를 열 수 있어요!' },
]

export default function GuideApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)

  // TODO: 실제 API 연동 시 /api/guide-apply 엔드포인트로 POST 요청 처리 예정
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('[가이드 지원 데이터]', data)
    setSubmitted(true)
  }

  const inputCls = 'w-full bg-[#F5EFE6] border border-[#1B2D4F]/12 rounded-xl px-4 py-3.5 text-[#1B2D4F] text-sm placeholder:text-[#1B2D4F]/35 focus:outline-none focus:border-[#1B2D4F]/35 focus:ring-2 focus:ring-[#1B2D4F]/6 transition-all duration-200'
  const selectCls = `${inputCls} appearance-none pr-10 cursor-pointer`

  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      <SEOMeta {...metadata} />

      {/* ── Hero header ────────────────────────────────────────────── */}
      <div className="relative bg-[#1B2D4F] pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#C4603A]/10 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-48 h-48 rounded-full bg-white/4 translate-y-1/2 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs mb-8 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
          <p className="text-[#C4603A] text-sm font-semibold tracking-widest uppercase mb-4">Become a Guide</p>
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-5"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            당신의 호주 경험이<br />
            <em className="not-italic text-[#E8845C]">누군가의 여행</em>이 됩니다
          </h1>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
            5년 이상 호주에 살아온 분이라면 누구든 지원할 수 있어요.
            직접 검증한 루트로 진짜 호주를 전해주세요.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Benefits ─────────────────────────────────────────────── */}
        <div className="mt-10 mb-14 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white border border-[#1B2D4F]/8 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-11 h-11 rounded-xl bg-[#F5EFE6] text-[#C4603A] flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-[#1B2D4F] font-semibold text-sm mb-1">{b.title}</h3>
                  <p className="text-[#1B2D4F]/55 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Process steps ────────────────────────────────────────── */}
        <div className="mb-14 md:mb-20">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-3">Process</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-8"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            지원부터 등록까지
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-[#1B2D4F]/10 z-0" style={{ width: 'calc(100% - 2.5rem)', left: 'calc(50% + 1.5rem)' }} />
                )}
                <div className="relative z-10">
                  <div
                    className="text-3xl font-light text-[#1B2D4F]/10 mb-3"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {s.num}
                  </div>
                  <h3 className="text-[#1B2D4F] font-semibold text-sm mb-1.5">{s.title}</h3>
                  <p className="text-[#1B2D4F]/50 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Application form ─────────────────────────────────────── */}
        <div className="mb-20">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-3">Apply</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-8"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            지원서 작성하기
          </h2>

          {submitted ? (
            <div className="bg-[#1B2D4F] rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[#C4603A]/20 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-[#C4603A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                지원서가 접수됐어요!
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                검토 후 3영업일 이내로 이메일·문자로 연락드릴게요.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-[#C4603A] text-sm font-medium hover:underline">
                홈으로 돌아가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-[#1B2D4F]/8 rounded-2xl p-6 md:p-8 shadow-sm">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">이름 <span className="text-[#C4603A]">*</span></label>
                  <input type="text" name="name" required placeholder="홍길동" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">이메일 <span className="text-[#C4603A]">*</span></label>
                  <input type="email" name="email" required placeholder="example@email.com" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">연락처 <span className="text-[#C4603A]">*</span></label>
                  <input type="tel" name="phone" required placeholder="010-0000-0000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">호주 거주 기간 <span className="text-[#C4603A]">*</span></label>
                  <div className="relative">
                    <select name="residencyYears" required defaultValue="" className={selectCls}>
                      <option value="" disabled>선택해주세요</option>
                      {['5년 이상', '7년 이상', '10년 이상', '15년 이상'].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B2D4F]/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">활동 지역 <span className="text-[#C4603A]">*</span></label>
                  <div className="relative">
                    <select name="region" required defaultValue="" className={selectCls}>
                      <option value="" disabled>지역 선택</option>
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B2D4F]/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">투어 테마 <span className="text-[#C4603A]">*</span></label>
                  <div className="relative">
                    <select name="theme" required defaultValue="" className={selectCls}>
                      <option value="" disabled>테마 선택</option>
                      {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B2D4F]/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">
                  나만 아는 호주의 장소·루트 <span className="text-[#C4603A]">*</span>
                  <span className="text-[#1B2D4F]/35 font-normal ml-1">(100자 이상)</span>
                </label>
                <textarea
                  name="localRoute"
                  required
                  minLength={100}
                  rows={4}
                  placeholder="현지인만 아는 장소나 루트를 자유롭게 소개해주세요. 직접 경험한 내용일수록 좋아요."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div>
                <label className="block text-[#1B2D4F] text-xs font-semibold mb-2">자기소개 및 지원 동기</label>
                <textarea
                  name="motivation"
                  rows={3}
                  placeholder="호주에서의 경험과 가이드를 하고 싶은 이유를 간단히 알려주세요."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Consent */}
              <div className="space-y-3 pt-1 border-t border-[#1B2D4F]/6">
                <label className="flex items-start gap-3 cursor-pointer group mt-4">
                  <input
                    type="checkbox"
                    name="privacyAgreed"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 accent-[#C4603A] shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-[#1B2D4F]/55 group-hover:text-[#1B2D4F]/70 transition-colors">
                    <span className="text-[#1B2D4F]/80 font-semibold">[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                    <br />
                    <span className="text-[#1B2D4F]/35">수집 항목: 이름, 이메일, 연락처 / 목적: 가이드 지원 검토 / 보유 기간: 검토 완료 후 1년</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!privacyChecked}
                className="w-full bg-[#C4603A] hover:bg-[#D97A56] disabled:bg-[#1B2D4F]/15 disabled:text-[#1B2D4F]/25 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-sm tracking-wide"
              >
                가이드 지원 신청하기
              </button>
              <p className="text-[#1B2D4F]/30 text-[10px] text-center">검토 후 3영업일 이내 이메일 및 문자로 결과를 알려드립니다</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
