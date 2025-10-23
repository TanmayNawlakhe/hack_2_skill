import { useState, type JSX, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { MainApp, type Document, type DocumentType } from './components/MainApp';
import { ProfilePage } from './components/ProfilePage';
import { AdminPanel } from './components/AdminPanel';
// 1. --- IMPORT LANDING PAGE ---
// (Adjust path if needed)
import Index from './components/Landing'; 
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import initialDocuments from './components/lib/documents';
import { UploadView } from './components/UploadView';
import { motion, AnimatePresence } from 'framer-motion';
import { UserNav } from './components/UserNav';

type Theme = 'light' | 'dark';

// Helper component for protected routes
function ProtectedRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 2. --- ADDED GUEST ROUTE ---
// This route is for "guests only" (unauthenticated users).
// If an authenticated user tries to visit, they are redirected to the app.
function GuestRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (isAuth) {
    return <Navigate to="/app" replace />;
  }
  return children;
}

// Animation transition settings
const appTransition = {
  duration: 0.6,
  ease: [0.32, 0.72, 0, 1] // A nice "deceleration" curve
};

// Main App component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const navigate = useNavigate();

  // --- Authentication Handlers ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/app');
    setUploadDialogOpen(true);
    setSelectedDocId(null);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    navigate('/app');
    setUploadDialogOpen(true);
    setSelectedDocId(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedDocId(null);
    navigate('/login'); // You might want to change this to navigate('/')
  };

  // --- Document Handling ---
  const handleUploadDocument = (file: File, documentType: DocumentType) => {
    console.log(`Uploading ${file.name} of type ${documentType}`);
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'analyzed',
      evals: {
        riskScore: Math.floor(Math.random() * 100),
        complexity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        clauses: Math.floor(Math.random() * 30) + 5
      },
      risks: [{ id: `r${Date.now()}`, title: 'Sample Risk Detected', severity: 'medium', description: 'This is a sample risk.' }],
      clauses: [{ id: `c${Date.now()}`, title: 'Sample Clause', content: 'Sample content...', type: 'General' }]
    };

    setDocuments(prev => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    setUploadDialogOpen(false);
  };

  const handleSelectFromModal = (id: string) => {
    setSelectedDocId(id);
    setUploadDialogOpen(false);
  };

  // --- Navigation Handlers for UserNav ---
  const handleGoToProfile = () => navigate('/profile');
  const handleGoToAdmin = () => navigate('/admin');

  // --- Render Routes ---
  return (
    <Routes>
      {/* 3. --- UPDATED PUBLIC ROUTES --- */}
      {/* These routes are for unauthenticated users. Logged-in users will be redirected to /app. */}
      <Route
        path="/"
        element={
          <GuestRoute isAuth={isAuthenticated}>
            {/* Your LandingPage will need its own links to /login and /signup */}
            <Index />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute isAuth={isAuthenticated}>
            <LoginPage
              onLogin={handleLogin}
              onSwitchToSignup={() => navigate('/signup')}
            />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute isAuth={isAuthenticated}>
            <SignupPage
              onSignup={handleSignup}
              onSwitchToLogin={() => navigate('/login')}
            />
          </GuestRoute>
        }
      />

      {/* Protected Routes Wrapper */}
      <Route
        path="/app"
        element={
          <ProtectedRoute isAuth={isAuthenticated}>
            <>
              <UserNav
                onLogout={handleLogout}
                onGoToProfile={handleGoToProfile}
                onGoToAdmin={handleGoToAdmin}
                theme={theme}
                onToggleTheme={handleToggleTheme}
              />
              <div className="min-h-screen w-full flex items-center justify-center 
                          bg-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-black dark:to-indigo-950">

                <AnimatePresence mode="wait">
                  {uploadDialogOpen ? (
                    <motion.div
                      key="upload-view"
                      className="w-[70vw] max-w-[70vw] h-[80vh] shadow-2xl"
                      layoutId="app-container"
                      style={{ borderRadius: '1rem' }}
                      transition={appTransition}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1.0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <UploadView
                        documents={documents}
                        onUpload={handleUploadDocument}
                        onSelect={handleSelectFromModal}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="main-app"
                      className="w-full h-screen"
                      layoutId="app-container"
                      style={{ borderRadius: '0rem' }}
                      transition={appTransition}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <MainApp
                        onLogout={handleLogout}
                        documents={documents}
                        selectedDocId={selectedDocId}
                        onSelectDocument={setSelectedDocId}
                        onUploadDialogOpenChange={setUploadDialogOpen}
                        onUpload={handleUploadDocument}
                        onSelectFromModal={handleSelectFromModal}
                        onGoToProfile={handleGoToProfile}
                        onGoToAdmin={handleGoToAdmin}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          </ProtectedRoute>
        }
      />

      {/* Other Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuth={isAuthenticated}>
            <ProfilePage onBack={() => navigate('/app')} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
            <AdminPanel onBack={() => navigate('/app')} />
        }
      />

      {/* 5. --- UPDATED DEFAULT REDIRECT --- */}
      {/* - Authenticated users who go to a bad URL are sent to /app.
        - Unauthenticated users who go to a bad URL are sent to / (the LandingPage).
      */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/app' : '/'} replace />}
      />
    </Routes>
  );
}