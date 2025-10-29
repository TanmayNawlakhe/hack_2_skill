<div align="center">

# 🧠 DocuLex AI

### AI-Powered Legal Document Analysis Platform

[![Version](https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000)](https://github.com/TanmayNawlakhe/hack_2_skill)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📑 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)

---

## 🎯 Introduction

**DocuLex AI** is an enterprise-grade, AI-powered legal document analysis platform that transforms how legal professionals and individuals interact with complex legal documents. By leveraging cutting-edge AI technology including Google's Gemini models and Retrieval-Augmented Generation (RAG), DocuLex provides instant, accurate, and contextual analysis of legal contracts, agreements, and documents.

### What Makes DocuLex Unique?

- 🔐 **Bank-Level Security**: Military-grade encryption for complete document confidentiality
- ⚡ **Instant Analysis**: Analyze complex legal documents in seconds with advanced AI
- 🎯 **Precision Insights**: RAG-powered analysis using VertexAI with legal reference materials
- 💬 **Interactive Chat**: Natural language conversations about your documents
- 📊 **Multi-Model Support**: Choose from multiple Gemini models for optimal performance
- 🎨 **Modern UI/UX**: Beautiful, responsive interface with dark mode support

---

## ✨ Features

### Core Capabilities

- **🤖 AI-Powered Document Analysis**
  - Support for multiple Gemini models (2.5 Pro, 2.0 Flash, 1.5 Pro, etc.)
  - Real-time document processing and analysis
  - Source citation and reference tracking

- **💬 Intelligent Chat Interface**
  - Context-aware conversations about uploaded documents
  - Pre-built question suggestions for quick insights
  - Message history persistence
  - Text-to-speech capabilities (planned)
  - Voice input support (planned)

- **📄 Document Management**
  - Upload and organize legal documents
  - Preview documents with modal viewer
  - Download processed documents
  - Delete and manage document library
  - Support for multiple document types

- **🔐 Secure Authentication**
  - Google OAuth 2.0 integration
  - JWT token-based session management
  - Protected routes and secure API calls
  - Persistent user sessions

- **👤 User Management**
  - Personal profile management
  - Admin panel for system oversight
  - User statistics and analytics
  - Activity tracking

- **🎨 Premium User Experience**
  - Responsive design for all devices
  - Dark/Light theme toggle
  - Smooth animations with Framer Motion
  - Intuitive navigation and UI components
  - Beautiful landing page with legal disclaimers

---

## 🎬 Demo

### Landing Page
Beautiful, modern landing page showcasing DocuLex AI's capabilities with animated features and legal disclaimers.

### Document Analysis
Upload documents and receive instant AI-powered analysis with source citations and risk assessments.

### Interactive Chat
Engage in natural language conversations about your documents with context-aware responses.

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and context API
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing with dynamic parameters

### Styling & UI
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Framer Motion 12.23.24** - Production-ready animations
- **Lucide React** - Beautiful, consistent icons

### Authentication & State
- **@react-oauth/google** - Google OAuth integration
- **jwt-decode** - JWT token parsing
- **React Context API** - Global state management

### Charts & Visualization
- **Recharts 3.3.0** - Composable charting library

### Development Tools
- **ESLint 9** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - Fast Refresh and JSX support

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control system
- **Google Cloud Account** - For OAuth credentials (optional for development)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/TanmayNawlakhe/hack_2_skill.git
cd hack_2_skill
```

2. **Install dependencies**

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Configuration

1. **Create environment variables file**

Create a `.env` file in the root directory:

```bash
touch .env
```

2. **Add required environment variables**

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Optional: Backend API URL (if using separate backend)
# VITE_API_BASE_URL=http://localhost:3000
```

3. **Obtain Google OAuth Credentials**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - Your production domain
   - Copy the Client ID to your `.env` file

### Running the Application

1. **Start the development server**

```bash
npm run dev
```

2. **Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173)

3. **Build for production**

```bash
npm run build
```

4. **Preview production build**

```bash
npm run preview
```

---

## 📁 Project Structure

```
hack_2_skill/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components (Radix-based)
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── figma/               # Figma-related components
│   │   ├── LandingPageComps/    # Landing page sections
│   │   │   ├── LegalHero.tsx
│   │   │   └── LegalDisclaimer.tsx
│   │   ├── ChatInterface.tsx    # AI chat component
│   │   ├── DocumentSidebar.tsx  # Document list sidebar
│   │   ├── DocumentView.tsx     # Document viewer
│   │   ├── MainApp.tsx          # Main application layout
│   │   └── UserNav.tsx          # User navigation
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   ├── documentsApi.ts      # Document API calls
│   │   └── useDocuments.ts      # Document management hook
│   ├── pages/                   # Page components
│   │   ├── Landing.tsx          # Landing page
│   │   ├── LoginPage.tsx        # Login page
│   │   ├── SignupPage.tsx       # Signup page
│   │   ├── AppPage.tsx          # Main app page
│   │   ├── ProfilePage.tsx      # User profile
│   │   └── AdminPanel.tsx       # Admin dashboard
│   ├── styles/                  # Global styles
│   │   └── globals.css          # Tailwind imports & customs
│   ├── App.tsx                  # Root component with routing
│   └── main.tsx                 # Application entry point
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json                 # Dependencies and scripts
├── vercel.json                  # Vercel deployment config
└── README.md                    # Project documentation
```

### Key Directories Explained

- **`components/`**: Modular React components organized by feature
- **`contexts/`**: Global state management using React Context API
- **`hooks/`**: Custom React hooks for reusable logic
- **`pages/`**: Full-page components mapped to routes
- **`components/ui/`**: Base UI components built with Radix UI primitives

---

## 📖 Usage Guide

### 1. Authentication

**Sign up or log in** using your Google account:

```typescript
// Google OAuth is handled automatically
// Users are redirected to /app after successful authentication
```

### 2. Upload Documents

Navigate to the app and upload your legal documents:

- Supported formats: PDF, DOCX, TXT (planned)
- Click "Upload Document" button
- Select document type
- Upload and wait for processing

### 3. Analyze Documents

Once uploaded, documents appear in the sidebar:

- Click on a document to open the chat interface
- Ask questions about the document
- View AI-generated analysis and insights
- Get source citations for AI responses

### 4. Chat Interactions

**Example questions you can ask:**

```
"What are the main risks in this contract?"
"Explain the termination clause in simple terms"
"Are there any unusual clauses I should be aware of?"
"What's the liability exposure in this agreement?"
```

### 5. Model Selection

Choose from multiple Gemini models:

- **Gemini 2.5 Pro** - Most capable model
- **Gemini 2.0 Flash** - Fast and efficient
- **Gemini 1.5 Pro** - Advanced reasoning
- **Gemini 1.5 Flash** - Balanced performance
- **Gemini 1.0 Pro** - Reliable baseline

### 6. Profile Management

Access your profile to:

- Update personal information
- View account statistics
- Manage preferences
- Review activity

---

## 🔌 API Integration

DocuLex is designed to work with a backend API. The frontend provides hooks for:

### Document Operations

```typescript
// Upload document
await uploadDocumentToServer(file, documentType, authToken);

// Fetch documents
const documents = await fetchDocumentsFromServer(authToken);

// Save chat history
await saveChatHistory(documentId, chatHistory, authToken);
```

### Expected API Endpoints

```
POST   /api/documents        # Upload document
GET    /api/documents        # Fetch user documents
DELETE /api/documents/:id    # Delete document
POST   /api/chats/:id        # Save chat history
GET    /api/chats/:id        # Fetch chat history
```

### Authentication Headers

All API requests include JWT authentication:

```typescript
headers: {
  'Authorization': `Bearer ${authToken}`
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

1. Check if the issue already exists in [GitHub Issues](https://github.com/TanmayNawlakhe/hack_2_skill/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, Node version)

### Submitting Pull Requests

1. **Fork the repository**

```bash
git clone https://github.com/YOUR_USERNAME/hack_2_skill.git
```

2. **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**

   - Follow existing code style
   - Add TypeScript types
   - Use Tailwind for styling
   - Test your changes thoroughly

4. **Commit your changes**

```bash
git commit -m "feat: add amazing feature"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

5. **Push to your fork**

```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for type safety
- Follow React hooks best practices
- Use functional components over class components
- Organize imports: React → Third-party → Local
- Use Tailwind utility classes
- Keep components small and focused
- Write descriptive variable and function names

---

## 🧪 Testing

Currently, the project uses ESLint for code quality:

```bash
# Run linting
npm run lint
```

### Planned Testing Framework

We plan to add:
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

---

## 🚀 Deployment

### Deploy to Vercel

This project is optimized for Vercel deployment:

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set environment variables** in Vercel dashboard:
   - `VITE_GOOGLE_CLIENT_ID`

### Deploy to Other Platforms

**Build the project:**

```bash
npm run build
```

The `dist/` folder contains production-ready files that can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Vercel Configuration

The project includes a `vercel.json` for optimal deployment settings.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgements

This project was built using amazing open-source technologies:

- **[React](https://reactjs.org/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool
- **[TailwindCSS](https://tailwindcss.com/)** - Styling framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide](https://lucide.dev/)** - Icon library
- **[Google Cloud](https://cloud.google.com/)** - OAuth services
- **[Vercel](https://vercel.com/)** - Deployment platform

### Special Thanks

- **Google Gemini** - For powering our AI capabilities
- **VertexAI** - For RAG implementation
- **Radix UI Team** - For accessible component primitives
- **Tailwind Labs** - For the amazing CSS framework

---

## 📞 Contact

### Project Maintainers

👤 **Manas**
- GitHub: [@MaNaa04](https://github.com/MaNaa04)

👤 **Tanmay Nawlakhe**
- GitHub: [@TanmayNawlakhe](https://github.com/TanmayNawlakhe)
- Repository: [hack_2_skill](https://github.com/TanmayNawlakhe/hack_2_skill)

👤 **Saurav Srade**
- GitHub: [@ssrade](https://github.com/ssrade)

👤 **Arpan**
- GitHub: [@arpan9422](https://github.com/arpan9422)

👤 **Aditya**
- GitHub: [@adityaa2404](https://github.com/adityaa2404)

### Support

For questions and support:

- 💬 **GitHub Discussions**: [Start a discussion](https://github.com/TanmayNawlakhe/hack_2_skill/discussions)
- 🐛 **Issues**: [Report a bug](https://github.com/TanmayNawlakhe/hack_2_skill/issues)
- 📧 **Email**: Contact the maintainers directly

---

## ⭐ Show Your Support

If DocuLex AI helped you or your organization, please consider:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share** on social media
- 🤝 **Contribute** to the project
- 💡 **Suggest features** via issues
- 📝 **Write** about your experience

---

<div align="center">

**Built with ❤️ for the legal tech community**

[⬆ Back to Top](#-doculex-ai)

</div>