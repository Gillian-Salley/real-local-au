import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import SEOMeta from '../components/SEOMeta'
import { SITE_NAME } from '../lib/seo'

export const metadata = {
  title: `왜 저희를 믿고 예약하셔도 될까요 | ${SITE_NAME}`,
  description: `워킹홀리데이·유학·현지 정착까지, 호주에서 5년 이상 살아온 사람들이 만든 투어 플랫폼 ${SITE_NAME}의 이야기를 소개합니다.`,
}

const TIMELINE = [
  {
    period: '2017 – 2019',
    tag: '워킹홀리데이',
    tagColor: '#C4603A',
    title: '호주의 일상 속으로, 2년의 워홀 생활',
    body: '처음엔 모두가 가는 오페라하우스와 본다이 비치부터 다녔어요. 그런데 몇 달이 지나고 보니, 현지 동료들이 주말에 가는 곳은 전혀 달랐습니다. 관광객이 한 명도 없는 강변 바비큐 공원, 아는 사람만 찾는 인도어 마켓, 현지인들이 모이는 야시장. 워홀 2년 동안 그 장소들을 발로 직접 찾아다녔어요.',
    img: 'https://images.unsplash.com/photo-1611564393101-b834b74a9b48?w=800&h=500&fit=crop&auto=format',
    imgAlt: '호주 아웃백 일상 풍경',
  },
  {
    period: '2019 – 2020',
    tag: '유학',
    tagColor: '#1B2D4F',
    title: '학업과 커뮤니티 사이, 로컬의 시선을 얻다',
    body: '학생 비자로 전환해 시드니 대학에 입학했어요. 공부하면서 자연스럽게 현지인 친구들과 더 깊이 어울리게 됐고, "로컬이 진짜 좋아하는 것"과 "관광지로 알려진 것"이 얼마나 다른지 매일 실감했습니다. 그들이 알려준 숨은 수영 포인트, 진짜 맛있는 피시앤칩스 가게, 주말마다 열리는 소규모 재즈 공연—이 기록들이 나중에 투어 루트의 씨앗이 됐어요.',
    img: 'https://images.unsplash.com/photo-1546499275-102456d6b737?w=800&h=500&fit=crop&auto=format',
    imgAlt: '시드니 현지 생활',
  },
  {
    period: '2020',
    tag: '전환점',
    tagColor: '#2a6b4f',
    title: '패키지 투어를 따라온 지인, 그 간극을 목격하다',
    body: '한국에서 친구가 호주 패키지 여행으로 방문했어요. 이틀간 함께 다니면서 충격을 받았습니다. 그 투어가 데려간 곳은 제가 2년 동안 단 한 번도 현지인과 간 적 없는 장소들이었어요. 반대로 제가 안내한 하루는 친구가 "이게 진짜 호주구나"라고 했고요. 그 대화가 머릿속에서 떠나지 않았어요. 이 간극을 메울 수 있다면, 분명히 필요한 서비스가 될 거라고 생각했습니다.',
    img: 'https://images.unsplash.com/photo-1548296404-93c7694b2f91?w=800&h=500&fit=crop&auto=format',
    imgAlt: '호주 관광지와 로컬 명소의 차이',
  },
  {
    period: '2022',
    tag: '플랫폼 설립',
    tagColor: '#C4603A',
    title: '나 혼자가 아닌, 검증된 가이드들의 플랫폼으로',
    body: '처음엔 제가 직접 모든 투어를 맡으려 했어요. 하지만 금방 한계를 느꼈습니다. 케언즈를 시드니 사람이 안내할 수 없고, 멜버른을 퍼스 거주자가 깊이 있게 설명할 수 없어요. 그래서 방향을 틀었습니다. 호주 각 지역에 5년 이상 거주한 분들을 직접 만나고, 루트를 검증하고, 실제 투어를 함께 진행해보며 가이드를 선발했어요. 지금 AusRealTour의 가이드들은 모두 그 과정을 거쳤습니다.',
    img: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&h=500&fit=crop&auto=format',
    imgAlt: 'AusRealTour 플랫폼 가이드 팀',
  },
]

const GUIDE_VALUES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: '현지 거주 5년 이상',
    desc: '단순 방문자가 아닌, 실제로 그 도시에서 생활한 사람. 동네 슈퍼마켓부터 비공개 수영 포인트까지 알고 있어요.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: '검증된 로컬 루트 보유',
    desc: '가이드마다 직접 발굴한 루트를 AusRealTour 팀이 동행 검증합니다. 인터넷에 없는 장소가 포함되어 있어요.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '실제 생활자의 시선',
    desc: '관광객 눈이 아닌 거주자의 눈으로 도시를 봅니다. 현지인이 실제로 즐기는 방식 그대로 경험할 수 있어요.',
  },
]

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(18px)' }}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-[#FDFAF6]">
      <SEOMeta {...metadata} />

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="bg-[#1B2D4F] pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-5">나의 스토리</p>
          <h1
            className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-snug mb-5"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            평범한 투어와<br />
            <em className="not-italic text-[#D97A56]">로컬의 시선은 다릅니다</em>
          </h1>
          <p className="text-white/55 text-sm md:text-base leading-relaxed">
            그 차이를 발견하고, 5년 이상 호주에 뿌리내린 가이드들을 모았습니다.
          </p>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[#1B2D4F]/12" />

          <div className="space-y-14 md:space-y-16">
            {TIMELINE.map((item, i) => (
              <FadeIn key={item.period} delay={i * 60}>
                <div className="relative flex gap-6 md:gap-8">
                  {/* Dot */}
                  <div className="shrink-0 flex flex-col items-center" style={{ width: 40 }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border-[3px] border-white z-10 shadow-sm"
                      style={{ backgroundColor: item.tagColor }}
                    >
                      <span className="text-white text-[9px] font-bold leading-tight text-center px-0.5">
                        {item.tag === '전환점' ? '↗' : item.tag === '플랫폼 설립' ? '✦' : item.tag === '워킹홀리데이' ? 'WH' : '유학'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Period + tag */}
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span
                        className="text-[#1B2D4F]/40 text-sm font-light"
                        style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                      >
                        {item.period}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide"
                        style={{ backgroundColor: `${item.tagColor}18`, color: item.tagColor }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h2
                      className="text-[#1B2D4F] text-lg md:text-xl font-light leading-snug mb-4"
                      style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                    >
                      {item.title}
                    </h2>

                    {/* Image */}
                    <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-[#EDE3D6] mb-4">
                      <img
                        src={item.img}
                        alt={item.imgAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2D4F]/15 to-transparent" />
                    </div>

                    <p className="text-[#1B2D4F]/65 text-sm md:text-base leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* End node */}
            <div className="relative flex gap-6 md:gap-8 items-center">
              <div style={{ width: 40 }} className="shrink-0 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-[#C4603A] flex items-center justify-center z-10 shadow-sm">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <p className="text-[#1B2D4F]/35 text-sm leading-relaxed" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                지금도 새로운 가이드와 루트를 발굴하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Guide values ─────────────────────────────────────────────── */}
      <div className="bg-[#1B2D4F] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="mb-10">
              <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-4">Our Guides</p>
              <h2
                className="text-white text-2xl md:text-3xl font-light leading-snug"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                저희 가이드는 이런 분들입니다
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {GUIDE_VALUES.map((v) => (
                <div
                  key={v.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C4603A]/15 flex items-center justify-center text-[#C4603A] mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{v.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Divider quote ─────────────────────────────────────────────── */}
      <div className="bg-[#F5EFE6] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <blockquote className="border-l-2 border-[#C4603A] pl-6">
              <p
                className="text-[#1B2D4F] text-lg md:text-xl font-light leading-relaxed mb-3"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                "패키지 투어가 보여주는 호주와, 현지인이 실제로 사는 호주는 다른 나라처럼 달랐어요."
              </p>
              <cite className="text-[#1B2D4F]/45 text-xs not-italic">— AusRealTour 창업자</cite>
            </blockquote>
          </FadeIn>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="bg-[#0f1e35] px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2
              className="text-white text-2xl md:text-3xl font-light mb-3"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              이제 직접 경험해보세요
            </h2>
            <p className="text-white/45 text-sm mb-8 leading-relaxed">
              5년 이상 호주에 살아온 가이드들이 안내하는 진짜 로컬 투어
            </p>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2.5 bg-[#C4603A] hover:bg-[#D97A56] text-white font-medium px-8 py-4 rounded-full transition-colors duration-200 text-sm tracking-wide"
            >
              저희 가이드들이 안내하는 투어 보기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </div>

    </div>
  )
}
