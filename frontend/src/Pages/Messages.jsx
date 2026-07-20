import { MessageSquarePlus, SlidersHorizontal } from "lucide-react"
import { useMemo, useState } from "react"
import Conversation from "../Components/features/Conversation"
import Conversations from "../Components/features/Conversations"
import SearchBar from "../Components/features/SearchBar"
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../constants/mockData"

const Messages = () => {
  const [search, setSearch] = useState("")
  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0]?.id ?? null)
  const [mobileConversationOpen, setMobileConversationOpen] = useState(false)

  const conversations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return MOCK_CONVERSATIONS
    return MOCK_CONVERSATIONS.filter((conversation) => {
      const partnerId = conversation.participants.find((id) => id !== "current")
      return [conversation.participantNames[partnerId], conversation.itemTitle, conversation.lastMessage]
        .some((value) => value.toLowerCase().includes(query))
    })
  }, [search])

  const activeConversation = MOCK_CONVERSATIONS.find((conversation) => conversation.id === activeId)
  const selectConversation = (id) => { setActiveId(id); setMobileConversationOpen(true) }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl animate-fade-in">
        <div className="mb-5 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">UniFind inbox</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h1>
            <p className="mt-1 text-sm text-muted-foreground">Connect safely with your campus community.</p>
          </div>
          <button className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-blue-500/40 hover:text-foreground sm:flex"><MessageSquarePlus className="h-4 w-4" /> New message</button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/20 lg:grid lg:h-[calc(100vh-12.5rem)] lg:min-h-155 lg:grid-cols-[360px_1fr]">
          <aside className={`${mobileConversationOpen ? "hidden lg:flex" : "flex"} min-h-155 flex-col border-r border-border/80 bg-card`}>
            <div className="border-b border-border/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div><h2 className="text-base font-bold">Inbox</h2><p className="mt-0.5 text-xs text-muted-foreground">{MOCK_CONVERSATIONS.reduce((total, conversation) => total + conversation.unreadCount, 0)} unread messages</p></div>
                <button className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Filter conversations"><SlidersHorizontal className="h-4 w-4" /></button>
              </div>
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <Conversations conversations={conversations} activeId={activeId} onSelect={selectConversation} />
          </aside>

          <div className={`${mobileConversationOpen ? "flex" : "hidden lg:flex"} min-w-0`}>
            {activeConversation ? <Conversation conversation={activeConversation} messages={MOCK_MESSAGES[activeConversation.id] ?? []} onBack={() => setMobileConversationOpen(false)} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
