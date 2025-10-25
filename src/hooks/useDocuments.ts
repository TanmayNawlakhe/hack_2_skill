// src/hooks/useDocuments.ts

import { useState, useEffect } from 'react';
import type { Document, Message, DocumentType } from '../components/MainApp';
import initialDocuments from '../components/lib/documents';

// This is the shape of the data we expect from our chat API
type ChatHistoryRecord = {
  docId: string;
  chatHistory: Message[];
};

export function useDocuments(isAuthenticated: boolean) {
  const [documents, setDocuments] = useState<Document[]>([]);
  // We can keep this for the chat fetch
  const [isLoadingDocs, setIsLoadingDocs] = useState(true); 

  // --- 2. LOAD DOCS AND MERGE CHATS ---
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingDocs(true);
      
      // --- Step A: Load your local documents first ---
      // We add an empty chatHistory array to all of them
      const localDocuments = initialDocuments.map(doc => ({
        ...doc,
        chatHistory: doc.chatHistory || [] 
      }));

      // --- Step B: Fetch ONLY the chat histories from your DB ---
      const fetchChatHistories = async () => {
        try {
          // This endpoint just returns an array of chat histories
          const response = await fetch('/api/chats'); // <-- YOUR CHAT GET ENDPOINT
          if (!response.ok) throw new Error('Failed to fetch chats');
          
          const chatData: ChatHistoryRecord[] = await response.json();

          // --- Step C: Merge the saved chats into your local docs ---
          const mergedDocuments = localDocuments.map(localDoc => {
            const savedChat = chatData.find(chat => chat.docId === localDoc.id);
            return savedChat
              ? { ...localDoc, chatHistory: savedChat.chatHistory }
              : localDoc;
          });

          setDocuments(mergedDocuments);

        } catch (error) {
          console.error("Failed to fetch chat histories:", error);
          // If it fails, we still have the local docs
          setDocuments(localDocuments);
        }
        setIsLoadingDocs(false);
      };

      fetchChatHistories();

    } else {
      setDocuments([]); // Clear docs on logout
    }
  }, [isAuthenticated]);

  // --- 3. UPLOAD IS LOCAL-ONLY ---
  // This function is simple again. No `async`, no API call.
  const handleUploadDocument = (file: File, documentType: DocumentType) => {
    console.log(`Uploading ${file.name} of type ${documentType}`);
    const fileUrl = URL.createObjectURL(file);
    const newDoc: Document = {
      id: Date.now().toString(), // Local-only ID
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'analyzed',
      fileUrl: fileUrl,
      evals: {
        riskScore: Math.floor(Math.random() * 100),
        complexity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        clauses: Math.floor(Math.random() * 30) + 5
      },
      risks: [{ id: `r${Date.now()}`, title: 'Sample Risk', severity: 'medium', description: '...'}],
      clauses: [{ id: `c${Date.now()}`, title: 'Sample Clause', content: '...', type: 'General'}],
      chatHistory: [], // Starts empty
    };

    setDocuments(prev => [newDoc, ...prev]);
    return newDoc; // Return it so App.tsx can select it
  };

  // --- 4. DELETE IS LOCAL-ONLY ---
  // No `async`, no API call.
  const handleDeleteDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc?.fileUrl) {
      URL.revokeObjectURL(doc.fileUrl);
    }
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    console.log("Deleting document locally:", id);
    
    // You *could* add an API call here to delete the chat history
    // fetch(`/api/chats/${id}`, { method: 'DELETE' });
    // But it's not required.
  };

  // --- 5. SEND MESSAGE IS THE *ONLY* MAIN API CALL ---
  const handleSendMessage = async (documentId: string, messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    const doc = documents.find(d => d.id === documentId);
    if (!doc) return;

    const currentChatHistory = doc.chatHistory || [];

    // Optimistic Update 1 (Show user message)
    setDocuments(prevDocs =>
      prevDocs.map(d =>
        d.id === documentId
          ? { ...d, chatHistory: [...currentChatHistory, userMessage] }
          : d
      )
    );

    // --- Simulate AI Reply ---
    await new Promise(res => setTimeout(res, 1000));
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `[Chat reply for ${doc.name}] You said: "${messageText}"`,
      timestamp: new Date().toISOString(),
      sources: ["Source 1", 
        "Source 2"
      ]
    };
    // -----------------------

    const newChatHistory = [...currentChatHistory, userMessage, assistantMessage];

    // Optimistic Update 2 (Show assistant message)
    setDocuments(prevDocs =>
      prevDocs.map(d =>
        d.id === documentId
          ? { ...d, chatHistory: newChatHistory }
          : d
      )
    );

    // --- API CALL: SAVE *JUST* THIS CHAT HISTORY ---
    try {
      // This endpoint finds or creates a chat record for `documentId`
      // and overwrites its `chatHistory` field.
      await fetch(`/api/chats/${documentId}`, { // <-- YOUR CHAT SAVE/PATCH ENDPOINT
        method: 'POST', // or 'PUT' or 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatHistory: newChatHistory }), // Send only the new history
      });
      console.log(`Chat history saved for doc ${documentId}`);

    } catch (error) {
      console.error("Failed to save chat:", error);
      // Rollback on failure
      setDocuments(prevDocs =>
        prevDocs.map(d =>
          d.id === documentId
            ? { ...d, chatHistory: currentChatHistory } // Revert
            : d
        )
      );
    }
  };

  // (Download is local-only)
  const handleDownloadDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc?.fileUrl) {
      const link = document.createElement('a');
      link.href = doc.fileUrl;
      link.download = doc.name;
      link.click();
    }
  };

  return {
    documents,
    isLoadingDocs,
    handleUploadDocument,
    handleDeleteDocument,
    handleDownloadDocument,
    handleSendMessage
  };
}