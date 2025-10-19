import { useState } from 'react';
import { DocumentSidebar } from './DocumentSidebar';
import { DocumentView } from './DocumentView';
import { UploadDialog } from './UploadDialog';
import { Shield, Upload, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface MainAppProps {
  onLogout: () => void;
}

export interface Document {
  id: string;
  name: string;
  uploadDate: string;
  status: 'analyzed' | 'processing' | 'pending';
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

export function MainApp({ onLogout }: MainAppProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Service Agreement 2024.pdf',
      uploadDate: '2024-03-15',
      status: 'analyzed',
      evals: { riskScore: 65, complexity: 'Medium', clauses: 24 },
      risks: [
        { id: 'r1', title: 'Ambiguous Termination Clause', severity: 'high', description: 'The termination clause lacks clarity on notice period and conditions for early termination.' },
        { id: 'r2', title: 'Limited Liability Cap', severity: 'medium', description: 'Liability is capped at contract value, which may be insufficient for certain scenarios.' },
        { id: 'r3', title: 'Auto-Renewal Terms', severity: 'low', description: 'Contract auto-renews unless notice is provided 60 days in advance.' }
      ],
      clauses: [
        { id: 'c1', title: 'Term and Termination', content: 'This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months...', type: 'Duration' },
        { id: 'c2', title: 'Payment Terms', content: 'Client agrees to pay Service Provider the fees as outlined in Schedule A...', type: 'Financial' },
        { id: 'c3', title: 'Confidentiality', content: 'Each party agrees to maintain the confidentiality of all proprietary information...', type: 'Protection' }
      ]
    },
    {
      id: '2',
      name: 'NDA - Tech Corp.pdf',
      uploadDate: '2024-03-10',
      status: 'analyzed',
      evals: { riskScore: 32, complexity: 'Low', clauses: 8 },
      risks: [
        { id: 'r4', title: 'Broad Definition of Confidential Info', severity: 'medium', description: 'Definition may be too broad and include publicly available information.' }
      ],
      clauses: [
        { id: 'c4', title: 'Definition of Confidential Information', content: 'Confidential Information means any data or information that is proprietary to the Disclosing Party...', type: 'Definition' }
      ]
    },
    {
      id: '3',
      name: 'Employment Contract - Jane.pdf',
      uploadDate: '2024-03-08',
      status: 'analyzed',
      evals: { riskScore: 78, complexity: 'High', clauses: 31 },
      risks: [
        { id: 'r5', title: 'Non-Compete Clause', severity: 'high', description: 'Non-compete terms extend for 24 months and cover a broad geographic area.' },
        { id: 'r6', title: 'IP Assignment', severity: 'high', description: 'All intellectual property created during employment is assigned to employer, including personal projects.' }
      ],
      clauses: [
        { id: 'c5', title: 'Non-Compete Agreement', content: 'Employee agrees not to engage in any business that competes with the Company...', type: 'Restrictive' }
      ]
    }
  ]);

  const selectedDocument = documents.find(doc => doc.id === selectedDocId);

  const handleUploadDocument = (file: File, documentType: DocumentType) => {
    console.log(`Uploading ${file.name} of type ${documentType}`);
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'analyzed',
      evals: {
        riskScore: Math.floor(Math.random() * 100),
        complexity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        clauses: Math.floor(Math.random() * 30) + 5
      },
      risks: [
        {
          id: `r${Date.now()}`,
          title: 'Sample Risk Detected',
          severity: 'medium',
          description: 'This is a sample risk identified in the uploaded document.'
        }
      ],
      clauses: [
        {
          id: `c${Date.now()}`,
          title: 'Sample Clause',
          content: 'This is a sample clause from the uploaded document...',
          type: 'General'
        }
      ]
    };

    setDocuments(prev => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    setUploadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02051a] to-[#03071e] flex flex-col">
      <header className="border-b border-gray-800/50 bg-[#1a1f3a]/30 backdrop-blur-xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white text-xl">DocuLex AI</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-gray-700 text-white hover:bg-black hover:text-white bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <DocumentSidebar
          documents={documents}
          selectedDocId={selectedDocId}
          onSelectDocument={setSelectedDocId}
        />
        <DocumentView document={selectedDocument} />
      </div>

      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUpload={handleUploadDocument}
      />
    </div>
  );
}