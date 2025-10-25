import { cubicBezier } from 'framer-motion';
import { useState, type JSX, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
// Notice fewer imports from MainApp
import { MainApp, type Document, type DocumentType } from './components/MainApp';
import { ProfilePage } from './components/ProfilePage';
import { AdminPanel } from './components/AdminPanel';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import Index from './components/Landing';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// We no longer import initialDocuments here
import { UploadView } from './components/UploadView';
import { motion, AnimatePresence } from 'framer-motion';
import { UserNav } from './components/UserNav';

// --- IMPORT YOUR NEW HOOK ---
import { useDocuments } from './hooks/useDocuments'; 

type Theme = 'light' | 'dark';

// Helper component for protected routes
function ProtectedRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// This route is for "guests only" (unauthenticated users).
function GuestRoute({ isAuth, children }: { isAuth: boolean; children: JSX.Element }) {
  if (isAuth) {
    return <Navigate to="/app" replace />;
  }
  return children;
}

// Animation transition settings
const appTransition = {
  duration: 0.6,
  ease: cubicBezier(0.32, 0.72, 0, 1) // A nice "deceleration" curve
};

// Main App component
export default function App() {
  // --- UI/Auth/Routing state STAYS here ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- ALL DOCUMENT LOGIC IS NOW IN THE HOOK ---
  const {
    documents,
    isLoadingDocs, // You can use this for a loading spinner
    handleUploadDocument,
    handleDeleteDocument,
    handleDownloadDocument,
    handleSendMessage
  } = useDocuments(isAuthenticated);
  // ---------------------------------------------

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // --- Auth Handlers STAYS here ---
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
    navigate('/login');
  };

  // --- Document handlers are now "wrappers" ---
  // They call the hook logic AND manage UI state (modals/selection)

  const handleUploadAndSelect = (file: File, documentType: DocumentType) => {
    const newDoc = handleUploadDocument(file, documentType); // Call hook
    setSelectedDocId(newDoc.id); // Manage UI state
    setUploadDialogOpen(false); // Manage UI state
  };

  const handleDeleteAndDeselect = (id: string) => {
    handleDeleteDocument(id); // Call hook
    if (selectedDocId === id) { // Manage UI state
      setSelectedDocId(null);
    }
  };

  // --- UI-only handlers STAY here ---
  const handleSelectFromModal = (id: string) => {
    setSelectedDocId(id);
    setUploadDialogOpen(false);
  };

  const handleGoToProfile = () => navigate('/profile');
  const handleGoToAdmin = () => navigate('/admin');

  const handlePreviewDocument = (id: string) => {
    setPreviewDocId(id);
    setPreviewModalOpen(true);
  };

  // --- Render Routes ---
  const previewDocument = documents.find(doc => doc.id === previewDocId);

  // If loading documents, you could show a full-page spinner
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
        {/* Public Routes */}
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
                          documents={documents} // From hook
                          onUpload={handleUploadAndSelect} // Wrapper fn
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
                          documents={documents} // From hook
                          selectedDocId={selectedDocId}
                          onSelectDocument={setSelectedDocId}
                          onUploadDialogOpenChange={setUploadDialogOpen}
                          onUpload={handleUploadAndSelect} // Wrapper fn
                          onSelectFromModal={handleSelectFromModal}
                          onGoToProfile={handleGoToProfile}
                          onGoToAdmin={handleGoToAdmin}
                          onDeleteDocument={handleDeleteAndDeselect} // Wrapper fn
                          onPreviewDocument={handlePreviewDocument}
                          onDownloadDocument={handleDownloadDocument} // From hook
                          onSendMessage={handleSendMessage} // From hook
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
            <ProtectedRoute isAuth={isAuthenticated}>
              <AdminPanel onBack={() => navigate('/app')} />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/app' : '/'} replace />}
        />
      </Routes>
    </>
  );
}