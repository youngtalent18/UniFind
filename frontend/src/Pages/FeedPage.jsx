import { useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { CATEGORIES, CATEGORY_ICONS } from "../constants/mockData.js";
import ItemCard from "../Components/features/ItemCard.jsx";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "claimed", label: "Claimed" },
  { value: "recovered", label: "Recovered" },
];

export default function FeedPage() {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = []; // This will be replaced with actual filtering logic based on the selected filters

  const clearFilters = () => {
    setStatus("");
    setType("all");
  };

  const activeFilters = [
    status,
    type !== "all" ? type : "",
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          Campus Lost & Found Feed
        </h1>

        <p className="text-muted-foreground text-sm">
          1 found
        </p>
      </div>

      {/* Type Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {[
          {
            value: "all",
            label: "All Items",
            count: 0, // This will be updated to show total count
          },
          {
            value: "lost",
            label: "🔴 Lost",
            count: 2,
          },
          {
            value: "found",
            label: "🔵 Found",
            count: 1,
          },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setType(tab.value);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
              type === tab.value
                ? "bg-blue-500 text-white"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {tab.label}

            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                type === tab.value
                  ? "bg-white/20"
                  : "bg-secondary"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-6">
        <form
          className="flex-1 relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search by item name, location, or description..."
            className="w-full bg-secondary/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </form>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            showFilters
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-secondary/60 border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />

          Filters

          {activeFilters > 0 && (
            <span className="w-4 h-4 bg-white/20 rounded-full text-[10px] flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </button>

        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 text-sm hover:bg-rose-500/10 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-card border border-border rounded-2xl p-5 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Category
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedCategory === "all"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedCategory === cat
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {CATEGORY_ICONS[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Status
              </label>

              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      status === opt.value
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-lg font-semibold mb-2">
            No items found
          </h3>

          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}