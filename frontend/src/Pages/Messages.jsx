import { MessageSquarePlus, SlidersHorizontal } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import Conversation from "../Components/features/Conversation"
import Conversations from "../Components/features/Conversations"
import SearchBar from "../Components/features/SearchBar"
import { authApi, messageApi, userApi } from "../lib/api"

const Messages = () => {
  const [search, setSearch] = useState("")
  const [conversations, setConversations] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [mobileConversationOpen, setMobileConversationOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [people, setPeople] = useState([])
  const [loadingPeople, setLoadingPeople] = useState(false)

  useEffect(() => {
    const loadInbox = async () => {
      try {
        const [{ data: user }, { data }] = await Promise.all([authApi.profile(), messageApi.conversations()])
        setCurrentUser(user)
        const formatted = data.map(({ id, partner, lastMessage, updatedAt }) => ({
          id: id.toString(),
          partnerId: partner._id.toString(),
          participants: [user._id.toString(), partner._id.toString()],
          participantNames: { [partner._id]: partner.fullname },
          participantAvatars: { [partner._id]: partner.profilePic || "https://avatar.iran.liara.run/public" },
          lastMessage: lastMessage?.message || "Start a conversation",
          lastMessageTime: lastMessage?.createdAt || updatedAt,
          unreadCount: 0,
          itemTitle: "Campus conversation",
          itemImage: partner.profilePic || "https://avatar.iran.liara.run/public",
        }))
        setConversations(formatted)
        setActiveId(formatted[0]?.id || null)
      } catch (error) {
        toast.error(error.response?.data?.message || "Please sign in to view your messages")
      } finally {
        setLoading(false)
      }
    }
    loadInbox()
  }, [])

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return conversations
    return conversations.filter((conversation) => [conversation.participantNames[conversation.partnerId], conversation.lastMessage]
      .some((value) => value.toLowerCase().includes(query)))
  }, [conversations, search])

  const activeConversation = conversations.find((conversation) => conversation.id === activeId)
  const selectConversation = (id) => { setActiveId(id); setMobileConversationOpen(true) }
  const openNewMessage = async () => {
    setShowNewMessage(true)
    if (people.length) return
    setLoadingPeople(true)
    try { const { data } = await userApi.list(); setPeople(data) } catch { toast.error("Could not load campus users") } finally { setLoadingPeople(false) }
  }
  const startConversation = (person) => {
    const existing = conversations.find((conversation) => conversation.partnerId === person._id)
    const conversation = existing || { id: `new-${person._id}`, partnerId: person._id, participants: [currentUser._id, person._id], participantNames: { [person._id]: person.fullname }, participantAvatars: { [person._id]: person.profilePic || "https://avatar.iran.liara.run/public" }, lastMessage: "Start a conversation", lastMessageTime: new Date().toISOString(), unreadCount: 0, itemTitle: "Campus conversation", itemImage: person.profilePic || "https://avatar.iran.liara.run/public" }
    if (!existing) setConversations((current) => [conversation, ...current])
    setActiveId(conversation.id); setMobileConversationOpen(true); setShowNewMessage(false)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl animate-fade-in">
        <div className="mb-5 flex items-end justify-between gap-4 px-1"><div><p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">UniFind inbox</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h1><p className="mt-1 text-sm text-muted-foreground">Connect safely with your campus community.</p></div><button onClick={openNewMessage} className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-blue-500/40 hover:text-foreground sm:flex"><MessageSquarePlus className="h-4 w-4" /> New message</button></div>
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/20 lg:grid lg:h-[calc(100vh-12.5rem)] lg:min-h-155 lg:grid-cols-[360px_1fr]">
          <aside className={`${mobileConversationOpen ? "hidden lg:flex" : "flex"} min-h-155 flex-col border-r border-border/80 bg-card`}><div className="border-b border-border/80 p-4"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-base font-bold">Inbox</h2><p className="mt-0.5 text-xs text-muted-foreground">{conversations.length} conversations</p></div><SlidersHorizontal className="h-4 w-4 text-muted-foreground" /></div><SearchBar value={search} onChange={setSearch} /></div>{loading ? <p className="p-6 text-sm text-muted-foreground">Loading conversations…</p> : <Conversations conversations={filteredConversations} activeId={activeId} onSelect={selectConversation} />}</aside>
          <div className={`${mobileConversationOpen ? "flex" : "hidden lg:flex"} min-w-0`}>{activeConversation && currentUser ? <Conversation key={activeConversation.id} conversation={activeConversation} currentUser={currentUser} onBack={() => setMobileConversationOpen(false)} /> : <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Select a conversation to start messaging.</div>}</div>
        </div>
        {showNewMessage && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={() => setShowNewMessage(false)}><div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-border p-4"><div><h2 className="font-bold">New message</h2><p className="text-xs text-muted-foreground">Choose a campus user to chat with.</p></div><button onClick={() => setShowNewMessage(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary">×</button></div><div className="max-h-96 overflow-y-auto p-2">{loadingPeople ? <p className="p-4 text-sm text-muted-foreground">Loading users…</p> : people.map((person) => <button key={person._id} onClick={() => startConversation(person)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-secondary"><img src={person.profilePic || "https://avatar.iran.liara.run/public"} alt="" className="h-10 w-10 rounded-xl object-cover" /><span><span className="block text-sm font-semibold">{person.fullname}</span><span className="block text-xs text-muted-foreground">{person.faculty || person.email}</span></span></button>)}{!loadingPeople && !people.length && <p className="p-4 text-sm text-muted-foreground">No other users are available yet.</p>}</div></div></div>}
      </div>
    </div>
  )
}

export default Messages
