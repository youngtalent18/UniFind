import { CalendarDays, MapPin, MessageCircle, ShieldCheck } from "lucide-react"

const formatDate = (date) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(date))

const ItemCard = ({ item }) => (
  <article className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
      <img src={item.images?.[0]} alt={item.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
      <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${item.type === "lost" ? "badge-lost" : "badge-found"}`}>{item.type}</span>
      {item.status !== "active" && <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold capitalize badge-${item.status}`}>{item.status}</span>}
    </div>
    <div className="p-4">
      <p className="mb-1 text-xs font-medium text-blue-400">{item.category}</p>
      <h2 className="line-clamp-1 text-base font-bold">{item.title}</h2>
      <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">{item.description}</p>
      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5 truncate"><MapPin className="h-3.5 w-3.5 shrink-0 text-blue-400" />{item.location}</p>
        <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-blue-400" />{formatDate(item.createdAt)}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2"><img src={item.reporterAvatar} alt="" className="h-6 w-6 rounded-full object-cover" /><span className="max-w-24 truncate text-xs text-muted-foreground">{item.reporterName}</span>{item.reporterId !== "current" && <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />}</div>
        <button className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/10"><MessageCircle className="h-3.5 w-3.5" />Details</button>
      </div>
    </div>
  </article>
)

export default ItemCard
