# 🔍 Hack2Skill - AI-Powered Legal Document Analysis Platform

<div align="center">
  
  ![Version](https://img.shields.io/badge/version-0.0.0-blue?style=for-the-badge&logo=semver&logoColor=white)
  ![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  
</div>

<div align="center">
  
  [![License](https://img.shields.io/badge/license-MIT-green?style=plastic&logo=opensourceinitiative&logoColor=white)](LICENSE)
  [![Deploy](https://img.shields.io/badge/deploy-vercel-black?style=plastic&logo=vercel&logoColor=white)](https://vercel.com)
  [![Security](https://img.shields.io/badge/security-oauth2.0-red?style=plastic&logo=oauth&logoColor=white)](#)
  [![AI Powered](https://img.shields.io/badge/AI-Vertex%20AI-yellow?style=plastic&logo=google&logoColor=white)](#)
  
</div>

## 📖 Overview

**Hack2Skill** is a cutting-edge web application that leverages advanced AI technologies to analyze legal documents with unprecedented speed and accuracy. Built with modern web technologies, it provides users with instant insights into complex legal documents using RAG (Retrieval-Augmented Generation) and Google's Vertex AI.

### ✨ Key Features

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/🔒-Bank%20Level%20Security-4A90E2?style=for-the-badge" />
      <br />
      <sub><b>Military-grade encryption ensures complete confidentiality</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/⚡-Instant%20Analysis-9B59B6?style=for-the-badge" />
      <br />
      <sub><b>Analyze complex documents in seconds</b></sub>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/🎯-Precision%20Insights-16A085?style=for-the-badge" />
      <br />
      <sub><b>RAG + Vertex AI with deeds reference book</b></sub>
    </td>
  </tr>
</table>

- 🔐 **Secure Authentication** - Google OAuth 2.0 integration for safe login
- 📄 **Document Management** - Upload, analyze, and manage multiple legal documents
- 💬 **AI Chat Interface** - Interactive chat with context-aware responses
- 📊 **Risk Assessment** - Automatic risk scoring and complexity analysis
- 🔍 **Clause Extraction** - Intelligent identification of key legal clauses
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light themes
- 📱 **Mobile Responsive** - Seamless experience across all devices
- ⚡ **Real-time Updates** - Live document processing status

## 🏗️ Project Structure

```
hack_2_skill/
│
├── 📁 public/                      # Static assets
│   └── vite.svg                    # Vite logo
│
├── 📁 src/                         # Source code directory
│   │
│   ├── 📁 components/              # React components
│   │   ├── 📁 LandingPageComps/    # Landing page specific components
│   │   │   ├── LegalHero.tsx       # Hero section
│   │   │   └── LegalDisclaimer.tsx # Legal disclaimer component
│   │   │
│   │   ├── 📁 ui/                  # Reusable UI components
│   │   │   ├── avatar.tsx          # Avatar component
│   │   │   ├── badge.tsx           # Badge component
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── dialog.tsx          # Dialog/Modal component
│   │   │   ├── dropdown-menu.tsx   # Dropdown menu
│   │   │   ├── input.tsx           # Input field
│   │   │   ├── label.tsx           # Label component
│   │   │   ├── progress.tsx        # Progress bar
│   │   │   ├── scroll-area.tsx     # Scroll area
│   │   │   ├── tabs.tsx            # Tabs component
│   │   │   ├── textarea.tsx        # Textarea component
│   │   │   └── utils.ts            # UI utilities
│   │   │
│   │   ├── 📁 figma/               # Figma design assets
│   │   ├── 📁 lib/                 # Component libraries
│   │   │
│   │   ├── ChatInterface.tsx       # Chat interface component
│   │   ├── DocumentSidebar.tsx     # Document list sidebar
│   │   ├── DocumentView.tsx        # Document detail view
│   │   ├── DocumentPreviewModal.tsx # Document preview modal
│   │   ├── DocumentExtrasSidebar.tsx # Additional document info
│   │   ├── MainApp.tsx             # Main application component
│   │   ├── ModalDocumentList.tsx   # Document list modal
│   │   ├── UploadView.tsx          # Document upload interface
│   │   └── UserNav.tsx             # User navigation component
│   │
│   ├── 📁 contexts/                # React contexts
│   │   └── AuthContext.tsx         # Authentication context & provider
│   │
│   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── documentsApi.ts         # Document API functions
│   │   └── useDocuments.ts         # Documents management hook
│   │
│   ├── 📁 pages/                   # Page components
│   │   ├── Landing.tsx             # Landing/Home page
│   │   ├── LoginPage.tsx           # Login page
│   │   ├── SignupPage.tsx          # Signup page
│   │   ├── AppPage.tsx             # Main application page
│   │   ├── ProfilePage.tsx         # User profile page
│   │   └── AdminPanel.tsx          # Admin dashboard
│   │
│   ├── 📁 styles/                  # Style files
│   │   └── globals.css             # Global CSS styles
│   │
│   ├── App.tsx                     # Root App component
│   └── main.tsx                    # Application entry point
│
├── 📄 index.html                   # HTML entry point
├── 📄 package.json                 # NPM dependencies
├── 📄 package-lock.json            # NPM lock file
├── 📄 tsconfig.json                # TypeScript config
├── 📄 tsconfig.app.json            # TypeScript app config
├── 📄 tsconfig.node.json           # TypeScript Node config
├── 📄 vite.config.ts               # Vite configuration
├── 📄 vercel.json                  # Vercel deployment config
├── 📄 eslint.config.js             # ESLint configuration
├── 📄 .gitignore                   # Git ignore rules
└── 📄 README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

<div align="center">
  
  ![Node.js](https://img.shields.io/badge/Node.js-18.x_or_higher-339933?style=for-the-badge&logo=node.js&logoColor=white)
  ![npm](https://img.shields.io/badge/npm-9.x_or_higher-CB3837?style=for-the-badge&logo=npm&logoColor=white)
  ![Git](https://img.shields.io/badge/Git-latest-F05032?style=for-the-badge&logo=git&logoColor=white)
  
</div>

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

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
   ```
   
   > 📝 **Note:** You need to obtain a Google OAuth 2.0 Client ID from the [Google Cloud Console](https://console.cloud.google.com/)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## 🛠️ Technology Stack

### Frontend Framework & Libraries

<div align="center">

| Technology | Version | Purpose |
|-----------|---------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=plastic&logo=react&logoColor=black) | 19.1.1 | UI Framework |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white) | 5.9.3 | Type Safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=plastic&logo=vite&logoColor=white) | 7.1.7 | Build Tool |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind-06B6D4?style=plastic&logo=tailwindcss&logoColor=white) | 4.1.14 | Styling |
| ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=plastic&logo=framer&logoColor=white) | 12.23.24 | Animations |

</div>

### UI Components

- **Radix UI** - Accessible, unstyled component primitives
  - Avatar, Dialog, Dropdown Menu, Label, Progress, Scroll Area, Slot, Switch, Tabs, Visually Hidden
- **Lucide React** - Beautiful & consistent icon set
- **Recharts** - Charting library for data visualization
- **Class Variance Authority** - CSS class composition

### Routing & State Management

- **React Router DOM** (v7.9.4) - Client-side routing
- **React Context API** - State management for auth and documents

### Authentication & Security

- **@react-oauth/google** - Google OAuth 2.0 integration
- **jwt-decode** - JWT token decoding

### Development Tools

<div align="center">

![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=plastic&logo=eslint&logoColor=white)
![TypeScript ESLint](https://img.shields.io/badge/-TS_ESLint-3178C6?style=plastic&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=plastic&logo=vercel&logoColor=white)

</div>

## 📱 Usage Guide

### 1. Landing Page
- Visit the home page to learn about the platform
- View key features and benefits
- Navigate to login/signup

### 2. Authentication
- **Sign Up**: Create a new account using Google OAuth
- **Login**: Access your account securely with Google authentication

### 3. Document Management
- **Upload**: Click the upload button and select your legal document
- **Choose Type**: Select between scanned or electronic document type
- **Auto-Analysis**: Document is automatically analyzed upon upload

### 4. Document Analysis
- **View Details**: Click on any document to view comprehensive analysis
- **Risk Score**: See overall risk assessment
- **Clauses**: Review extracted legal clauses
- **Complexity**: Understand document complexity rating

### 5. AI Chat Interface
- **Ask Questions**: Chat with AI about your document
- **Get Insights**: Receive context-aware responses
- **Source References**: View sources for AI responses

### 6. Profile Management
- Access your profile from the user menu
- View and update your information
- Manage account settings

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## 🎯 Features in Detail

### 🔐 Authentication System
- Secure Google OAuth 2.0 integration
- JWT token-based session management
- Protected routes and guest route handling
- Persistent login state

### 📄 Document Management
- Multi-document upload support
- Support for scanned and electronic documents
- Real-time processing status updates
- Document preview and download
- Document deletion with confirmation

### 🤖 AI-Powered Analysis
- Integration with Google Vertex AI
- RAG (Retrieval-Augmented Generation) implementation
- Reference to legal deeds database
- Automatic risk scoring (0-100 scale)
- Complexity assessment (Simple/Medium/Complex)
- Clause extraction and categorization

### 💬 Interactive Chat
- Document-specific chat history
- Context-aware AI responses
- Source attribution for answers
- Real-time message streaming
- Chat history persistence

### 🎨 User Interface
- Modern, clean design
- Dark and light theme support
- Responsive layout for all screen sizes
- Smooth animations with Framer Motion
- Accessible components (Radix UI)
- Mobile-friendly navigation

## 🔒 Security Features

<div align="center">

![OAuth](https://img.shields.io/badge/🔐-OAuth_2.0-brightgreen?style=for-the-badge)
![JWT](https://img.shields.io/badge/🎫-JWT_Tokens-orange?style=for-the-badge)
![Encryption](https://img.shields.io/badge/🔒-Encrypted_Storage-red?style=for-the-badge)

</div>

- Google OAuth 2.0 authentication
- JWT token validation
- Secure session management
- Protected API endpoints
- LocalStorage encryption for sensitive data
- HTTPS enforcement in production

## 🌐 Deployment

The application is configured for deployment on **Vercel**.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy with a single click

The `vercel.json` configuration handles SPA routing automatically.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add comments for complex logic
- Ensure ESLint passes before committing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Tanmay Nawlakhe** - [GitHub Profile](https://github.com/TanmayNawlakhe)

## 🙏 Acknowledgments

- Google Vertex AI for AI capabilities
- Radix UI for accessible components
- Tailwind CSS for styling utilities
- Vercel for hosting platform
- The open-source community

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

<div align="center">
  
  **Made with ❤️ using React, TypeScript, and AI**
  
  ![Star](https://img.shields.io/badge/⭐-Star_this_repo-yellow?style=for-the-badge)
  
</div>
