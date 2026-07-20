import { CheckCheck, Circle } from "lucide-react"

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const sameDay = date.toDateString() === now.toDateString()

  return sameDay
    ? date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : date.toLocaleDateString([], { month: "short", day: "numeric" })
}

const Conversations = ({ conversations, activeId, onSelect }) => {
  if (!conversations.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
          <Circle className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold">No conversations found</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">Try a different name or item title.</p>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
      {conversations.map((conversation) => {
        const isActive = conversation.id === activeId
        const partnerId = conversation.partnerId || conversation.participants.find((id) => id !== "current")
        const name = conversation.participantNames[partnerId]
        const avatar = conversation.participantAvatars[partnerId]

        return (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
              isActive ? "bg-blue-500/12 shadow-sm ring-1 ring-blue-500/20" : "hover:bg-secondary/70"
            }`}
          >
            <div className="relative shrink-0">
              <img src={avatar} alt="" className="h-11 w-11 rounded-xl object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className={`truncate text-sm font-semibold ${isActive ? "text-blue-100" : "text-foreground"}`}>{name}</p>
                <time className={`shrink-0 text-[11px] ${conversation.unreadCount ? "font-semibold text-blue-400" : "text-muted-foreground"}`}>
                  {formatTime(conversation.lastMessageTime)}
                </time>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                {!conversation.unreadCount && <CheckCheck className="h-3.5 w-3.5 shrink-0 text-blue-400" />}
                <p className={`truncate text-xs ${conversation.unreadCount ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {conversation.lastMessage}
                </p>
              </div>
              <p className="mt-1 truncate text-[11px] text-muted-foreground/75">Re: {conversation.itemTitle}</p>
            </div>
            {conversation.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">
                {conversation.unreadCount}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Conversations
