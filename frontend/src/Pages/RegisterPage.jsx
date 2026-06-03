import { ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false)
  const LEVELS = ['100', '200', '300', '400', '500', '600'];
  const FACULTIES = ['Engineering', 'Science', 'Business', 'Health Sciences', 'Arts'];




  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-white" />
          </Link>
          <h1 className="text-2xl font-bold mb-1">Join UniFind</h1>
          <p className="text-muted-foreground text-sm">Create your campus Lost & Found account</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <form className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input type="text" placeholder="e.g. Codecraze " required
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">School Email</label>
              <input type="text" placeholder="e.g. Codecraze " required
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                <p className="text-xs text-muted-foreground mt-1">Must be a valid @atu.edu.gh address</p>
            </div>
             <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Faculty</label>
                <select
                  className="w-full bg-gray-900/90 border border-border rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all">
                  <option value="">Select faculty</option>
                  {FACULTIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Level</label>
                <select
                  className="w-full bg-gray-900/90 border border-border rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all">
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} 
                  placeholder="Min. 6 characters" required
                  className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm pr-11 focus:outline-none focus:border-blue-500/50 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
              <input type="password" 
                placeholder="Repeat your password" required
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>

            {/* {error && (
              <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              </div>
            )} */}

            <button type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
              Create Account
            </button>
          </form>
           <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage