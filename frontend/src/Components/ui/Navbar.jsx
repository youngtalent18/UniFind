import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {cn} from "../../lib/utils";
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";


export default function Navbar() {

  const isAuthenticated = true; // Replace with actual auth logic
  const currentUser = {
    name: "John Doe",
    email: "john.doe@example.com"
  };
  const unreadMessages = 3; // Replace with actual data
  const unreadNotifs = 5; // Replace with actual data
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* LOGO */}
          <Link
            to="/"
            className="flex flex-shrink-0 items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-500">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>

            <span className="hidden text-lg font-bold sm:block text-gradient">
              UniFind
            </span>
          </Link>

          {/* SEARCH */}
          <form
            className="relative hidden max-w-md flex-1 md:flex"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search lost or found items..."
              className="w-full rounded-xl border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-blue-500/50 focus:outline-none"
            />
          </form>

          {/* DESKTOP NAV */}
          <nav className="hidden shrink-0 items-center gap-1 md:flex">
            <Link
              to="/feed"
              className={cn(
                "nav-link rounded-lg px-3 py-2",
                isActive("/feed") && "bg-secondary/10 text-foreground"
              )}
            >
              Feed
            </Link>

            <Link
              to="/feed?type=lost"
              className="nav-link rounded-lg px-3 py-2"
            >
              Lost
            </Link>

            <Link
              to="/feed?type=found"
              className="nav-link rounded-lg px-3 py-2"
            >
              Found
            </Link>
          </nav>

          {/* ACTIONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/report"
                  className="hidden items-center gap-1.5 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400 sm:flex"
                >
                  <Plus className="h-4 w-4" />
                  Report
                </Link>

                <Link
                  to="/messages"
                  className="relative rounded-xl p-2.5 transition-colors hover:bg-secondary/60"
                >
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />

                  {unreadMessages > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white">
                      {unreadMessages}
                    </span>
                  )}
                </Link>

                <Link
                  to="/notifications"
                  className="relative rounded-xl p-2.5 transition-colors hover:bg-secondary/60"
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />

                  {unreadNotifs > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                      {unreadNotifs}
                    </span>
                  )}
                </Link>

                {/* PROFILE */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowProfileMenu(!showProfileMenu)
                    }
                    className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-secondary/60"
                  >
                    <img
                      src={
                        currentUser?.avatar ||
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop"
                      }
                      alt={currentUser?.name}
                      className="h-8 w-8 rounded-lg border border-blue-500/30 object-cover"
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/20">
                      <div className="border-b border-border px-4 py-3">
                        <p className="truncate text-sm font-semibold">
                          {currentUser?.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {currentUser?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() =>
                            setShowProfileMenu(false)
                          }
                          className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-secondary/60"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          My Profile
                        </Link>

                        {currentUser?.isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() =>
                              setShowProfileMenu(false)
                            }
                            className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-secondary/60"
                          >
                            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            Admin Panel
                          </Link>
                        )}

                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/");
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-400 transition-colors hover:bg-rose-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
                >
                  Join Now
                </Link>
              </>

            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2 hover:bg-secondary/60 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="mt-1 space-y-2 border-t border-border pb-4 pt-4 animate-fade-in md:hidden">
            <form
              className="relative mb-3"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search items..."
                className="w-full rounded-xl border border-border bg-secondary/60 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500/50 focus:outline-none"
              />
            </form>

            <Link
              to="/feed"
              className="block rounded-xl px-3 py-2.5 text-sm hover:bg-secondary/60"
            >
              Feed
            </Link>

            <Link
              to="/feed?type=lost"
              className="block rounded-xl px-3 py-2.5 text-sm hover:bg-secondary/60"
            >
              Lost Items
            </Link>

            <Link
              to="/feed?type=found"
              className="block rounded-xl px-3 py-2.5 text-sm hover:bg-secondary/60"
            >
              Found Items
            </Link>

            {isAuthenticated && (
              <Link
                to="/report"
                className="flex items-center gap-2 rounded-xl bg-blue-500 px-3 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Report an Item
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}