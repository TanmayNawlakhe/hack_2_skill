import { DocumentSidebar } from './DocumentSidebar';
import { DocumentView } from './DocumentView';
import { cn } from './lib/utils';

// Document and DocumentType interfaces
export interface Document {
  createElement: any;
  id: string;
  name: string;
  uploadDate: string;
  status: 'analyzed' | 'processing' | 'pending';
  // ... (rest of interface)
  evals: {
    riskScore: number;
    complexity: string;
    clauses: number;
  };
  risks: Array<{
    id: string;
    title: string;
    severity: 'high' | 'medium' | 'low';
    description: string;
  }>;
  clauses: Array<{
    id: string;
    title: string;
    content: string;
    type: string;
  }>;
}
export type DocumentType = 'scanned' | 'electronic';


interface MainAppProps {
  onLogout: () => void;
  documents: Document[];
  selectedDocId: string | null;
  onSelectDocument: (id: string) => void;
  onUploadDialogOpenChange: (open: boolean) => void;
  onUpload: (file: File, documentType: DocumentType) => void;
  onSelectFromModal: (id: string) => void;
  onGoToProfile: () => void;
  onGoToAdmin: () => void;

  // Added/Ensured these props are in the interface
  onDeleteDocument: (id: string) => void;
  onDownloadDocument: (id: string) => void;
}

export function MainApp({
  documents,
  selectedDocId,
  onSelectDocument,
  onUploadDialogOpenChange,
  // Added props to destructuring
  onDeleteDocument,
  onDownloadDocument,
}: MainAppProps) {

  const selectedDocument = documents.find(doc => doc.id === selectedDocId);

  return (
    <div
      className={cn(
        "w-full h-full transition-all duration-500 flex-1 bg-white dark:bg-gradient-to-br dark:from-black dark:via-black dark:to-indigo-950 flex flex-col",
        "relative overflow-hidden"
      )}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-44 left-44 w-96 h-66 -translate-x-1/4 -translate-y-1-4 bg-blue-700/50 rounded-full blur-[100px] opacity-20 dark:opacity-40 pointer-events-none z-0"></div>
      <div className="absolute top-20 right-60 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 dark:opacity-50 pointer-events-none z-0 animate-float-1"></div>
      <div className="absolute bottom-40 left-40 w-24 h-24 bg-teal-500 rounded-full blur-2xl opacity-30 dark:opacity-60 pointer-events-none z-0 animate-float-2"></div>

      {/* App content */}
      <div className="flex-1 flex overflow-hidden z-10">
        <DocumentSidebar
          documents={documents}
          selectedDocId={selectedDocId}
          onSelectDocument={onSelectDocument}
          onUploadClick={() => onUploadDialogOpenChange(true)}
          onDownloadDocument={onDownloadDocument}
          onDeleteDocument={onDeleteDocument}
        />
        <DocumentView document={selectedDocument} />
      </div>

    </div>
  );
}