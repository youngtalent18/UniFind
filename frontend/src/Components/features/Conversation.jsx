import { ArrowLeft, CheckCheck, CircleEllipsis, ImagePlus, Info, MoreHorizontal, Paperclip, Send, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import toast from "react-hot-toast"
import { messageApi } from "../../lib/api"

const formatMessageTime = (timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })

const Conversation = ({ conversation, currentUser, onBack }) => {
  const [draft, setDraft] = useState("")
  const [localMessages, setLocalMessages] = useState([])
  const partnerId = conversation.partnerId
  const name = conversation.participantNames[partnerId]
  const avatar = conversation.participantAvatars[partnerId]

  useEffect(() => {
    let mounted = true
    messageApi.messages(partnerId).then(({ data }) => {
      if (mounted) setLocalMessages(data)
    }).catch(() => toast.error("Could not load messages"))

    const socketUrl = (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(/\/api\/?$/, "")
    const socket = io(socketUrl, { withCredentials: true })
    socket.emit("join", currentUser._id)
    socket.on("newMessage", (message) => setLocalMessages((messages) => [...messages, message]))
    return () => { mounted = false; socket.disconnect() }
  }, [currentUser._id, partnerId])

  const sendMessage = async (event) => {
    event.preventDefault()
    const content = draft.trim()
    if (!content) return

    try {
      const { data } = await messageApi.send(partnerId, content)
      setLocalMessages((current) => [...current, data])
      setDraft("")
    } catch (error) {
      toast.error(error.response?.data?.error || "Message could not be sent")
    }
  }

  return (
    <section className="flex min-h-155 flex-1 flex-col bg-card lg:min-h-0">
      <header className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5 sm:px-5">
        <button onClick={onBack} className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden" aria-label="Back to conversations">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative">
          <img src={avatar} alt={name} className="h-10 w-10 rounded-xl object-cover" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-sm font-semibold">{name}</h2>
            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-400" />
          </div>
          <p className="text-xs text-emerald-400">Active now</p>
        </div>
        <button className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Conversation information"><Info className="h-5 w-5" /></button>
        <button className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="More options"><MoreHorizontal className="h-5 w-5" /></button>
      </header>

      <div className="border-b border-border/80 bg-secondary/25 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-2.5">
          <img src={conversation.itemImage} alt="" className="h-10 w-10 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Conversation about</p>
            <p className="truncate text-xs font-semibold">{conversation.itemTitle}</p>
          </div>
          <button className="rounded-lg px-2 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/10">View item</button>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_32%)] px-4 py-5 sm:px-5">
        <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-border/70" /><span className="text-[11px] font-medium text-muted-foreground">Today</span><span className="h-px flex-1 bg-border/70" /></div>
        {localMessages.map((message) => {
          const isMine = message.senderId?.toString() === currentUser._id.toString()
          return (
            <div key={message.id} className={`flex gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
              {!isMine && <img src={avatar} alt="" className="mt-auto h-7 w-7 rounded-lg object-cover" />}
              <div className={`max-w-[82%] sm:max-w-[70%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-5 ${isMine ? "rounded-br-md bg-blue-500 text-white shadow-lg shadow-blue-500/10" : "rounded-bl-md border border-border/70 bg-secondary/80 text-foreground"}`}>
                  {message.message}
                </div>
                <span className="flex items-center gap-1 px-1 text-[10px] text-muted-foreground">
                  {formatMessageTime(message.createdAt)}
                  {isMine && <CheckCheck className="h-3.5 w-3.5" />}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={sendMessage} className="border-t border-border/80 bg-card px-4 py-3 sm:px-5">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-secondary/40 p-1.5 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10">
          <button type="button" className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-blue-400" aria-label="Attach file"><Paperclip className="h-4.5 w-4.5" /></button>
          <button type="button" className="rounded-xl p-2 text-muted-foreground transition hover:bg-secondary hover:text-blue-400" aria-label="Attach image"><ImagePlus className="h-4.5 w-4.5" /></button>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(event) } }} rows="1" placeholder={`Message ${name.split(" ")[0]}...`} className="max-h-24 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
          <button type="submit" disabled={!draft.trim()} className="rounded-xl bg-blue-500 p-2.5 text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message"><Send className="h-4 w-4" /></button>
        </div>
        <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground"><CircleEllipsis className="h-3 w-3" /> Keep conversations on UniFind for your safety.</p>
      </form>
    </section>
  )
}

export default Conversation
