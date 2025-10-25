import { FileText, Download, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import type { Document } from './MainApp';

interface DocumentPreviewModalProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentPreviewModal({
  document,
  open,
  onOpenChange,
}: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100);

  if (!document) return null;

  // Use the document's fileUrl if available, otherwise show a placeholder
  // In production, you would store the fileUrl when uploading the document
  const documentUrl = document.fileUrl || `https://example.com/documents/${document.id}.pdf`;
  
  // Alternative: If you have the document stored as a blob or file
  // const documentUrl = URL.createObjectURL(documentFile);

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = window.document.createElement('a');
    link.href = documentUrl;
    link.download = document.name;
    link.click();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleFullscreen = () => {
    // Open in new window for fullscreen view
    window.open(documentUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 gap-0 bg-white dark:bg-gray-900">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {document.name}
                </DialogTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Uploaded on {document.uploadDate}
                </p>
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center font-medium">
                {zoom}%
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                title="Open in New Tab"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="Download Document"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Document Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950 p-4">
          <div 
            className="mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden"
            style={{ 
              width: `${zoom}%`,
              minHeight: '100%',
              transition: 'width 0.2s ease-in-out'
            }}
          >
            {/* PDF Preview - Using iframe */}
            {document.fileUrl ? (
              <iframe
                src={document.fileUrl}
                className="w-full h-full min-h-[800px] border-0"
                title={document.name}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              /* Fallback UI when no file URL is available */
              <div className="p-8 space-y-6 min-h-[800px] flex flex-col items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Document Preview Unavailable</p>
                  <p className="text-sm mt-2">{document.name}</p>
                  <p className="text-xs mt-1 text-gray-400">The document file is not available for preview</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 w-full max-w-md">
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Document Information</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Risk Score:</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{document.evals.riskScore}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Complexity:</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{document.evals.complexity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Clauses:</dt>
                      <dd className="font-medium text-gray-900 dark:text-white">{document.evals.clauses}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with document info */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-shrink-0">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span>
                <span className="font-medium">Risk Score:</span> {document.evals.riskScore}
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>
                <span className="font-medium">Complexity:</span> {document.evals.complexity}
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>
                <span className="font-medium">Clauses:</span> {document.evals.clauses}
              </span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              document.status === 'analyzed'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : document.status === 'processing'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
            }`}>
              {document.status === 'analyzed' ? '✓ Analyzed' : 
               document.status === 'processing' ? '⏳ Processing' : 'Pending'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
