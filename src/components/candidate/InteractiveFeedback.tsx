import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button-custom"

const feedbackList = [
  {
    type: "improvement",
    icon: AlertCircle,
    title: "Skills Section",
    message: "Add 'React.js' and 'TypeScript' to match job descriptions.",
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Keywords",
    message: "Include keywords like 'Agile' and 'CI/CD'.",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Experience Format",
    message: "Your achievements are well-defined. Good job!",
  },
]

const getColor = (type: string) => {
  switch (type) {
    case "success": return "text-green-600"
    case "improvement": return "text-amber-600"
    case "suggestion": return "text-blue-600"
    default: return "text-gray-600"
  }
}

const InteractiveFeedback = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
      <div className="space-y-4">
        {feedbackList.map((fb, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg border"
          >
            <div className="flex items-start space-x-3">
              <fb.icon className={`h-5 w-5 ${getColor(fb.type)} mt-0.5`} />
              <div className="flex-1">
                <h4 className="font-medium text-text-heading">{fb.title}</h4>
                <p className="text-sm text-text-body mb-2">{fb.message}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Apply</Button>
                  <Button size="sm" variant="ghost">Ignore</Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default InteractiveFeedback
