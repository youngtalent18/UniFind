import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../lib/api";
import { useAuthStore } from "../lib/authStore";

export default function LoginPage() {

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await authApi.login({ email, password });
      setUser(data.user);
      toast.success("Welcome back!");
      navigate("/feed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not sign in");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to={"/"}>
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
          </Link>

          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>

          <p className="text-muted-foreground text-sm">
            Sign in to your UniFind account
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                School Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="yourname@unilag.atu.gh"
                required
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm pr-11 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* {error && (
              <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-400">{error}</p>
              </div>
            )} */}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
               {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            No account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
