import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import { CATEGORIES, CATEGORY_ICONS, MOCK_ITEMS } from "../constants/mockData"
import ItemCard from "../Components/features/ItemCard"
import { itemApi } from "../lib/api"

const STATUS_OPTIONS = [{ value: "", label: "All status" }, { value: "active", label: "Active" }, { value: "claimed", label: "Claimed" }, { value: "recovered", label: "Recovered" }]

export default function FeedPage() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [items, setItems] = useState(MOCK_ITEMS)
  const type = params.get("type") || "all"
  const selectedCategory = params.get("category") || ""

  useEffect(() => {
    itemApi.list().then(({ data }) => {
      if (!data.length) return
      setItems(data.map((item) => ({ id: item._id, type: item.type, title: item.title, category: item.category, location: item.location, description: item.description, status: item.status, createdAt: item.createdAt, images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=450&fit=crop"], reporterId: item.reporter?._id, reporterName: item.reporter?.fullname || "Campus member", reporterAvatar: item.reporter?.profilePic || "https://avatar.iran.liara.run/public", tags: [] })))
    }).catch(() => {})
  }, [])

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    setParams(next)
  }
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesQuery = !query || [item.title, item.description, item.location, item.category, ...item.tags].some((value) => value.toLowerCase().includes(query))
      return matchesQuery && (type === "all" || item.type === type) && (!selectedCategory || item.category === selectedCategory) && (!status || item.status === status)
    })
  }, [items, search, type, selectedCategory, status])
  const clearFilters = () => { setSearch(""); setStatus(""); setParams({}) }
  const activeFilters = [type !== "all", selectedCategory, status, search].filter(Boolean).length
  const count = (itemType) => itemType === "all" ? items.length : items.filter((item) => item.type === itemType).length

  return <div className="mx-auto max-w-7xl animate-fade-in px-4 py-8 sm:px-6 lg:px-8">
    <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-400">Campus community</p><h1 className="mt-1 text-2xl font-bold">Lost & Found Feed</h1><p className="mt-1 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "item" : "items"} matching your search</p></div>
    <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1">{[["all", "All items"], ["lost", "Lost"], ["found", "Found"]].map(([value, label]) => <button key={value} onClick={() => setFilter("type", value === "all" ? "" : value)} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition ${type === value ? "bg-blue-500 text-white" : "border border-border bg-secondary/60 text-muted-foreground hover:text-foreground"}`}>{label} <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.5 text-xs">{count(value)}</span></button>)}</div>
    <div className="mb-6 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search item, location, or description…" className="w-full rounded-xl border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500/50" /></div><button onClick={() => setShowFilters((shown) => !shown)} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${showFilters ? "border-blue-500 bg-blue-500 text-white" : "border-border bg-secondary/60 text-muted-foreground hover:text-foreground"}`}><SlidersHorizontal className="h-4 w-4" />Filters {activeFilters > 0 && <span className="rounded-full bg-white/20 px-1.5 text-xs">{activeFilters}</span>}</button>{activeFilters > 0 && <button onClick={clearFilters} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10"><X className="h-4 w-4" />Clear</button>}</div>
    {showFilters && <div className="mb-6 rounded-2xl border border-border bg-card p-5 animate-fade-in"><div className="grid gap-5 sm:grid-cols-2"><FilterGroup label="Category">{[["", "All"], ...CATEGORIES.map((category) => [category, `${CATEGORY_ICONS[category]} ${category}`])].map(([value, label]) => <FilterButton key={value || "all"} selected={selectedCategory === value} onClick={() => setFilter("category", value)}>{label}</FilterButton>)}</FilterGroup><FilterGroup label="Status">{STATUS_OPTIONS.map((option) => <FilterButton key={option.value || "all"} selected={status === option.value} onClick={() => setStatus(option.value)}>{option.label}</FilterButton>)}</FilterGroup></div></div>}
    {filtered.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((item) => <ItemCard key={item.id} item={item} />)}</div> : <div className="rounded-2xl border border-dashed border-border py-20 text-center"><Search className="mx-auto h-9 w-9 text-muted-foreground" /><h2 className="mt-4 text-lg font-bold">No items found</h2><p className="mt-1 text-sm text-muted-foreground">Try a different search term or remove a filter.</p><button onClick={clearFilters} className="mt-4 text-sm font-semibold text-blue-400 hover:text-blue-300">Clear all filters</button></div>}
  </div>
}

const FilterGroup = ({ label, children }) => <div><p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p><div className="flex flex-wrap gap-2">{children}</div></div>
const FilterButton = ({ selected, onClick, children }) => <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${selected ? "border-blue-500 bg-blue-500 text-white" : "border-border bg-secondary text-muted-foreground hover:text-foreground"}`}>{children}</button>
