import { useState } from "react";
import { WaitlistSignup } from "../api/entities";

const businesses = [
  { icon: "💇‍♀️", name: "Salons & Spas" },
  { icon: "🍽️", name: "Restaurants" },
  { icon: "👗", name: "Fashion Vendors" },
  { icon: "🏋️", name: "Fitness Coaches" },
  { icon: "📸", name: "Photographers" },
  { icon: "🏥", name: "Clinics" },
];

const features = [
  { icon: "🤖", title: "AI That Chats Like a Human", desc: "Your customers message on WhatsApp or Telegram and get instant, smart replies — 24/7, even while you sleep." },
  { icon: "📅", title: "Automatic Bookings", desc: "The AI collects customer details and books appointments automatically. No more back-and-forth messages." },
  { icon: "📊", title: "Live Dashboard", desc: "See all your bookings in one place. Confirm, complete, or cancel with one tap." },
  { icon: "⚡", title: "Set Up in Minutes", desc: "Just tell us your business name, services, and prices. We handle the rest." },
];

const testimonials = [
  { name: "Amaka O.", business: "Glam Touch Salon, Abuja", text: "Before ElBanix, I was replying WhatsApp messages till midnight. Now the AI handles everything. I just show up and do the work! 😍" },
  { name: "Chidi N.", business: "FitZone Gym, Lagos", text: "My clients book sessions at 2am and I wake up to a full schedule. ElBanix is a game changer for any serious business owner." },
  { name: "Temi A.", business: "Lush Beauty Studio, PH", text: "I was skeptical at first but within a week, I had 30 new bookings I would have missed. Worth every kobo!" },
];

export default function Landing() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", city: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await WaitlistSignup.create({ ...form, status: "New" });
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1a1a2e", background: "#fff", margin: 0, padding: 0 }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #f0e6ff", position: "sticky", top: 0, background: "white", zIndex: 100 }}>
        <div style={{ fontWeight: 800, fontSize: 22, background: "linear-gradient(135deg, #9333ea, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🤖 ElBanix
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#how" style={{ color: "#666", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>How it works</a>
          <a href="#pricing" style={{ color: "#666", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Pricing</a>
          <a href="#waitlist" style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", padding: "10px 22px", borderRadius: 30, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            Get Early Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 30, padding: "6px 18px", color: "white", fontSize: 13, marginBottom: 24, fontWeight: 600 }}>
          🇳🇬 Built for Nigerian Businesses
        </div>
        <h1 style={{ color: "white", fontSize: "clamp(32px, 6vw, 58px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.15 }}>
          Your Business Deserves<br />An AI Receptionist
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(16px, 2.5vw, 20px)", maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.7 }}>
          ElBanix connects to your WhatsApp & Telegram and handles customer bookings automatically — so you can focus on doing the actual work.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{ background: "white", color: "#9333ea", padding: "15px 36px", borderRadius: 30, textDecoration: "none", fontWeight: 800, fontSize: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
            Join the Waitlist 🚀
          </a>
          <a href="#how" style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "15px 36px", borderRadius: 30, textDecoration: "none", fontWeight: 600, fontSize: 16, border: "2px solid rgba(255,255,255,0.4)" }}>
            See How It Works
          </a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 24 }}>✅ No tech skills needed &nbsp;·&nbsp; ✅ Set up in minutes &nbsp;·&nbsp; ✅ Cancel anytime</p>

        {/* Hero visual */}
        <div style={{ marginTop: 60, background: "rgba(255,255,255,0.1)", borderRadius: 24, padding: 24, maxWidth: 360, margin: "60px auto 0", border: "1px solid rgba(255,255,255,0.2)" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "14px 16px", marginBottom: 10, textAlign: "left", color: "white", fontSize: 14 }}>
            👩 <strong>Customer:</strong> Hi, I want to book a facial for tomorrow
          </div>
          <div style={{ background: "white", borderRadius: 16, padding: "14px 16px", textAlign: "left", fontSize: 14, color: "#333" }}>
            🤖 <strong>ElBanix AI:</strong> Hi! 😊 A facial is ₦4,000. What time works for you tomorrow?
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "14px 16px", marginTop: 10, textAlign: "left", color: "white", fontSize: 14 }}>
            👩 <strong>Customer:</strong> 11am please. Name is Amaka, 08012345678
          </div>
          <div style={{ background: "white", borderRadius: 16, padding: "14px 16px", marginTop: 10, textAlign: "left", fontSize: 14, color: "#333" }}>
            🤖 <strong>ElBanix AI:</strong> ✅ Booked! See you tomorrow at 11am, Amaka!
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: "70px 24px", textAlign: "center", background: "#fdf4ff" }}>
        <p style={{ color: "#9333ea", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Who It's For</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 10px" }}>Works for Any Service Business</h2>
        <p style={{ color: "#888", marginBottom: 40 }}>If customers book you — ElBanix can automate it.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, maxWidth: 700, margin: "0 auto" }}>
          {businesses.map(s => (
            <div key={s.name} style={{ background: "white", borderRadius: 16, padding: "16px 24px", boxShadow: "0 2px 12px rgba(147,51,234,0.08)", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span> {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "70px 24px", textAlign: "center" }}>
        <p style={{ color: "#9333ea", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>How It Works</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 10px" }}>Up & Running in 3 Steps</h2>
        <p style={{ color: "#888", marginBottom: 48 }}>No developers. No tech stress. Just results.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, maxWidth: 900, margin: "0 auto" }}>
          {[
            { step: "1", icon: "📝", title: "Tell Us About Your Business", desc: "Fill in your business name, services, prices and working hours. Takes less than 5 minutes." },
            { step: "2", icon: "🔗", title: "Connect WhatsApp / Telegram", desc: "We link ElBanix AI to your number. Your customers keep messaging the same contact they already know." },
            { step: "3", icon: "🎉", title: "Sit Back & Get Bookings", desc: "ElBanix handles all customer chats and bookings automatically. You just show up and serve." },
          ].map(s => (
            <div key={s.step} style={{ background: "#fdf4ff", borderRadius: 24, padding: "36px 28px", maxWidth: 270, flex: "1 1 220px" }}>
              <div style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, margin: "0 auto 16px" }}>{s.step}</div>
              <div style={{ fontSize: 38, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, margin: "0 0 10px", fontSize: 17 }}>{s.title}</h3>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "70px 24px", background: "#fdf4ff", textAlign: "center" }}>
        <p style={{ color: "#9333ea", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Features</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 48px" }}>Everything You Need to Grow</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "white", borderRadius: 20, padding: "30px 26px", maxWidth: 260, flex: "1 1 220px", boxShadow: "0 2px 12px rgba(147,51,234,0.07)", textAlign: "left" }}>
              <div style={{ fontSize: 38, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, margin: "0 0 10px", fontSize: 16 }}>{f.title}</h3>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "70px 24px", textAlign: "center" }}>
        <p style={{ color: "#9333ea", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Testimonials</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 48px" }}>Business Owners Love It</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: "#fdf4ff", borderRadius: 20, padding: "28px 26px", maxWidth: 290, flex: "1 1 240px", textAlign: "left" }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#444", margin: "0 0 18px" }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#9333ea", marginTop: 2 }}>{t.business}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "70px 24px", background: "linear-gradient(135deg, #9333ea, #ec4899)", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Pricing</p>
        <h2 style={{ color: "white", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 10px" }}>Simple, Honest Pricing</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 50 }}>No hidden fees. No long contracts. Cancel anytime.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {[
            { plan: "Starter", price: "₦5,000", period: "/month", features: ["1 Telegram bot", "Up to 200 bookings/month", "Basic dashboard", "Email support"], highlight: false },
            { plan: "Pro", price: "₦10,000", period: "/month", features: ["WhatsApp + Telegram bot", "Unlimited bookings", "Full dashboard & analytics", "Priority support", "Custom AI personality"], highlight: true },
          ].map(p => (
            <div key={p.plan} style={{ background: p.highlight ? "white" : "rgba(255,255,255,0.12)", borderRadius: 24, padding: "40px 32px", minWidth: 240, maxWidth: 300, flex: "1 1 240px", border: p.highlight ? "none" : "2px solid rgba(255,255,255,0.3)" }}>
              {p.highlight && <div style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700, display: "inline-block", marginBottom: 14 }}>⭐ MOST POPULAR</div>}
              <div style={{ fontWeight: 800, fontSize: 18, color: p.highlight ? "#1a1a2e" : "white" }}>{p.plan}</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: p.highlight ? "#9333ea" : "white", margin: "10px 0 4px" }}>{p.price}</div>
              <div style={{ color: p.highlight ? "#888" : "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 24 }}>{p.period}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, color: p.highlight ? "#444" : "rgba(255,255,255,0.9)", fontSize: 14, textAlign: "left" }}>
                  <span style={{ color: p.highlight ? "#9333ea" : "white", fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <a href="#waitlist" style={{ display: "block", marginTop: 24, background: p.highlight ? "linear-gradient(135deg, #9333ea, #ec4899)" : "rgba(255,255,255,0.2)", color: "white", padding: "13px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section id="waitlist" style={{ padding: "90px 24px", textAlign: "center", background: "#fdf4ff" }}>
        <p style={{ color: "#9333ea", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Early Access</p>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: "0 0 12px" }}>Be First to Get ElBanix</h2>
        <p style={{ color: "#666", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.7 }}>Join the waitlist and get <strong>1 month FREE</strong> when we launch. Limited spots available — don't miss out.</p>

        {submitted ? (
          <div style={{ background: "white", borderRadius: 24, padding: "50px 40px", maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 24px rgba(147,51,234,0.12)" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontWeight: 800, fontSize: 24, color: "#9333ea", margin: "0 0 12px" }}>You're on the list!</h3>
            <p style={{ color: "#666", lineHeight: 1.7 }}>We'll reach out to you very soon on WhatsApp. Get ready to transform your business with ElBanix AI! 🚀</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: 24, padding: "40px 36px", maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 24px rgba(147,51,234,0.1)" }}>
            {[
              ["name", "Your Full Name", "text", "e.g. Amaka Johnson"],
              ["business", "Business Name", "text", "e.g. Glam Touch Salon"],
              ["phone", "WhatsApp Number", "tel", "e.g. 0801 234 5678"],
              ["city", "City", "text", "e.g. Lagos, Abuja, Port Harcourt"],
            ].map(([field, label, type, placeholder]) => (
              <div key={field} style={{ marginBottom: 18, textAlign: "left" }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 6 }}>{label}</label>
                <input type={type} required placeholder={placeholder} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                  style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e9d5ff", fontSize: 15, boxSizing: "border-box", outline: "none", transition: "border 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#9333ea"}
                  onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
              </div>
            ))}
            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", border: "none", borderRadius: 12, padding: "15px", fontWeight: 800, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, opacity: loading ? 0.8 : 1 }}>
              {loading ? "Joining..." : "Join Waitlist — It's Free 🚀"}
            </button>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 14 }}>No spam. We'll only contact you about ElBanix. 🔒</p>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e", color: "rgba(255,255,255,0.55)", textAlign: "center", padding: "32px 24px", fontSize: 13 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: "white", marginBottom: 10 }}>🤖 ElBanix</div>
        <p style={{ margin: "0 0 6px" }}>AI-powered booking automation for Nigerian businesses</p>
        <p style={{ margin: 0 }}>© 2026 ElBanix. All rights reserved. · Lagos, Nigeria</p>
      </footer>
    </div>
  );
}
