import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import SEOMeta from '../components/SEOMeta'
import { SITE_NAME } from '../lib/seo'

export const metadata = {
  title: `왜 로컬 가이드여야 하는가 | ${SITE_NAME}`,
  description: `패키지 투어와 로컬 가이드의 차이, AusRealTour가 검증 가이드 매칭 서비스를 만든 이유를 소개합니다.`,
}

const SECTIONS = [
  { id: 'gap', label: '간극의 발견' },
  { id: 'verified', label: '실거주 검증 가이드' },
  { id: 'process', label: '3단계 검증 프로세스' },
  { id: 'korean', label: '한국어 소통 100%' },
  { id: 'refund', label: '안심 환불 정책' },
]

export default function WhyLocalPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [hash])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      <SEOMeta {...metadata} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-[#1B2D4F] pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#C4603A]/8 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-white/3 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm mb-8 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-5">Why Local Guide</p>
          <h1
            className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-6"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            왜 로컬 가이드여야<br />
            <em className="not-italic text-[#E8845C]">하는가</em>
          </h1>
          <p className="text-white/55 text-base leading-relaxed max-w-xl mb-10">
            호주에서 5년 이상 살아본 사람만이 알 수 있는 것들이 있습니다.
            AusRealTour는 그 경험의 격차를 직접 목격한 뒤 만들어진 서비스입니다.
          </p>
          {/* 목차 */}
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── 01 간극의 발견 ────────────────────────────────────────── */}
        <section id="gap" className="py-16 md:py-20 border-b border-[#1B2D4F]/8">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">01 · 간극의 발견</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-6 leading-snug"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            패키지 투어가 데려가는 곳을<br />
            현지인은 가지 않습니다
          </h2>
          <div className="space-y-5 text-[#1B2D4F]/70 text-base leading-relaxed">
            <p>
              한국에서 친구가 호주 패키지 여행으로 방문했을 때였습니다. 이틀 동안 함께 다니면서 충격을 받았습니다.
              투어 버스가 데려간 곳은 2년 동안 현지인과 단 한 번도 가본 적 없는 장소들이었습니다.
            </p>
            <p>
              반면 제가 안내한 하루—스트리트 마켓, 단골 카페 뒷골목, 주민만 아는 선셋 포인트—에서 친구는
              <span className="text-[#1B2D4F] font-semibold"> "이게 진짜 호주구나"</span>라고 했습니다.
            </p>
            <p>
              이 간극은 단순히 장소의 차이가 아니었습니다. 정보의 비대칭, 경험의 깊이, 그리고 현지인만이 가진
              맥락의 차이였습니다. AusRealTour는 그 대화 하나에서 시작되었습니다.
            </p>
          </div>

          {/* 비교 카드 */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F5EFE6] rounded-2xl p-6">
              <p className="text-[#1B2D4F]/40 text-xs font-semibold uppercase tracking-widest mb-4">패키지 투어</p>
              <ul className="space-y-3">
                {[
                  '오페라하우스·하버브리지 사진 촬영',
                  '지정된 면세점·기념품샵 방문',
                  '버스로 이동, 30분 단위 일정',
                  '영어 가이드 또는 중국어 통역',
                  '모든 여행자가 동일한 루트',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[#1B2D4F]/60">
                    <svg className="w-4 h-4 text-[#1B2D4F]/25 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1B2D4F] rounded-2xl p-6">
              <p className="text-[#C4603A] text-xs font-semibold uppercase tracking-widest mb-4">AusRealTour 로컬 가이드</p>
              <ul className="space-y-3">
                {[
                  '현지인만 아는 골목·뷰포인트 안내',
                  '가이드의 단골 식당·카페 직접 경험',
                  '소규모(최대 8인) 여유로운 일정',
                  '한국어 100% 자유로운 대화',
                  '여행자 관심사 맞춤 루트 조정',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-white/80">
                    <svg className="w-4 h-4 text-[#C4603A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 02 실거주 검증 가이드 ────────────────────────────────── */}
        <section id="verified" className="py-16 md:py-20 border-b border-[#1B2D4F]/8">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">02 · 실거주 검증 가이드</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-6 leading-snug"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            거주 경험 없이는<br />
            가이드가 될 수 없습니다
          </h2>
          <div className="space-y-5 text-[#1B2D4F]/70 text-base leading-relaxed">
            <p>
              AusRealTour의 모든 가이드는 호주에서 <span className="text-[#1B2D4F] font-semibold">최소 5년 이상 실거주</span>한 경험자입니다.
              워킹홀리데이, 유학, 장기 정착—어떤 형태든 현지의 일상을 살아본 사람만이 지원할 수 있습니다.
            </p>
            <p>
              여행자와 거주자의 호주는 완전히 다릅니다. 관광지 입장권 가격이 아니라 현지 마트에서 장보는 법,
              버스 노선의 미묘한 차이, 날씨별 추천 코스—이 모든 것은 살아봐야만 생기는 지식입니다.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: '5년+', label: '최소 거주 기간', sub: '호주 각 주 실거주 필수' },
              { stat: '8인↓', label: '최대 투어 인원', sub: '소규모로 깊이 있는 경험' },
              { stat: '100%', label: '직접 큐레이션', sub: '가이드가 직접 검증한 루트' },
            ].map((s) => (
              <div key={s.stat} className="bg-white border border-[#1B2D4F]/8 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-3xl font-light text-[#C4603A] mb-1" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{s.stat}</p>
                <p className="text-[#1B2D4F] font-semibold text-sm mb-1">{s.label}</p>
                <p className="text-[#1B2D4F]/45 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 3단계 검증 프로세스 ───────────────────────────────── */}
        <section id="process" className="py-16 md:py-20 border-b border-[#1B2D4F]/8">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">03 · 3단계 검증 프로세스</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-6 leading-snug"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            플랫폼이 직접 검증하지 않으면<br />
            신뢰할 수 없습니다
          </h2>
          <div className="space-y-5 text-[#1B2D4F]/70 text-base leading-relaxed mb-10">
            <p>
              누구나 가이드 등록이 가능한 플랫폼은 많습니다. AusRealTour는 다릅니다.
              우리가 직접 세 단계를 거쳐 가이드 한 명 한 명을 검증합니다.
              여행자가 플랫폼을 신뢰하려면, 플랫폼이 먼저 가이드를 신뢰할 수 있어야 합니다.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: '서류 심사',
                desc: '거주 기간 증빙(비자·거주 확인서), 현지 활동 이력, 투어 기획서를 제출합니다. 단순 관광 경험은 인정되지 않습니다.',
                detail: '합격률 약 40%',
              },
              {
                step: '02',
                title: '화상 인터뷰',
                desc: '운영팀이 직접 영상통화로 가이드의 현지 지식, 소통 방식, 투어 철학을 확인합니다. 형식적인 면접이 아닌 실제 루트 설명을 요청합니다.',
                detail: '서류 통과자의 약 60% 최종 합격',
              },
              {
                step: '03',
                title: '시범 투어',
                desc: '실제 소규모 투어를 운영팀 또는 베타 여행자와 함께 진행합니다. 안전, 소통, 콘텐츠 품질 세 가지를 평가합니다.',
                detail: '검증 뱃지 발급 후 정식 등록',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white border border-[#1B2D4F]/8 rounded-2xl p-6 shadow-sm">
                <div
                  className="text-4xl font-light text-[#1B2D4F]/10 shrink-0 leading-none"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#1B2D4F] font-semibold text-base">{item.title}</h3>
                    <span className="bg-[#C4603A]/10 text-[#C4603A] text-xs font-medium px-2.5 py-0.5 rounded-full">{item.detail}</span>
                  </div>
                  <p className="text-[#1B2D4F]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 한국어 소통 100% ───────────────────────────────────── */}
        <section id="korean" className="py-16 md:py-20 border-b border-[#1B2D4F]/8">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">04 · 한국어 소통 100%</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-6 leading-snug"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            언어의 장벽이 사라지면<br />
            경험의 깊이가 달라집니다
          </h2>
          <div className="space-y-5 text-[#1B2D4F]/70 text-base leading-relaxed">
            <p>
              영어로 진행되는 투어에서 여행자는 이해의 절반을 잃습니다. 뉘앙스, 농담, 현지인만 아는 이야기—
              이 모든 것은 모국어로 들을 때 비로소 온전히 전달됩니다.
            </p>
            <p>
              AusRealTour의 가이드는 한국어 원어민입니다. 호주에서 수년간 살아온 동시에,
              한국 여행자의 정서와 눈높이를 이해하는 사람들입니다.
              질문을 편하게 할 수 있고, 실시간으로 일정을 바꿀 수도 있습니다.
            </p>
            <p>
              "사실 저도 처음 왔을 때 여기서 완전히 길을 잃었어요"—이런 솔직한 이야기가 나오는 투어,
              그게 우리가 만들고 싶은 경험입니다.
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-[#C4603A] pl-6 py-2">
            <p className="text-[#1B2D4F] text-lg font-light leading-relaxed italic" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              "영어 투어 3번 다녀왔는데, 한국어 가이드랑 하루 다닌 게 제일 많이 남았어요."
            </p>
            <p className="text-[#1B2D4F]/40 text-sm mt-3">— AusRealTour 이용자 후기</p>
          </blockquote>
        </section>

        {/* ── 05 안심 환불 정책 ────────────────────────────────────── */}
        <section id="refund" className="py-16 md:py-20">
          <p className="text-[#C4603A] text-xs font-semibold tracking-widest uppercase mb-4">05 · 안심 환불 정책</p>
          <h2
            className="text-[#1B2D4F] text-2xl md:text-3xl font-light mb-6 leading-snug"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            예약이 부담스러우면<br />
            아무도 예약하지 않습니다
          </h2>
          <div className="space-y-5 text-[#1B2D4F]/70 text-base leading-relaxed">
            <p>
              여행 계획은 바뀝니다. 항공편이 바뀌고, 날씨가 달라지고, 동행이 줄기도 합니다.
              우리는 여행자가 처음 예약할 때 느끼는 리스크를 최대한 낮추기로 했습니다.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { timing: '48시간 전', refund: '100% 환불', color: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
              { timing: '24시간 전', refund: '70% 환불', color: 'bg-amber-50 border-amber-100', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
              { timing: '당일 취소', refund: '50% 환불', color: 'bg-[#F5EFE6] border-[#1B2D4F]/8', text: 'text-[#1B2D4F]', badge: 'bg-[#1B2D4F]/8 text-[#1B2D4F]' },
            ].map((r) => (
              <div key={r.timing} className={`border rounded-2xl p-6 ${r.color}`}>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${r.text}`}>{r.timing}</p>
                <p className={`text-3xl font-light mb-2 ${r.text}`} style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{r.refund}</p>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${r.badge}`}>자동 처리</span>
              </div>
            ))}
          </div>
          <p className="text-[#1B2D4F]/40 text-sm mt-5 leading-relaxed">
            * 환불은 결제 수단으로 영업일 기준 3~5일 내 자동 처리됩니다. 천재지변·가이드 사정에 의한 취소는 100% 환불됩니다.
          </p>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="mb-20 bg-[#1B2D4F] rounded-2xl p-8 md:p-10 text-center">
          <h3
            className="text-white text-2xl md:text-3xl font-light mb-3"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            직접 경험해보세요
          </h3>
          <p className="text-white/50 text-base mb-8">글로 읽는 것보다, 한 번의 투어가 더 잘 설명합니다.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/tours"
              className="bg-[#C4603A] hover:bg-[#D97A56] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base"
            >
              투어 둘러보기
            </Link>
            <Link
              to="/guide-apply"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 text-base"
            >
              가이드 지원하기
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
