import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"
import UploadCard from "@/components/shared/UploadCard"
import ScoreChart from "@/components/shared/ScoreChart"
import ProfileCompletion from "@/components/candidate/ProfileCompletion"
import InteractiveFeedback from "@/components/candidate/InteractiveFeedback"
import OptimizedResume from "@/components/candidate/OptimizedResume"
import JobRecommendations from "@/components/candidate/JobRecommendations"
import ResumeHistory from "@/components/candidate/ResumeHistory"
import { Sparkles } from "lucide-react"

const CandidateDashboard = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [atsScore] = useState(75) // Dummy ATS score

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setTimeout(() => setAnalysisComplete(true), 2000)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-text-heading">Candidate Dashboard</h1>
          <p className="text-lg text-text-body">Upload your resume and get AI-powered insights.</p>
        </motion.div>

        {/* Profile Completion */}
        <ProfileCompletion completion={70} />

        {/* Upload Section */}
        <UploadCard title="Upload Your Resume" description="Upload PDF, DOC, or DOCX" onFileUpload={handleFileUpload} />

        {/* Analysis Button */}
        {uploadedFile && !analysisComplete && (
          <div className="text-center">
            <Button variant="cta" size="lg" onClick={() => setAnalysisComplete(true)}>
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze Resume
            </Button>
          </div>
        )}

        {/* After Analysis */}
        {analysisComplete && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <InteractiveFeedback />
              <OptimizedResume />
              <ResumeHistory />
            </div>
            <div className="space-y-6">
              <ScoreChart score={atsScore} />
            </div>
          </div>
        )}

        {/* Job Recommendations */}
        <JobRecommendations />
      </div>
    </div>
  )
}

export default CandidateDashboard
