import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { doc, getDoc, setDoc, collection, getDocs, limit, query } from "firebase/firestore"
import { Shield, AlertCircle, Loader2, Lock, Mail } from "lucide-react"
import { cn } from "../lib/utils"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const userRef = doc(db, "users", res.user.uid)
      const userSnap = await getDoc(userRef)
      
      if (!userSnap.exists()) {
        const usersCol = collection(db, "users")
        const firstUserQuery = query(usersCol, limit(1))
        const existingUsers = await getDocs(firstUserQuery)
        const role = existingUsers.empty ? 'admin' : 'operator'
        
        await setDoc(userRef, {
          uid: res.user.uid,
          email: res.user.email,
          role: role,
          createdAt: new Date().toISOString()
        })
      }
    } catch (err: any) {
      console.error(err)
      setError("Authentication failed. Invalid terminal credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#090E14] relative overflow-hidden flex flex-col items-center justify-center p-6 text-[#E2E8F0]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-500 mx-auto mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <Shield className="w-10 h-10" fill="currentColor" fillOpacity={0.2} />
          </div>
          <h1 className="font-bold text-4xl mb-2 tracking-tight text-white uppercase">GaurdX</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Aerial Defense System</p>
        </div>

        <div className="bg-[#0F1720] border border-[#1E293B] rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Terminal ID</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#161F2A] border border-[#1E293B] rounded-xl px-12 py-3.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="OPERATOR@GAURDX.SEC"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold ml-1">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#161F2A] border border-[#1E293B] rounded-xl px-12 py-3.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-cyan-500 text-[#090E14] py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs hover:bg-cyan-400 transition-all flex items-center justify-center shadow-lg shadow-cyan-500/20",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Initiate Connection"}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest leading-relaxed">
            RESTRICTED ACCESS AREA<br />
            GLOBAL SURVEILLANCE PROTOCOL v4.12
          </p>
        </div>
      </div>
    </div>
  )
}
