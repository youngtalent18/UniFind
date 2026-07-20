import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { CATEGORIES } from "../constants/mockData"
import { itemApi } from "../lib/api"

const inputClass = "w-full rounded-xl border border-border bg-secondary/60 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500/60"

const ReportPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ type: "lost", title: "", category: "", location: "", date: "", description: "" })
  const [submitting, setSubmitting] = useState(false)
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault(); setSubmitting(true)
    try { await itemApi.create(form); toast.success("Report published to the feed."); navigate("/feed") }
    catch (error) { toast.error(error.response?.data?.error || "Could not submit report") }
    finally { setSubmitting(false) }
  }
  return <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-400">Campus safety</p><h1 className="mt-1 text-3xl font-bold">Report an item</h1><p className="mt-2 text-sm text-muted-foreground">Share enough detail to help the right person recognise it—without revealing private identifiers.</p><form onSubmit={submit} className="mt-7 space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-7"><div className="grid grid-cols-2 gap-3">{["lost", "found"].map((type) => <button key={type} type="button" onClick={() => setForm((current) => ({ ...current, type }))} className={`rounded-xl border p-3 text-sm font-bold capitalize ${form.type === type ? "border-blue-500 bg-blue-500/15 text-blue-300" : "border-border bg-secondary text-muted-foreground"}`}>I {type} an item</button>)}</div><Field label="Item name"><input name="title" value={form.title} onChange={update} required placeholder="e.g. Black laptop backpack" className={inputClass} /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label="Category"><select name="category" value={form.category} onChange={update} required className={inputClass}><option value="">Select a category</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></Field><Field label="Where was it last seen / found?"><input name="location" value={form.location} onChange={update} required placeholder="e.g. Main library" className={inputClass} /></Field></div><Field label="Date"><input name="date" value={form.date} onChange={update} required type="date" className={inputClass} /></Field><Field label="Description"><textarea name="description" value={form.description} onChange={update} required rows="5" placeholder="Describe colour, brand, and other safe identifying details…" className={`${inputClass} resize-y`} /></Field><button disabled={submitting} className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60">{submitting ? "Publishing…" : "Submit report"}</button></form></div>
}
const Field = ({ label, children }) => <label className="block text-sm font-semibold"><span className="mb-1.5 block">{label}</span>{children}</label>
export default ReportPage
