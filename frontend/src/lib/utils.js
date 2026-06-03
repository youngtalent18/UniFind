export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
  });
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function filterItems(
  items,
  query,
  category,
  status
) {
  return items.filter((item) => {
    if (query) {
      const q = query.toLowerCase();

      if (
        !item.title.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.tags.some((t) =>
          t.toLowerCase().includes(q)
        ) &&
        !item.category.toLowerCase().includes(q) &&
        !item.location.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (category && item.category !== category) {
      return false;
    }

    if (status && item.status !== status) {
      return false;
    }

    return true;
  });
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function statusBadgeClass(status) {
  switch (status) {
    case "active":
      return "badge-found";

    case "claimed":
      return "badge-claimed";

    case "recovered":
      return "badge-recovered";

    default:
      return "badge-found";
  }
}

export function statusLabel(status) {
  switch (status) {
    case "active":
      return "Active";

    case "claimed":
      return "Claimed";

    case "recovered":
      return "Recovered ✓";

    default:
      return status;
  }
}