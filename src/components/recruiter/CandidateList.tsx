import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"
import { Filter, Download, Mail, Phone, Calendar } from "lucide-react"

interface ResumeCandidate {
  _id: string
  atsScore: number
  fileUrl: string
  skills: string[]
  summary?: string
  user: {
    name: string
    email: string
    phone?: string
    location?: string
  }
  createdAt?: string
}

interface CandidateListProps {
  candidates: ResumeCandidate[]
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  const downloadResume = (url: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = url.split("/").pop() || "resume.pdf"
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-heading">Candidate Rankings</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {candidates.map((c, index) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-text-heading">{c.user?.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-text-muted">
                  <span className="flex items-center">
                    <Mail className="h-3 w-3 mr-1" /> {c.user?.email}
                  </span>
                  {c.user?.phone && (
                    <span className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" /> {c.user.phone}
                    </span>
                  )}
                </div>
                <p className="text-sm mt-1 text-text-body">
                  {c.summary || "No summary available"}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(c.atsScore)}`}>
                  {c.atsScore}% match
                </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {c.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{c.skills.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => downloadResume(c.fileUrl)}>
                    <Download className="mr-2 h-3 w-3" /> Resume
                  </Button>
                  <Button variant="default" size="sm">
                    <Calendar className="mr-2 h-3 w-3" /> Interview
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CandidateList
