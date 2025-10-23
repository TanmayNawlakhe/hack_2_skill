import { MainApp, type Document, type DocumentType } from '../MainApp';

const initialDocuments: Document[] = [
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
  },
  {
  id: '4',
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
    id: '5',
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
    id: '6',
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
  },
  {
    id: '7',
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
    id: '8',
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
    id: '9',
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
];

export default initialDocuments;