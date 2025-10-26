// src/components/AppPage.tsx

import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cubicBezier } from 'framer-motion';

// Import the components it manages
import { MainApp, type Document, type DocumentType } from '../components/MainApp';
import { UploadView } from '../components/UploadView';
import { UserNav } from '../components/UserNav';

// Animation transition settings
const appTransition = {
  duration: 0.6,
  ease: cubicBezier(0.32, 0.72, 0, 1), // A nice "deceleration" curve
};

// Define the props this component will receive from App.tsx
interface AppPageProps {
  // UserNav props
  onLogout: () => void;
  onGoToProfile: () => void;
  onGoToAdmin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;

  // Document data and handlers from useDocuments hook
  documents: Document[];
  handleUploadDocument: (file: File, documentType: DocumentType) => Document; // Pass the original fn
  handleDeleteDocument: (id: string) => void;
  handleDownloadDocument: (id: string) => void;
  handleSendMessage: (documentId: string, messageText: string) => Promise<void>;

  // Preview modal handler
  onPreviewDocument: (id: string) => void;
}

export function AppPage({
  // Destructure all props
  onLogout,
  onGoToProfile,
  onGoToAdmin,
  theme,
  onToggleTheme,
  documents,
  handleUploadDocument,
  handleDeleteDocument,
  handleDownloadDocument,
  handleSendMessage,
  onPreviewDocument,
}: AppPageProps) {
  
  // --- URL & Navigation ---
  // Get the documentId from the URL, e.g., "/app/doc-123"
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  // --- DERIVED STATE FROM URL ---
  // The "upload dialog" is open if NO documentId is in the URL.
  const isUploadViewOpen = documentId === undefined;
  
  // Find the selected document based on the URL parameter.
  const selectedDocument = documents.find(doc => doc.id === documentId);

  // --- NEW EVENT HANDLERS (that use navigation) ---

  // When a user selects a doc from the list (in UploadView or MainApp)
  const handleSelectDocument = (id: string) => {
    navigate(`/app/${id}`);
  };

  // When a user uploads a new doc
  const handleUploadAndSelect = (file: File, documentType: DocumentType) => {
    const newDoc = handleUploadDocument(file, documentType); // Call hook fn from props
    navigate(`/app/${newDoc.id}`); // Navigate to the new doc's route
  };

  // When a user deletes a doc
  const handleDeleteAndDeselect = (id: string) => {
    handleDeleteDocument(id); // Call hook fn from props
    if (documentId === id) {
      // If the currently viewed doc was deleted, go back to the upload view
      navigate('/app');
    }
  };

  // When the user clicks the "Upload" button in the MainApp sidebar
  const handleOpenUploadView = () => {
    navigate('/app');
  };

  // --- RENDER ---
  return (
    <>
      {/* 1. The UserNav stays at the top */}
      <UserNav
        onLogout={onLogout}
        onGoToProfile={onGoToProfile}
        onGoToAdmin={onGoToAdmin}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* 2. The main content area with the animation */}
      <div className="min-h-screen w-full flex items-center justify-center 
                       bg-gray-100 dark:bg-gradient-to-br dark:from-black dark:via-black dark:to-indigo-950">
        <AnimatePresence mode="wait">
          {isUploadViewOpen ? (
            // --- SHOW UPLOAD VIEW ---
            // This is shown when the URL is just "/app"
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
                onUpload={handleUploadAndSelect} // Use new nav handler
                onSelect={handleSelectDocument} // Use new nav handler
              />
            </motion.div>
          ) : (
            // --- SHOW MAIN APP ---
            // This is shown when the URL is "/app/some-doc-id"
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
                // Pass through props from App.tsx
                onLogout={onLogout}
                onGoToProfile={onGoToProfile}
                onGoToAdmin={onGoToAdmin}
                onPreviewDocument={onPreviewDocument}
                onDownloadDocument={handleDownloadDocument}
                onSendMessage={handleSendMessage}
                
                // Pass document data
                documents={documents}
                selectedDocId={documentId || null} // Pass the ID from the URL
                
                // Wire up new navigation handlers
                onSelectDocument={handleSelectDocument}
                onUploadDialogOpenChange={handleOpenUploadView}
                onUpload={handleUploadAndSelect}
                onSelectFromModal={handleSelectDocument}
                onDeleteDocument={handleDeleteAndDeselect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}