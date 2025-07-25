import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"
import { Sparkles, Download } from "lucide-react"

const OptimizedResume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold text-text-heading">AI-Optimized Resume</h3>
      </div>
      <p className="text-sm text-text-body mb-3">
        Generate an AI-enhanced version of your resume to match job descriptions.
      </p>
      <Button variant="cta" size="sm" disabled>
        <Download className="mr-2 h-4 w-4" />
        Generate (Coming Soon)
      </Button>
    </motion.div>
  )
}

export default OptimizedResume
