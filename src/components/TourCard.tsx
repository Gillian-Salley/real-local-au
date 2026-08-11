type TourCardProps = {
  id: number
  region: string
  title: string
  description: string
  priceKRW: number
  img: string
  badge?: string
}

export default function TourCard({ id, region, title, description, priceKRW, img, badge }: TourCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#1B2D4F]/8 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#1B2D4F]/10 transition-all duration-300 flex flex-col">
      {/* Thumbnail 4:3 */}
      <div className="relative aspect-[4/3] bg-[#EDE3D6] overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-[#C4603A] text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {badge}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#1B2D4F] text-xs font-semibold px-2.5 py-1 rounded-full">
            {region}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3
            className="text-[#1B2D4F] font-semibold text-base leading-snug mb-1.5"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            {title}
          </h3>
          <p className="text-[#1B2D4F]/55 text-sm leading-relaxed line-clamp-1">{description}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#1B2D4F]/6">
          <div className="flex items-baseline gap-1">
            <span className="text-[#1B2D4F]/45 text-xs">from</span>
            <span
              className="text-[#1B2D4F] font-bold text-xl"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              {priceKRW.toLocaleString('ko-KR')}
            </span>
            <span className="text-[#1B2D4F]/45 text-xs">원~</span>
          </div>

          <a
            href={`/tour/${id}`}
            onClick={(e) => { e.stopPropagation() }}
            className="inline-flex items-center gap-1.5 bg-[#1B2D4F] hover:bg-[#2a4170] text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors duration-200 group/btn"
          >
            자세히 보기
            <svg
              className="w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
