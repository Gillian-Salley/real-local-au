import { Link } from 'react-router'
import TourCard from '../components/TourCard'
import { FEATURED_TOURS } from '../data/tours'

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
  { name: '박소연', role: '시드니 워홀러', text: '일반 여행사 투어랑 차원이 달라요. 가이드분이 직접 살던 동네 맛집이랑 숨은 명소를 알려줘서 정말 특별했어요.', tour: '하버브리지 & 록스 골목 투어', rating: 5 },
  { name: '정민우', role: '멜버른 유학생', text: '예약부터 투어 당일까지 소통이 너무 편했어요. 가이드분이 제 영어 실력에 맞게 설명도 해주시고, 호주 생활 꿀팁도 많이 알려주셨습니다.', tour: '그레이트 배리어 리프 스노클링', rating: 5 },
  { name: '강예나', role: '브리즈번 거주자', text: 'AI 상담으로 내 일정에 맞는 투어를 추천받았는데 완벽하게 맞았어요. 가격 대비 퀄리티가 정말 높고, 가이드분의 진정성이 느껴졌어요.', tour: '울루루 선셋 & 애보리진 문화', rating: 5 },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'AI 상담으로 투어 매칭', desc: '여행 기간, 관심사, 예산을 입력하면 AI가 나에게 딱 맞는 투어를 추천해드려요.' },
  { step: '02', title: '검증된 로컬 가이드 확인', desc: '모든 가이드는 호주 실거주 경험자로, 직접 인터뷰와 후기 검증을 거쳤어요.' },
  { step: '03', title: '간편 예약 & 확정', desc: '카드/카카오페이 결제 후 예약 확정 문자 즉시 발송. 변경/취소도 유연하게.' },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[560px] max-h-[900px] flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[#0f1e35]">
          <img
            src="https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=1800&h=1200&fit=crop&auto=format"
            alt="호주 울루루 붉은 대지와 하늘"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1520]/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a1520]/60 to-transparent" />
        </div>

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
              아는 <em className="not-italic text-[#D97A56]">호주 여행</em>
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
              <a
                href="#story"
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 active:scale-95 border border-white/40 hover:border-white/60 text-white font-medium px-8 py-4 rounded-full transition-all duration-200 text-center text-sm"
              >
                나의 스토리 보기
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center pb-6 gap-1.5">
          <span className="text-white/35 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="flex flex-col items-center gap-0.5 animate-bounce" style={{ animationDuration: '1.6s' }}>
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg className="w-5 h-5 text-white/20 -mt-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
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
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                호주에서 실제로 살아본 사람만이 알 수 있는 것들이 있어요. 어느 카페가 진짜 맛있는지, 어느 해변이 현지인들이 가는 곳인지. AusRealTour는 그 경험을 연결합니다.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: '실거주 검증 가이드', desc: '최소 6개월 이상 호주 거주 경험자만 가이드로 등록 가능' },
                { title: '3단계 검증 프로세스', desc: '서류 심사 → 인터뷰 → 시범 투어 운영 후 최종 승인' },
                { title: '한국어 소통 100%', desc: '영어 걱정 없이 편안한 한국어로 진행되는 투어' },
                { title: '안심 환불 정책', desc: '투어 48시간 전까지 전액 환불, 당일 취소도 50% 환불' },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-[#C4603A]/20 flex items-center justify-center mb-3">
                    <span className="text-[#C4603A] text-sm font-bold">✓</span>
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
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
              <h2 className="text-[#1B2D4F] text-3xl md:text-4xl lg:text-5xl font-light leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                지금 가장 인기 있는<br className="hidden sm:block" /> 투어
              </h2>
            </div>
            <Link
              to="/tours"
              className="self-start md:self-auto inline-flex items-center gap-1.5 text-[#1B2D4F]/55 hover:text-[#1B2D4F] text-sm font-medium transition-colors duration-200 group"
            >
              전체 투어 보기
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1B2D4F]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C4603A] text-sm font-medium tracking-widest uppercase mb-4">AI 투어 상담</p>
          <h2 className="text-white text-3xl md:text-5xl font-light leading-tight mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            어떤 투어가 나에게<br /><em className="not-italic text-[#D97A56]">맞을까요?</em>
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            AI 상담사에게 여행 일정과 취향을 알려주세요. 10초 만에 딱 맞는 투어를 추천해드립니다.
          </p>
          <a href="#" className="inline-flex items-center gap-3 bg-[#C4603A] hover:bg-[#D97A56] text-white font-medium px-8 py-4 rounded-full transition-colors duration-200 text-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            AI 상담 시작하기
          </a>
        </div>
      </section>
    </>
  )
}
