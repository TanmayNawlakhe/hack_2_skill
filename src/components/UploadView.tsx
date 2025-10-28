import { useState, useRef, useCallback } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Upload, FileText, Lock, Zap, Scan, FileDigit, CloudUpload, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";
import type { Document, DocumentType } from './MainApp';
import { ModalDocumentList } from './ModalDocumentList';
import { ScrollArea } from './ui/scroll-area';

interface UploadViewProps {
  onUpload: (file: File, documentType: DocumentType) => void;
  documents: Document[];
  onSelect: (id: string) => void;
}

export function UploadView({ onUpload, documents, onSelect }: UploadViewProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>('scanned');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null | undefined) => {
    if (!file) return;
    const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const isValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    if (isValidExtension) {
      if (file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        console.error('File size exceeds 10MB limit.'); // Use console.error
      }
    } else {
      console.error('Please select a valid document file (PDF, DOC, DOCX, TXT).'); // Use console.error
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
  }, []);

  const handleUpload = () => {
    if (selectedFile) onUpload(selectedFile, documentType);
  };

  const handleSelect = (id: string) => {
    onSelect(id);
  };

  // ----------------------------------------------------
  return (
    <div className="relative flex w-full h-full rounded-2xl transition-all duration-500 overflow-hidden bg-white dark:bg-transparent">
      {/* Background blobs */}
      <div className="absolute top-44 left-44 w-96 h-66 -translate-x-1/4 -translate-y-1/4 bg-blue-700/50 rounded-full blur-[100px] opacity-20 dark:opacity-40 pointer-events-none z-0"></div>
      <div className="absolute top-20 right-60 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 dark:opacity-50 pointer-events-none z-0 animate-float-1"></div>
      <div className="absolute bottom-40 left-40 w-24 h-24 bg-teal-500 rounded-full blur-2xl opacity-30 dark:opacity-60 pointer-events-none z-0 animate-float-2"></div>

      <div className="relative z-10 flex w-full transition-all  duration-500 h-full">
        {/* Left Side: 50% */}
        <div
          className={cn(
            "w-[50%] h-full border-r transition-all duration-500 border-gray-200 dark:border-gray-700/50",
            " dark:bg-gray-800/40 backdrop-blur-sm",
            "hidden md:block" // Hide on mobile, show on desktop
          )}
        >
          <ModalDocumentList documents={documents} onSelect={handleSelect} />
        </div>

        {/* Right Side: 50% */}
        <div className="w-full md:w-[50%] h-full"> {/* Full width on mobile */}
          <Card
            className={cn(
              "relative border-none transition-all duration-500 overflow-hidden h-full rounded-l-none",
              "rounded-r-none",
              " dark:bg-gray-800/40 backdrop-blur-sm border-orange-200 dark:border-gray-700/50",
              isDragging ? "border-blue-400" : "border-transparent",
              "flex flex-col"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <ScrollArea className="flex-1 min-h-0 [&_[data-orientation='vertical']]:hidden">
              {/* --- MODIFIED: Changed min-h-full to h-full --- */}
              <div className="p-7 text-center relative z-10 h-full flex flex-col">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />
                
                {/* --- This wrapper centers the content --- */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {!selectedFile ? (
                      <motion.div
                        key="initial-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Document Type */}
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center justify-center gap-2">
                            <FileDigit className="w-5 h-5 text-blue-500 dark:text-blue-400" /> Document Type
                          </h3>
                          <div className="flex justify-center gap-4">
                            <motion.div
                              onClick={() => setDocumentType('scanned')}
                              className={cn(
                                "flex items-center dark:bg-gray-900/50 gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 w-1/2",
                                documentType === 'scanned'
                                  ? "bg-blue-50  border-blue-500 dark:border-blue-500/50 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20"
                                  : "bg-white  border-gray-300 dark:border-gray-700 hover:border-blue-400/40"
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  documentType === 'scanned'
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                                    : "bg-gray-200 dark:bg-gray-700"
                                )}
                              >
                                <Scan
                                  className={cn(
                                    "w-5 h-5",
                                    documentType === 'scanned' ? "text-white" : "text-gray-600 dark:text-white"
                                  )}
                                />
                              </div>
                              <div className="text-left">
                                <p
                                  className={cn(
                                    "font-semibold",
                                    documentType === 'scanned'
                                      ? 'text-blue-600 dark:text-blue-300'
                                      : 'text-gray-700 dark:text-gray-300'
                                  )}
                                >
                                  Scanned
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF scans, images</p>
                              </div>
                            </motion.div>
                            <motion.div
                              onClick={() => setDocumentType('electronic')}
                              className={cn(
                                "flex items-center gap-3 p-4 dark:bg-gray-900/50 rounded-xl border-2 cursor-pointer transition-all duration-300 w-1/2",
                                documentType === 'electronic'
                                  ? "bg-green-50 border-green-500 dark:border-green-500/50 shadow-lg shadow-green-500/10 dark:shadow-green-500/20"
                                  : "bg-white border-gray-300 dark:border-gray-700 hover:border-green-400/40"
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  documentType === 'electronic'
                                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                    : "bg-gray-200 dark:bg-gray-700"
                                )}
                              >
                                <FileDigit
                                  className={cn(
                                    "w-5 h-5",
                                    documentType === 'electronic' ? "text-white" : "text-gray-600 dark:text-white"
                                  )}
                                />
                              </div>
                              <div className="text-left">
                                <p
                                  className={cn(
                                    "font-semibold",
                                    documentType === 'electronic'
                                      ? 'text-green-600 dark:text-green-300'
                                      : 'text-gray-700 dark:text-gray-300'
                                  )}
                                >
                                  Electronic
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Digital PDFs, Word</p>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Upload New Document */}
                        <div className="flex flex-col items-center gap-6">
                          <motion.div
                            className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-2 bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400/30 shadow-blue-500/30"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                          >
                            <CloudUpload className="w-12 h-12 text-white" />
                          </motion.div>
                          <div className="space-y-5">
                            <h3 className="text-2xl font-bold text-black dark:text-white">Upload New Document</h3>
                            <p className="text-gray-600 dark:text-gray-300 max-w-md">
                              Drag and drop your file or click to browse.
                            </p>
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 font-medium text-white"
                            >
                              <Upload className="w-5 h-5 mr-2" /> Choose File
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
                        {/* Confirmation View */}
                        <div className="flex flex-col items-center gap-6">
                          <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-2 bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400/30 shadow-emerald-500/30">
                            <CheckCircle2 className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-black dark:text-white">File Ready for Upload</h3>
                          <div className="bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700/50 rounded-xl p-4 w-full flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-black dark:text-white font-medium truncate">{selectedFile.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready
                              </p>
                            </div>
                            <Button
                              onClick={() => setSelectedFile(null)}
                              size="icon"
                              variant="ghost"
                              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700/50"
                            >
                              <X className="w-5 h-5" />
                            </Button>
                          </div>
                          <div className="flex gap-4 w-full mt-2">
                            <Button
                              onClick={() => setSelectedFile(null)}
                              variant="outline"
                              className="flex-1 bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                            >
                              Change File
                            </Button>
                            <Button
                              onClick={handleUpload}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            >
                              <Upload className="w-5 h-5 mr-2" /> Upload & Analyze
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Footer (now pushed to the bottom) */}
                <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700/50">
                    <FileText className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                    <span>PDF, DOC, DOCX, TXT</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700/50">
                    <Lock className="w-3 h-3 text-green-600 dark:text-green-300" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700/50">
                    <Zap className="w-3 h-3 text-yellow-600 dark:text-amber-300" />
                    <span>Max 10MB</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}