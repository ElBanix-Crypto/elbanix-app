import { useState } from "react";
import { BusinessProfile } from "../api/entities";

const steps = [
  { id: 1, title: "Business Info", icon: "🏪" },
  { id: 2, title: "Services & Hours", icon: "⏰" },
  { id: 3, title: "Your AI Setup", icon: "🤖" },
  { id: 4, title: "All Done!", icon: "🎉" },
];

const businessTypes = ["Salon & Spa", "Restaurant", "Fashion Vendor", "Fitness Coach", "Photographer", "Clinic", "Other"];

const serviceTemplates = {
  "Salon & Spa": "Hair Styling - ₦3,000 | Braiding - ₦5,000 | Makeup - ₦8,000 | Nails - ₦2,500 | Facial - ₦4,000",
  "Restaurant": "Jollof Rice - ₦1,500 | Fried Rice - ₦1,500 | Pepper Soup - ₦2,500 | Grilled Fish - ₦3,500 | Small Chops - ₦2,000",
  "Fitness Coach": "1-on-1 Session - ₦5,000 | Group Class - ₦2,000 | Monthly Plan - ₦30,000 | Diet Consultation - ₦3,000",
  "Photographer": "Portrait Shoot - ₦15,000 | Event Coverage - ₦50,000 | Product Photos - ₦20,000 | Passport Photos - ₦2,000",
  "Clinic": "General Consultation - ₦3,000 | Lab Test - ₦5,000 | Dental Checkup - ₦4,000 | Eye Test - ₦3,500",
  "Fashion Vendor": "Custom Dress - ₦15,000 | Ankara Outfit - ₦10,000 | Suit - ₦25,000 | Alterations - ₦3,000",
  "Other": "",
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);

  const [info, setInfo] = useState({
    business_name: "", owner_name: "", phone: "", whatsapp: "", address: "", city: "", business_type: "Salon & Spa"
  });
  const [details, setDetails] = useState({
    opening_hours: "Monday - Saturday: 8am - 8pm, Sunday: 10am - 5pm",
    services: serviceTemplates["Salon & Spa"],
    welcome_message: ""
  });
  const [aiSetup, setAiSetup] = useState({ telegram_username: "" });

  function handleTypeChange(type) {
    setInfo(prev => ({ ...prev, business_type: type }));
    setDetails(prev => ({ ...prev, services: serviceTemplates[type] || "" }));
  }

  function generateWelcome() {
    const name = info.business_name || "our business";
    return `👋 Hi! Welcome to ${name}, powered by *ElBanix AI* 🤖✨\nI'm your smart booking assistant. I can help you book an appointment, check our services & prices, or answer any questions. How can I help you today?`;
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const welcome = details.welcome_message || generateWelcome();
      const record = await BusinessProfile.create({
        ...info,
        ...details,
        ...aiSetup,
        welcome_message: welcome,
        status: "Pending"
      });
      setSaved(record);
      setStep(4);
    } catch (e) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: "1.5px solid #e9d5ff", fontSize: 15, boxSizing: "border-box",
    outline: "none", fontFamily: "inherit"
  };
  const labelStyle = { fontSize: 13, fontWeight: 700, color: "#555", display: "block", marginBottom: 6 };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#fdf4ff", color: "#1a1a2e" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 22, color: "white" }}>🤖 ElBanix</div>
        <p style={{ color: "rgba(255,255,255,0.8)", margin: "4px 0 0", fontSize: 13 }}>Set up your AI booking assistant</p>
      </div>

      {/* Progress Steps */}
      <div style={{ background: "white", padding: "20px 24px", borderBottom: "1px solid #f0e6ff" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, maxWidth: 600, margin: "0 auto" }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                  background: step > s.id ? "#22c55e" : step === s.id ? "linear-gradient(135deg, #9333ea, #ec4899)" : "#f0e6ff",
                  color: step >= s.id ? "white" : "#9333ea",
                  fontWeight: 700, transition: "all 0.3s"
                }}>
                  {step > s.id ? "✓" : s.icon}
                </div>
                <div style={{ fontSize: 11, color: step === s.id ? "#9333ea" : "#aaa", marginTop: 4, fontWeight: step === s.id ? 700 : 400, textAlign: "center" }}>
                  {s.title}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: 2, flex: 0.5, background: step > s.id ? "#22c55e" : "#f0e6ff", marginBottom: 20, transition: "all 0.3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div style={{ maxWidth: 560, margin: "32px auto", padding: "0 16px" }}>

        {/* STEP 1 — Business Info */}
        {step === 1 && (
          <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 24px rgba(147,51,234,0.08)" }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, margin: "0 0 6px", color: "#1a1a2e" }}>🏪 Tell us about your business</h2>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>This information helps us set up your AI agent correctly.</p>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Business Type</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {businessTypes.map(type => (
                  <button key={type} onClick={() => handleTypeChange(type)} style={{
                    padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                    background: info.business_type === type ? "linear-gradient(135deg, #9333ea, #ec4899)" : "#f0e6ff",
                    color: info.business_type === type ? "white" : "#9333ea",
                    transition: "all 0.2s"
                  }}>{type}</button>
                ))}
              </div>
            </div>

            {[
              ["business_name", "Business Name", "text", "e.g. Glam Touch Salon"],
              ["owner_name", "Your Full Name", "text", "e.g. Amaka Johnson"],
              ["phone", "Phone Number", "tel", "e.g. 0801 234 5678"],
              ["whatsapp", "WhatsApp Number (if different)", "tel", "Leave blank if same as phone"],
              ["address", "Business Address", "text", "e.g. 12 Allen Avenue, Ikeja"],
              ["city", "City", "text", "e.g. Lagos"],
            ].map(([field, label, type, placeholder]) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={placeholder} value={info[field]}
                  onChange={e => setInfo({ ...info, [field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#9333ea"}
                  onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
              </div>
            ))}

            <button onClick={() => {
              if (!info.business_name || !info.owner_name || !info.phone) {
                alert("Please fill in Business Name, Your Name, and Phone Number.");
                return;
              }
              setStep(2);
            }} style={{ width: "100%", background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", border: "none", borderRadius: 12, padding: "15px", fontWeight: 800, fontSize: 16, cursor: "pointer", marginTop: 8 }}>
              Next → Services & Hours
            </button>
          </div>
        )}

        {/* STEP 2 — Services & Hours */}
        {step === 2 && (
          <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 24px rgba(147,51,234,0.08)" }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, margin: "0 0 6px" }}>⏰ Services & Hours</h2>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Your AI agent will use this information to answer customer questions.</p>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Opening Hours</label>
              <input type="text" value={details.opening_hours}
                onChange={e => setDetails({ ...details, opening_hours: e.target.value })}
                style={inputStyle} placeholder="e.g. Monday - Saturday: 8am - 8pm"
                onFocus={e => e.target.style.borderColor = "#9333ea"}
                onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Services & Prices</label>
              <p style={{ color: "#aaa", fontSize: 12, marginBottom: 8 }}>We've prefilled based on your business type. Edit as needed. Format: Service Name - ₦Price | Next Service - ₦Price</p>
              <textarea value={details.services}
                onChange={e => setDetails({ ...details, services: e.target.value })}
                rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                onFocus={e => e.target.style.borderColor = "#9333ea"}
                onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Custom Welcome Message (Optional)</label>
              <p style={{ color: "#aaa", fontSize: 12, marginBottom: 8 }}>Leave blank and we'll auto-generate one for you ✨</p>
              <textarea value={details.welcome_message} placeholder={generateWelcome()}
                onChange={e => setDetails({ ...details, welcome_message: e.target.value })}
                rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                onFocus={e => e.target.style.borderColor = "#9333ea"}
                onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: "#f0e6ff", color: "#9333ea", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={() => {
                if (!details.services) { alert("Please add at least one service."); return; }
                setStep(3);
              }} style={{ flex: 2, background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                Next → AI Setup
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — AI Setup */}
        {step === 3 && (
          <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", boxShadow: "0 4px 24px rgba(147,51,234,0.08)" }}>
            <h2 style={{ fontWeight: 800, fontSize: 22, margin: "0 0 6px" }}>🤖 Connect Your AI Agent</h2>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Let's connect your ElBanix AI to Telegram so customers can start booking.</p>

            {/* Telegram instructions */}
            <div style={{ background: "#fdf4ff", borderRadius: 16, padding: 20, marginBottom: 24, border: "1.5px solid #e9d5ff" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, color: "#9333ea" }}>📱 How to get your Telegram Bot</h3>
              {[
                "Open Telegram and search for @BotFather",
                "Send /newbot and follow the prompts",
                'Choose a name like "YourBusiness Bot"',
                'Choose a username ending in "bot" e.g. glamtouchsalon_bot',
                "BotFather will give you a token — copy it",
                "Share the token with us below or via WhatsApp"
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", borderRadius: "50%", minWidth: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Your Telegram Bot Username (Optional for now)</label>
              <input type="text" placeholder="e.g. glamtouchsalon_bot" value={aiSetup.telegram_username}
                onChange={e => setAiSetup({ ...aiSetup, telegram_username: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#9333ea"}
                onBlur={e => e.target.style.borderColor = "#e9d5ff"} />
              <p style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>Don't have it yet? No problem — you can skip and we'll contact you on WhatsApp to complete the setup.</p>
            </div>

            {/* Preview */}
            <div style={{ background: "#fdf4ff", borderRadius: 16, padding: 20, marginBottom: 24, border: "1.5px dashed #d8b4fe" }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: "#9333ea", margin: "0 0 12px" }}>✨ Preview — What your customers will see:</p>
              <div style={{ background: "white", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#333", lineHeight: 1.7 }}>
                {details.welcome_message || generateWelcome()}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, background: "#f0e6ff", color: "#9333ea", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1 }}>
                {loading ? "Setting up..." : "🚀 Complete Setup"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Done! */}
        {step === 4 && (
          <div style={{ background: "white", borderRadius: 24, padding: "50px 32px", boxShadow: "0 4px 24px rgba(147,51,234,0.08)", textAlign: "center" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontWeight: 800, fontSize: 26, color: "#9333ea", margin: "0 0 12px" }}>You're all set!</h2>
            <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
              <strong>{info.business_name}</strong> is now registered on ElBanix! 🚀<br />
              Our team will contact you on <strong>{info.phone}</strong> within 24 hours to finish connecting your WhatsApp & Telegram bot.
            </p>

            <div style={{ background: "#fdf4ff", borderRadius: 16, padding: 20, marginBottom: 28, textAlign: "left" }}>
              <p style={{ fontWeight: 700, color: "#9333ea", margin: "0 0 12px", fontSize: 14 }}>📋 Your Setup Summary</p>
              {[
                ["Business", info.business_name],
                ["Owner", info.owner_name],
                ["Type", info.business_type],
                ["Phone", info.phone],
                ["City", info.city],
              ].map(([label, value]) => value && (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0e6ff", fontSize: 14 }}>
                  <span style={{ color: "#888" }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://t.me/Elbanix_bot" target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "linear-gradient(135deg, #9333ea, #ec4899)", color: "white", padding: "14px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14, display: "block" }}>
                💬 Test on Telegram
              </a>
              <a href="/Landing" style={{ flex: 1, background: "#f0e6ff", color: "#9333ea", padding: "14px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14, display: "block" }}>
                ← Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
