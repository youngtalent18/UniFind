import { Search, X } from "lucide-react"

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        aria-label="Search conversations"
        className="w-full rounded-xl border border-border bg-background/60 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-muted-foreground/80 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10"
        placeholder="Search messages"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
