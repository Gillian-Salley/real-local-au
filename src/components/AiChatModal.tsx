import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react'

type Message = {
  id: number
  role: 'bot' | 'user'
  text: string
}

const MOCK_REPLIES = [
  '좋은 질문이에요! 시드니에서 가장 인기 있는 코스는 하버브리지 & 록스 골목 투어입니다. 현지 워홀러 가이드가 직접 안내해드려요. 관심 있으시면 상세 페이지를 확인해보세요 😊',
  '멜버른 투어는 레인 웨이즈 커피 투어를 추천드려요. 유학생 가이드와 함께 진짜 멜버른 골목 문화를 경험할 수 있어요!',
  '그레이트 배리어 리프 투어는 케언즈에서 출발하며, 스노클링 장비 풀세트 포함이에요. 해양생물학 전공 가이드가 직접 안내해드립니다 🐠',
  '예약은 각 투어 상세 페이지의 예약 폼을 통해 문의하시면 돼요. 가이드가 24시간 내로 연락드립니다!',
  '투어 가격은 1인 기준 65,000원부터 시작해요. 소규모 그룹으로 운영되어 더 개인적인 경험이 가능합니다.',
]

let replyIdx = 0

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'bot',
    text: '안녕하세요! 🇦🇺 AusRealTour AI 상담사입니다.\n호주 투어 관련 궁금한 점을 무엇이든 물어보세요.',
  },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function AiChatModal({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 320)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Mock reply — replace with actual API call when ready
    setTimeout(() => {
      const reply = MOCK_REPLIES[replyIdx % MOCK_REPLIES.length]
      replyIdx++
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }])
      setIsTyping(false)
    }, 900)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    send()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) send()
  }

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        className={`fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          fixed z-[60] flex flex-col bg-[#FDFAF6] shadow-2xl overflow-hidden
          transition-all duration-300 ease-out
          inset-0 lg:inset-auto lg:bottom-24 lg:right-6
          lg:w-[380px] lg:h-[560px] lg:rounded-2xl lg:border lg:border-[#1B2D4F]/10
          ${open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
          }
        `}
        style={{ fontFamily: 'Pretendard, system-ui, sans-serif' }}
      >
        {/* Header */}
        <div className="bg-[#1B2D4F] px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#C4603A] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">AI 여행 상담</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/50 text-[10px]">온라인</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick prompts */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0 border-b border-[#1B2D4F]/6">
          {['시드니 추천', '저렴한 투어', '가족 여행', '워홀 코스'].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); inputRef.current?.focus() }}
              className="shrink-0 bg-[#1B2D4F]/6 hover:bg-[#1B2D4F]/12 text-[#1B2D4F] text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-[#1B2D4F] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#C4603A] text-[10px] font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>A</span>
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'bot'
                    ? 'bg-white border border-[#1B2D4F]/8 text-[#1B2D4F] rounded-tl-sm'
                    : 'bg-[#1B2D4F] text-white rounded-tr-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1B2D4F] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#C4603A] text-[10px] font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>A</span>
              </div>
              <div className="bg-white border border-[#1B2D4F]/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#1B2D4F]/30 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.9s' }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 px-4 py-3 border-t border-[#1B2D4F]/8 flex gap-2.5 items-center bg-white"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 점을 입력하세요..."
            className="flex-1 bg-[#F5EFE6] border border-[#1B2D4F]/10 rounded-full px-4 py-2.5 text-sm text-[#1B2D4F] placeholder:text-[#1B2D4F]/35 focus:outline-none focus:border-[#1B2D4F]/30 focus:ring-2 focus:ring-[#1B2D4F]/6 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#C4603A] hover:bg-[#D97A56] disabled:bg-[#1B2D4F]/15 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shrink-0"
            aria-label="전송"
          >
            <svg className="w-4 h-4 text-white translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
