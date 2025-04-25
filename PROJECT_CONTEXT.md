# 🚀 Multi-SaaS Automation Platform — Project Base

## 📘 Project Context

I’m building a **multi-SaaS platform in Next.js (TypeScript)** with MongoDB.  
Each SaaS product will focus on automating a specific business workflow using **n8n** as the automation engine.  
Everything will be built with reuse in mind: same design system, same homepage template — only the use-case and copy will change.

Each micro-SaaS will target specific sectors such as:

- 👨‍🔧 **Artisans** (plumbers, electricians, locksmiths)
- 💆 **Appointment-based businesses** (hairdressers, massage, doctors, restaurants)
- 👨‍💻 **Freelancers / Small agencies**

The first version focuses on **automated invoice generation** and **payment reminders**.

---

## 🔧 MVP Goals

### ✅ Core Features

1. **Invoice Creation**
   - Customizable fields (client name, company, tax info)
   - Logo upload + company identity
   - Line items with quantity, unit price
   - VAT & total price calculation
   - Auto-generated invoice reference, date, due date
   - PDF export via Puppeteer

2. **Automatic Email Sending**
   - Send invoice as PDF via Resend or Gmail API
   - Custom email templates

3. **Payment Follow-up Automation**
   - Detect unpaid invoices after X days (e.g. 15)
   - Send reminder email to client
   - Automation via **n8n** (cron / webhook / date trigger)

4. **User Interface**
   - Dashboard with invoice statuses (sent, paid, overdue)
   - Invoice detail page
   - Manual update of payment status
   - Overview of client payment behavior

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: tRPC or REST
- **Database**: MongoDB (Atlas)
- **Automation**: n8n (self-hosted)
- **PDF Generation**: Puppeteer (server-side HTML to PDF)
- **Email**: Resend or Gmail API
- **Auth**: NextAuth.js with Google / Apple / GitHub

---

## 🔄 Future SaaS Variations

### 🔧 **For Artisans**
- Auto-generate PDF quotes after lead form
- Send SMS after job for Google Review
- Urgency form → alert by SMS
- Auto photo storage (before/after) per job
- Calendar sync with Google

### 💆 **For Appointment-based businesses**
- SMS/Email reminders before appointments
- Auto-send feedback forms post-visit
- Dashboard: monthly clients, no-show rate
- Alert if occupation rate drops

### 👨‍💻 **For Freelancers / Agencies**
- Weekly SEO & analytics reports (via API)
- Slack/email alert for unpaid invoices
- Meeting summary automation (Zoom → GPT → Email)
- Cloud backup to Google Drive / Notion

---
## 🧩 Charte Graphique du Projet

### 🎨 Couleurs

- **Primaire** : #F97316 (orange)
- **Secondaire** : #1F2937 (gris foncé)
- **Fond principal** : #FFFFFF (blanc pur)
- **Fond alternatif** : #FFF7ED (blanc orangé)
- **Texte noir** : #000000

### 🔤 Polices (Google Fonts)

- **Texte général (body)** : Inter
- **Titres élégants / soulignements** : Playfair Display
- **Alternative moderne type Degular** : Space Grotesk

### 💡 Design System

- **Cards, inputs, boutons** : arrondis, ombres douces
- **Structure landing page** : one-page scroll avec AppBar fixe
- **Illustrations & Emojis** : discrets, si public non corporate
- **Logo** : abstrait, simple (ex: points reliés ou anneaux), couleurs projet

---

## 🗂️ Next Steps

- [ ] Build dynamic invoice form (client/company/lines)
- [ ] Create HTML template for invoice → export to PDF
- [ ] Connect MongoDB for storage
- [ ] Implement Resend for emails
- [ ] Add automation triggers in n8n
- [ ] Design landing page (reusable template for all SaaS)
- [ ] Logo creation & favicon
- [ ] Setup onboarding & auth

