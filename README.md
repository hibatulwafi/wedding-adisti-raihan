# The Wedding of Adisti & Raihan 🤍🕊️

Digital wedding invitation website for **Adisti Apriyanti** and **Ahmad Raihan Aghniansyah**.

## 🌟 Features

- **Elegant Design:** Modern, clean, and romantic UI with glassmorphism effects and custom pastel color palette.
- **Parallax & Animations:** Smooth scrolling, floating flower petals, dynamic background images, and entry animations.
- **Responsive:** Fully optimized for both Mobile and Desktop views with a floating bottom navigation bar on mobile.
- **Interactive Map & Calendar:** Direct integration with Google Maps and Google Calendar to make it easy for guests to save the date and find the venue.
- **Digital Envelope / Gift:** Feature to easily copy bank account numbers and view the physical gift shipping address.
- **Real-time RSVP:** Guests can confirm their attendance and leave well wishes. Data is stored directly into Google Firebase Firestore.

## 💻 Tech Stack

- **Framework:** Vue 3 (Composition API)
- **Tooling:** Vite
- **Styling:** Tailwind CSS (v4)
- **Database:** Firebase Cloud Firestore
- **Deployment:** Vercel (Ready)

## 🚀 Local Development Setup

1. **Clone or Download the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Setup Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser:** Navigate to `http://localhost:5173`

## 📦 Build for Production

To create a production-ready build, run:
```bash
npm run build
```
The compiled files will be generated in the `dist/` directory.

## 🎨 Color Palette

- **Ivory/Cream:** `#F9E6D7`
- **Soft Peach:** `#FAA587`
- **Rose/Blush:** `#D45871`
- **Deep Red:** `#961005`
- **Maroon:** `#770C34`
- **Mahogany:** `#56130E`

---
*Created with love for Adisti & Raihan's special day.*
