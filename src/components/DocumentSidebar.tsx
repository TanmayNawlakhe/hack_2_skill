import { FileText, Clock, Trash2, Eye, Upload } from 'lucide-react';
import type { Document } from './MainApp';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface DocumentSidebarProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelectDocument: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onPreviewDocument: (id: string) => void;
  onUploadClick: () => void;
}

export function DocumentSidebar({
  documents,
  selectedDocId,
  onSelectDocument,
  onDeleteDocument,
  onPreviewDocument,
  onUploadClick,
}: DocumentSidebarProps) {
  return (
    // Update background and borders
    <div className="w-85 border-r border-gray-200 dark:border-gray-800/50 bg-white/50 dark:bg-[#1a1f3a]/20 backdrop-blur-sm flex flex-col h-screen">

      {/* Update header border and text colors */}
      <div className="flex items-center justify-between py-2 pl-4 pr-2 border-b h-[10vh] border-gray-200 dark:border-gray-800/50">
        <div className='pl-1'>
          <h2 className="text-black dark:text-white mt-1">Documents</h2>
          <p className="text-gray-600 dark:text-gray-400 text-xs">{documents.length} documents uploaded</p>
        </div>
        {/* Update button styles */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onUploadClick}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-blue-500/10"
          aria-label="Upload document"
        >
          <Upload className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 min-h-0 [&_[data-orientation='vertical']]:hidden">
        <div className="px-2 pt-4">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              // Update selected and hover states for list items
              className={`w-80 text-left p-3 rounded-lg mb-2 transition-all relative group 
                ${selectedDocId === doc.id
                  ? 'bg-blue-100 dark:bg-transparent dark:bg-gradient-to-r dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-200 dark:border-blue-500/30'
                  : 'bg-transparent dark:bg-[#0f1629]/50 hover:bg-gray-100 dark:hover:bg-[#0f1629] border border-transparent'
                }`}
            >
              <div className="flex items-start gap-3">
                <div
                  // Update icon background based on selection
                  className={`mt-1 p-2 rounded-lg ${selectedDocId === doc.id ? 'bg-blue-100/50 dark:bg-blue-500/20' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                >
                  <FileText
                    // Update icon color based on selection
                    className={`w-4 h-4 ${selectedDocId === doc.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Update text colors */}
                  <h3 className="text-black dark:text-white text-sm truncate">{doc.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{doc.uploadDate}</span>
                  </div>
                  <div className="mt-2">
                    <div
                      // Update status badge colors
                      className={`inline-flex px-2 py-0.5 rounded text-xs ${doc.status === 'analyzed'
                        ? 'bg-green-100/50 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                        : doc.status === 'processing'
                          ? 'bg-yellow-100/50 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
                          : 'bg-gray-100/50 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'
                        }`}
                    >
                      {doc.status === 'analyzed'
                        ? '✓ Analyzed'
                        : doc.status === 'processing'
                          ? '⏳ Processing'
                          : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
              {/* Hover action buttons */}
              {/* Delete button - top right */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteDocument(doc.id);
                }}
                className="absolute top-2 right-2 p-1 rounded text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Delete document"
              >
                <Trash2 className="w-4 h-4" />
              </div>
              
              {/* Preview button - bottom right */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewDocument(doc.id);
                }}
                className="absolute bottom-2 right-2 p-1 rounded text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Preview document"
              >
                <Eye className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}