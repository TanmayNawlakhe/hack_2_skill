import { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Upload,
  FileText,
  Lock,
  Zap,
  Scan,
  FileDigit,
  CloudUpload,
  X,
  CheckCircle2
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (file: File, documentType: DocumentType) => void;
}

type DocumentType = 'scanned' | 'electronic';

export function UploadDialog({ open, onOpenChange, onUpload }: UploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>('scanned');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedFile(null);
      setIsDragging(false);
      setDocumentType('scanned');
    }
    onOpenChange(isOpen);
  };

  const handleFileSelect = (file: File | null | undefined) => {
    if (!file) return;

    const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const isValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (isValidExtension) {
      if (file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert('File size exceeds 10MB limit.');
      }
    } else {
      alert('Please select a valid document file (PDF, DOC, DOCX, TXT).');
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile, documentType);
      handleClose(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-transparent border-none shadow-none max-w-4xl p-0">
        <VisuallyHidden>
          <DialogTitle>Upload Legal Document</DialogTitle>
          <DialogDescription>
            Choose a document type and upload your legal document for AI-powered analysis.
          </DialogDescription>
        </VisuallyHidden>
        
        <Card
          className={cn(
            "relative border-2 border-dashed transition-all duration-500 overflow-hidden",
            "bg-gradient-to-br from-gray-800/40 to-gray-900/50 backdrop-blur-sm",
            isDragging 
              ? "border-blue-400 scale-[1.02]" 
              : "border-gray-700/60 hover:border-blue-400/60"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-7 text-center relative z-10">
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
            
            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div
                  key="initial-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                      <FileDigit className="w-5 h-5 text-blue-400" />
                      Document Type
                    </h3>
                    <div className="flex justify-center gap-4">
                      <motion.div
                        onClick={() => setDocumentType('scanned')}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          documentType === 'scanned'
                            ? "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                            : "bg-gray-800/40 border-gray-700/50 hover:border-blue-400/40"
                        )}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", documentType === 'scanned' ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gray-700")}>
                          <Scan className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className={cn("font-semibold", documentType === 'scanned' ? 'text-blue-300' : 'text-gray-300')}>Scanned Document</p>
                          <p className="text-xs text-gray-400">PDF scans, images</p>
                        </div>
                      </motion.div>

                      <motion.div
                        onClick={() => setDocumentType('electronic')}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                          documentType === 'electronic'
                            ? "bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/50 shadow-lg shadow-green-500/20"
                            : "bg-gray-800/40 border-gray-700/50 hover:border-green-400/40"
                        )}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                         <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", documentType === 'electronic' ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gray-700")}>
                          <FileDigit className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className={cn("font-semibold", documentType === 'electronic' ? 'text-green-300' : 'text-gray-300')}>Electronic Document</p>
                          <p className="text-xs text-gray-400">Digital PDFs, Word</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <motion.div
                      className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-2 bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400/30 shadow-blue-500/30"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <CloudUpload className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="space-y-5">
                      <h3 className="text-2xl font-bold text-white">Upload Legal Document</h3>
                      <p className="text-gray-300 max-w-md">Drag and drop your file or click to browse.</p>
                      <Button onClick={() => fileInputRef.current?.click()} className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 font-medium">
                        <Upload className="w-5 h-5 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="confirmation-view"
                  className="w-full max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-2 bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400/30 shadow-emerald-500/30">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">File Ready for Upload</h3>
                    
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 w-full flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-300" />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-white font-medium truncate">{selectedFile.name}</p>
                            <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                        </div>
                        <Button onClick={() => setSelectedFile(null)} size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-700/50">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex gap-4 w-full mt-2">
                        <Button onClick={() => setSelectedFile(null)} variant="outline" className="flex-1 bg-transparent border-gray-600 hover:bg-gray-700/50 text-gray-300">
                           Change File
                        </Button>
                        <Button onClick={handleUpload} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                           <Upload className="w-5 h-5 mr-2" />
                           Upload & Analyze
                        </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                <FileText className="w-3 h-3 text-blue-300" />
                <span>PDF, DOC, DOCX, TXT</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                <Lock className="w-3 h-3 text-green-300" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                <Zap className="w-3 h-3 text-amber-300" />
                <span>Max 10MB</span>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}