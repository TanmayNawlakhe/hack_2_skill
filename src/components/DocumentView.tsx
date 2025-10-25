import type { Document, Message } from './MainApp'; // Import Message
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { AlertTriangle, FileCheck, MessageSquare, TrendingUp } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { Progress } from './ui/progress';
import { DocumentExtrasSidebar } from './DocumentExtrasSidebar';

interface DocumentViewProps {
  document: Document | undefined;
  // --- ADDED ---
  onSendMessage: (documentId: string, messageText: string) => Promise<void>;
  // -----------
}

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export function DocumentView({ document, onSendMessage }: DocumentViewProps) {
  if (!document) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileCheck className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-gray-700 dark:text-gray-400 text-lg mb-2">No Document Selected</h3>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Select a document from the sidebar to view analysis</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'text-red-700 bg-red-100/50 dark:text-red-400 dark:bg-red-500/20';
      case 'medium': return 'text-yellow-700 bg-yellow-100/50 dark:text-yellow-400 dark:bg-yellow-500/20';
      case 'low': return 'text-green-700 bg-green-100/50 dark:text-green-400 dark:bg-green-500/20';
    }
  };

  return (
    <motion.div
      key={document.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col"
    >
      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        <div className="h-[10vh] border-b border-gray-200 dark:border-gray-800/50 bg-white/50 dark:bg-[#1a1f3a]/20 backdrop-blur-sm px-6 py-1">
          <TabsList className="bg-transparent border-0 flex gap-4 h-14 py-2">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-100 mt-2 dark:bg-transparent dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-blue-600/20 dark:data-[state=active]:to-purple-600/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="risks"
              className="data-[state=active]:bg-blue-100  mt-2 dark:bg-transparent dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-blue-600/20 dark:data-[state=active]:to-purple-600/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Risks
            </TabsTrigger>
            <TabsTrigger
              value="clauses"
              className="data-[state=active]:bg-blue-100   mt-2 dark:bg-transparent dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-blue-600/20 dark:data-[state=active]:to-purple-600/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Clauses
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-blue-100  mt-2 dark:bg-transparent dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-blue-600/20 dark:data-[state=active]:to-purple-600/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-white text-gray-600 dark:text-gray-400"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-auto m-0 px-6" asChild>
              <motion.div key="overview" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit"
                className="flex flex-row w-full h-full">
                <ScrollArea className="h-[88vh] w-[70%] pr-4 pt-1 [&_[data-orientation='vertical']]:hidden [&_[data-orientation='horizontal']]:hidden">
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 mb-3">Uploaded on {document.uploadDate}</motion.p>

                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-4">
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Risk Score</div>
                        <div className="text-black dark:text-white text-2xl mb-2">{document.evals.riskScore}/100</div>
                        <Progress value={document.evals.riskScore} className="h-2" />
                      </motion.div>
                      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-4">
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Complexity</div>
                        <div className="text-black dark:text-white text-2xl">{document.evals.complexity}</div>
                      </motion.div>
                      <motion.div variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-4">
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Clauses</div>
                        <div className="text-black dark:text-white text-2xl">{document.evals.clauses}</div>
                      </motion.div>
                    </motion.div>

                    <div className="mb-8">
                      <motion.h3 variants={itemVariants} className="text-black dark:text-white text-lg mb-4">Key Risks</motion.h3>
                      <motion.div variants={containerVariants} className="space-y-3">
                        {document.risks.map((risk) => (
                          <motion.div key={risk.id} variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className={`w-5 h-5 ${risk.severity === 'high' ? 'text-red-600 dark:text-red-400' : risk.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-black dark:text-white">{risk.title}</h4>
                                  <span className={`px-2 py-0.5 rounded text-xs ${getRiskColor(risk.severity)}`}>{risk.severity}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{risk.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    <div>
                      <motion.h3 variants={itemVariants} className="text-black dark:text-white text-lg mb-4">Top Clauses</motion.h3>
                      <motion.div variants={containerVariants} className="space-y-3">
                        {document.clauses.slice(0, 3).map((clause) => (
                          <motion.div key={clause.id} variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-black dark:text-white">{clause.title}</h4>
                              <span className="px-2 py-0.5 rounded text-xs bg-blue-100/50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">{clause.type}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{clause.content}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </ScrollArea>
                <DocumentExtrasSidebar document={document} />
              </motion.div>
            </TabsContent>

            <TabsContent value="risks" className="h-auto m-0 px-6" asChild>
              <motion.div key="risks" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-row w-full h-full">
                <ScrollArea className="flex-1 h-[87vh] pr-6 pt-2 hide-scrollbar">
                  <motion.div className="max-w-full" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 variants={itemVariants} className="text-black dark:text-white text-2xl mb-6">Risk Analysis</motion.h2>
                    <motion.div variants={containerVariants} className="space-y-4">
                      {document.risks.map((risk) => (
                        <motion.div key={risk.id} variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-5">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${risk.severity === 'high' ? 'bg-red-100/50 dark:bg-red-500/20' : risk.severity === 'medium' ? 'bg-yellow-100/50 dark:bg-yellow-500/20' : 'bg-green-100/50 dark:bg-green-500/20'}`}>
                              <AlertTriangle className={`w-6 h-6 ${risk.severity === 'high' ? 'text-red-600 dark:text-red-400' : risk.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-black dark:text-white text-lg">{risk.title}</h4>
                                <span className={`px-2 py-1 rounded text-xs uppercase ${getRiskColor(risk.severity)}`}>{risk.severity} risk</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400">{risk.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </ScrollArea>
                <DocumentExtrasSidebar document={document} />
              </motion.div>
            </TabsContent>

            <TabsContent value="clauses" className="h-auto m-0 px-6" asChild>
              <motion.div key="clauses" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-row w-full h-full">
                <ScrollArea className="flex-1 h-[87vh] hide-scrollbar pr-6 pt-2">
                  <motion.div className="max-w-full" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h2 variants={itemVariants} className="text-black dark:text-white text-2xl mb-6">Document Clauses</motion.h2>
                    <motion.div variants={containerVariants} className="space-y-4">
                      {document.clauses.map((clause) => (
                        <motion.div key={clause.id} variants={itemVariants} className="bg-white dark:bg-[#1a1f3a]/50 border border-gray-200 dark:border-gray-800/50 rounded-xl p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-black dark:text-white text-lg">{clause.title}</h4>
                            <span className="px-3 py-1 rounded text-sm bg-blue-100/50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">{clause.type}</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{clause.content}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </ScrollArea>
                <DocumentExtrasSidebar document={document} />
              </motion.div>
            </TabsContent>

            <TabsContent value="chat" className="h-auto m-0" asChild>
              <motion.div key="chat" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="h-full flex flex-row">
                {/* --- MODIFIED --- */}
                <ChatInterface
                  documentId={document.id}
                  documentName={document.name}
                  chatHistory={document.chatHistory || []} // Pass the history
                  onSendMessage={onSendMessage} // Pass the handler
                />
                {/* ---------------- */}
                <DocumentExtrasSidebar document={document} />
              </motion.div>
            </TabsContent>
          </div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}