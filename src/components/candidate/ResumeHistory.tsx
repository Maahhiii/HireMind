import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"
import { FileText, Download } from "lucide-react"

const resumes = [
  { name: "Resume_July2025.pdf", date: "20 July 2025" },
  { name: "Resume_June2025.pdf", date: "15 June 2025" },
]

const ResumeHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Resume History</h3>
      <div className="space-y-3">
        {resumes.map((res, i) => (
          <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{res.name}</p>
                <p className="text-xs text-gray-500">{res.date}</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ResumeHistory
