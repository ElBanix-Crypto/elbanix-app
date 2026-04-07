import { useState, useEffect } from "react";
import { Booking, SalonInfo } from "../api/entities";

const statusColors = {
  Pending: "#FFA500",
  Confirmed: "#22c55e",
  Cancelled: "#ef4444",
  Completed: "#6366f1",
};

const serviceEmojis = {
  "Hair Styling": "💇‍♀️",
  Braiding: "🧵",
  Makeup: "💄",
  Nails: "💅",
  Facial: "🧖‍♀️",
};

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [salonInfo, setSalonInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_name: "", customer_phone: "", service: "Hair Styling", date: "", time: "", notes: "" });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [b, s] = await Promise.all([Booking.list(), SalonInfo.list()]);
    setBookings(b);
    setSalonInfo(s[0] || null);
    setLoading(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    await Booking.create({ ...form, status: "Pending" });
    setForm({ customer_name: "", customer_phone: "", service: "Hair Styling", date: "", time: "", notes: "" });
    setShowForm(false);
    loadData();
  }

  async function updateStatus(id, status) {
    await Booking.update(id, { status });
    loadData();
  }

  async function deleteBooking(id) {
    await Booking.delete(id);
    loadData();
  }

  const filtered = filter === "All" ? bookings : bookings.filter(b => b.status === filter);
  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter(b => b.date === today);
  const pending = bookings.filter(b => b.status === "Pending");
  const confirmed = bookings.filter(b => b.status === "Confirmed");

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#fdf4ff", color: "#1a1a2e" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", margin: 0, fontSize: 24, fontWeight: 700 }}>💅 {salonInfo?.business_name || "Glam Hub"}</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: "4px 0 0", fontSize: 13 }}>{salonInfo?.address}</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 16px", color: "white", fontSize: 13 }}>
          {salonInfo?.opening_hours?.split(",")[0]}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #f0e6ff", padding: "0 24px" }}>
        {["dashboard", "bookings", "info"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
            fontWeight: activeTab === tab ? 700 : 400,
            color: activeTab === tab ? "#9333ea" : "#666",
            borderBottom: activeTab === tab ? "3px solid #9333ea" : "3px solid transparent",
            textTransform: "capitalize", fontSize: 14
          }}>
            {tab === "dashboard" ? "📊 Dashboard" : tab === "bookings" ? "📅 Bookings" : "ℹ️ Salon Info"}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#9333ea", fontSize: 18 }}>Loading... ✨</div>
        ) : (
          <>
            {/* DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <div>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
                  {[
                    { label: "Total Bookings", value: bookings.length, icon: "📋", color: "#9333ea" },
                    { label: "Today", value: todayBookings.length, icon: "📅", color: "#ec4899" },
                    { label: "Pending", value: pending.length, icon: "⏳", color: "#FFA500" },
                    { label: "Confirmed", value: confirmed.length, icon: "✅", color: "#22c55e" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "white", borderRadius: 16, padding: "20px", boxShadow: "0 2px 12px rgba(147,51,234,0.08)", borderLeft: `4px solid ${s.color}` }}>
                      <div style={{ fontSize: 28 }}>{s.icon}</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: "#888" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Today's Bookings */}
                <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(147,51,234,0.08)" }}>
                  <h3 style={{ margin: "0 0 16px", color: "#9333ea" }}>📅 Today's Bookings</h3>
                  {todayBookings.length === 0 ? (
                    <p style={{ color: "#aaa", textAlign: "center", padding: 20 }}>No bookings today — enjoy the break! 😄</p>
                  ) : (
                    todayBookings.map(b => (
                      <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f9f0ff" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 24 }}>{serviceEmojis[b.service]}</span>
                          <div>
                            <div style={{ fontWeight: 600 }}>{b.customer_name}</div>
                            <div style={{ fontSize: 13, color: "#888" }}>{b.service} · {b.time}</div>
                          </div>
                        </div>
                        <span style={{ background: statusColors[b.status] + "22", color: statusColors[b.status], borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{b.status}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Services summary */}
                <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(147,51,234,0.08)", marginTop: 20 }}>
                  <h3 style={{ margin: "0 0 16px", color: "#9333ea" }}>💰 Services & Prices</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                    {salonInfo?.services?.split("|").map(s => {
                      const [name, price] = s.split("-").map(x => x.trim());
                      return (
                        <div key={name} style={{ background: "#fdf4ff", borderRadius: 12, padding: "14px", textAlign: "center" }}>
                          <div style={{ fontSize: 22 }}>{serviceEmojis[name] || "✨"}</div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{name}</div>
                          <div style={{ color: "#9333ea", fontWeight: 700, fontSize: 15 }}>{price}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(f => (
                      <button key={f} onClick={() => setFilter(f)} style={{
                        padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13,
                        background: filter === f ? "#9333ea" : "#f0e6ff",
                        color: filter === f ? "white" : "#9333ea",
                        fontWeight: filter === f ? 700 : 400
                      }}>{f}</button>
                    ))}
                  </div>
                  <button onClick={() => setShowForm(!showForm)} style={{
                    background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white",
                    border: "none", borderRadius: 12, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14
                  }}>+ New Booking</button>
                </div>

                {showForm && (
                  <form onSubmit={handleCreate} style={{ background: "white", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 2px 12px rgba(147,51,234,0.1)" }}>
                    <h3 style={{ margin: "0 0 16px", color: "#9333ea" }}>📝 New Booking</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[["customer_name", "Customer Name", "text"], ["customer_phone", "Phone Number", "text"], ["date", "Date", "date"], ["time", "Time", "time"]].map(([field, label, type]) => (
                        <div key={field}>
                          <label style={{ fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>{label}</label>
                          <input type={type} required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e9d5ff", fontSize: 14, boxSizing: "border-box" }} />
                        </div>
                      ))}
                      <div>
                        <label style={{ fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>Service</label>
                        <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e9d5ff", fontSize: 14 }}>
                          {["Hair Styling", "Braiding", "Makeup", "Nails", "Facial"].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>Notes</label>
                        <input type="text" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e9d5ff", fontSize: 14 }} placeholder="Optional notes" />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button type="submit" style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontWeight: 700 }}>Save Booking</button>
                      <button type="button" onClick={() => setShowForm(false)} style={{ background: "#f0e6ff", color: "#9333ea", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer" }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>No bookings found 📭</div>
                  ) : filtered.map(b => (
                    <div key={b.id} style={{ background: "white", borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 8px rgba(147,51,234,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <span style={{ fontSize: 28 }}>{serviceEmojis[b.service]}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{b.customer_name}</div>
                          <div style={{ fontSize: 13, color: "#888" }}>{b.service} · {b.date} at {b.time}</div>
                          <div style={{ fontSize: 13, color: "#aaa" }}>{b.customer_phone}{b.notes ? ` · ${b.notes}` : ""}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
                        <span style={{ background: statusColors[b.status] + "22", color: statusColors[b.status], borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{b.status}</span>
                        {b.status === "Pending" && (
                          <button onClick={() => updateStatus(b.id, "Confirmed")} style={{ background: "#22c55e", color: "white", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>✓ Confirm</button>
                        )}
                        {b.status === "Confirmed" && (
                          <button onClick={() => updateStatus(b.id, "Completed")} style={{ background: "#6366f1", color: "white", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>✓ Done</button>
                        )}
                        <button onClick={() => deleteBooking(b.id)} style={{ background: "#fef2f2", color: "#ef4444", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INFO TAB */}
            {activeTab === "info" && salonInfo && (
              <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(147,51,234,0.08)" }}>
                <h3 style={{ margin: "0 0 20px", color: "#9333ea" }}>🏪 Salon Details</h3>
                {[
                  ["💼 Business Name", salonInfo.business_name],
                  ["👤 Owner", salonInfo.owner_name],
                  ["📞 Phone", salonInfo.phone],
                  ["📍 Address", salonInfo.address],
                  ["🕐 Hours", salonInfo.opening_hours],
                  ["💬 Welcome Message", salonInfo.welcome_message],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: "1px solid #f9f0ff" }}>
                    <div style={{ minWidth: 160, fontSize: 14, color: "#888", fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#333" }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
