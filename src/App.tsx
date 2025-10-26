import { useState, type JSX, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPanel } from './pages/AdminPanel';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import Index from './pages/Landing';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AppPage } from './pages/AppPage'; 
import { useDocuments } from './hooks/useDocuments'; 

type Theme = 'light' | 'dark';

// Helper component for protected routes (Unchanged)
function ProtectedRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Guest route (Unchanged)
function GuestRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (isAuth) {
    return <Navigate to="/app" replace />;
  }
  return children;
}

// Main App component
export default function App() {
  // --- Auth, Theme, and Preview Modal state STAYS here ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- uploadDialogOpen and selectedDocId state are REMOVED ---
  // const [uploadDialogOpen, setUploadDialogOpen] = useState(false); // <-- REMOVED
  // const [selectedDocId, setSelectedDocId] = useState<string | null>(null); // <-- REMOVED

  // --- ALL DOCUMENT LOGIC IS NOW IN THE HOOK (Unchanged) ---
  const {
    documents,
    isLoadingDocs, 
    handleUploadDocument,
    handleDeleteDocument,
    handleDownloadDocument,
    handleSendMessage,
  } = useDocuments(isAuthenticated);
  // ---------------------------------------------

  // Theme effect (Unchanged)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Theme handler (Unchanged)
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // --- Auth Handlers are SIMPLIFIED ---
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/app'); // Just navigate to /app. AppPage will show UploadView.
    // setUploadDialogOpen(true); // <-- REMOVED
    // setSelectedDocId(null); // <-- REMOVED
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    navigate('/app'); // Just navigate to /app.
    // setUploadDialogOpen(true); // <-- REMOVED
    // setSelectedDocId(null); // <-- REMOVED
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // setSelectedDocId(null); // <-- REMOVED
    navigate('/login');
  };

  // --- Document handlers that managed UI state are REMOVED ---
  // const handleUploadAndSelect = ... // <-- REMOVED (Logic moved to AppPage)
  // const handleDeleteAndDeselect = ... // <-- REMOVED (Logic moved to AppPage)
  // const handleSelectFromModal = ... // <-- REMOVED (Logic moved to AppPage)

  // --- UI-only handlers STAY here ---
  const handleGoToProfile = () => navigate('/profile');
  const handleGoToAdmin = () => navigate('/admin');

  const handlePreviewDocument = (id: string) => {
    setPreviewDocId(id);
    setPreviewModalOpen(true);
  };

  // --- Render Routes ---
  const previewDocument = documents.find(doc => doc.id === previewDocId);

  // Loading spinner logic (Unchanged)
  if (isLoadingDocs && isAuthenticated) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-black">
        {/* Add a loading spinner component here */}
        <p className="dark:text-white">Loading Documents...</p>
      </div>
    );
  }

  return (
    <>
      <DocumentPreviewModal
        document={previewDocument || null}
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
      />

      <Routes>
        {/* Public Routes (Unchanged) */}
        <Route
          path="/"
          element={
            <GuestRoute isAuth={isAuthenticated}>
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

        {/* --- MODIFIED PROTECTED ROUTE --- */}
        {/* This single route now handles both "/app" and "/app/:documentId" */}
        <Route
          path="/app/:documentId?"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <AppPage
                // Pass UserNav props
                onLogout={handleLogout}
                onGoToProfile={handleGoToProfile}
                onGoToAdmin={handleGoToAdmin}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                
                // Pass Document hook functions/data
                documents={documents}
                handleUploadDocument={handleUploadDocument}
                handleDeleteDocument={handleDeleteDocument}
                handleDownloadDocument={handleDownloadDocument}
                handleSendMessage={handleSendMessage}
                
                // Pass Preview handler
                onPreviewDocument={handlePreviewDocument}
              />
            </ProtectedRoute>
          }
        />
        {/* ---------------------------------- */}


        {/* Other Protected Routes (Unchanged) */}
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
            <ProtectedRoute isAuth={isAuthenticated}>
              <AdminPanel onBack={() => navigate('/app')} />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect (Unchanged) */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/app' : '/'} replace />}
        />
      </Routes>
    </>
  );
}