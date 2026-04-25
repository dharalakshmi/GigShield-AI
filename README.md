# GigShield-AI - Protecting Food Delivery Partners

## 👥 Team Details
- Team Name: Zenith 
- Institution: Amrita Vishwa Vidhyapeetham
- Team Members:
  - Dhara Lakshmi Kusumanchi
  - Bommisetty Lakshmi Sowmya
  - Yalakanti Tanvi

---

## 🎯 Our Persona: Food Delivery Partners (Zomato/Swiggy)
- Age Group: 20–35 years  
- Average Daily Earnings: ₹800–₹1500  
- Key Risks:
  - Heavy Rain 🌧️
  - Extreme Heat 🌡️
  - High Pollution (AQI > 300) 😷  

---

## 🚨 Problem Statement
Delivery partners lose **20–30% of their income** due to external disruptions like weather conditions and environmental factors.  
Currently, there is **no income protection system**, forcing them to bear financial losses.

---

## 💡 Our Solution
GigShield-AI is an **AI-powered parametric insurance platform** that:

- Calculates **weekly premium dynamically**
- Detects disruptions using **real-time data**
- Triggers **automatic claims**
- Provides **instant payouts for income loss**

---

## 🔄 User Workflow

### 1. Onboarding
- User registers using phone number  
- Selects working location and delivery zones  
- Chooses weekly insurance plan  

### 2. Normal Week
- Weekly premium is auto-debited  
- User works normally without interruption  

### 3. Disruption Event
- System monitors external conditions via APIs  
- Example Trigger: Rainfall > 50mm  

### 4. Automatic Claim
- No manual request required  
- Claim is auto-initiated  

### 5. Instant Payout
- Compensation is credited instantly  
- Based on hours of income loss  

---

## 💰 Weekly Premium Model

Base Premium = ₹50/week  
Risk Multiplier = Zone Risk Score (0.5 – 2.0)  
Loyalty Discount = 5% (after 4 claim-free weeks)  

**Final Premium Formula:**

Final Premium = 50 × Risk Multiplier × (1 - Loyalty Discount)


**Example:**
₹50 × 1.5 × 0.95 = ₹71.25/week


---

## 🌦️ Parametric Triggers

| Trigger Type | Threshold | Payout |
|-------------|----------|--------|
| Heavy Rain | >50mm/day | ₹125/hour × hours lost |
| Extreme Heat | >40°C | ₹125/hour (12–4 PM) |
| Poor AQI | >300 AQI | ₹1000/day |
| Curfew/Strike | Zone restriction | ₹500 flat |

👉 Claims are triggered automatically based on these conditions.

---

## 🤖 AI Integration

### 1. Risk Prediction Model
- Uses historical weather + location data  
- Predicts weekly risk level  

### 2. Dynamic Pricing
- Adjusts premium based on predicted risk  

### 3. Fraud Detection
- Detects GPS spoofing  
- Identifies duplicate claims  
- Uses anomaly detection techniques  

---

## 📱 Platform Choice: Web Application

**Why Web App?**
- Easy access without installation  
- Faster development  
- Compatible across devices  

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **APIs:** OpenWeather API, AQI APIs (mock supported)  
- **AI/ML:** Python (Flask) / Basic ML models  

---

## 📊 Dashboard Features

### 👤 Worker Dashboard
- Weekly premium  
- Active coverage  
- Earnings protected  

### 🧑‍💼 Admin Dashboard
- Total users  
- Claims processed  
- Risk analytics  

---

## 📅 Development Plan (6 Weeks)

- **Week 1–2:** Ideation, UI design, API setup  
- **Week 3–4:** Premium calculation, claim automation  
- **Week 5–6:** Fraud detection, dashboard, payout system  

---

## 💡 Innovation Highlights

- Zero-touch claim process (fully automated)  
- AI-based dynamic pricing model  
- Real-time disruption monitoring  
- Focus on income protection (not health/vehicle insurance)  

---

## 🔗 GitHub Repository
abcd
