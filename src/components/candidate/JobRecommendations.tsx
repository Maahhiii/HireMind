import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"

const jobs = [
  { title: "Frontend Developer", company: "Tech Corp", match: 90 },
  { title: "Fullstack Engineer", company: "InnovateX", match: 85 },
  { title: "React Developer", company: "Startup Hub", match: 78 },
]

const JobRecommendations = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-sm text-gray-600">{job.company} • Match {job.match}%</p>
            </div>
            <Button size="sm">Apply</Button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default JobRecommendations
