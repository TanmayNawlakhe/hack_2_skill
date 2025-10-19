import { FileText, Clock } from 'lucide-react';
import type { Document } from './MainApp';
import { ScrollArea } from './ui/scroll-area';

interface DocumentSidebarProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelectDocument: (id: string) => void;
}

export function DocumentSidebar({ documents, selectedDocId, onSelectDocument }: DocumentSidebarProps) {
  return (
    <div className="w-80 border-r  border-gray-800/50 bg-[#1a1f3a]/20 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-gray-800/50">
        <h2 className="text-white">Documents</h2>
        <p className="text-gray-400 text-sm mt-1">{documents.length} documents uploaded</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              className={`w-75 text-left p-3 rounded-lg mb-2 transition-all ${
                selectedDocId === doc.id
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                  : 'bg-[#0f1629]/50 hover:bg-[#0f1629] border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-lg ${
                  selectedDocId === doc.id ? 'bg-blue-500/20' : 'bg-gray-800'
                }`}>
                  <FileText className={`w-4 h-4 ${
                    selectedDocId === doc.id ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm truncate">{doc.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-400 text-xs">{doc.uploadDate}</span>
                  </div>
                  <div className="mt-2">
                    <div className={`inline-flex px-2 py-0.5 rounded text-xs ${
                      doc.status === 'analyzed' 
                        ? 'bg-green-500/20 text-green-400'
                        : doc.status === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {doc.status === 'analyzed' ? '✓ Analyzed' : doc.status === 'processing' ? '⏳ Processing' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
