import { motion } from "framer-motion"
import { Users, Star, TrendingUp } from "lucide-react"

const QuickStats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="glass-card p-6"
  >
    <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Users className="h-4 w-4 text-primary" />
        <span className="font-semibold">31</span>
      </div>
      <div className="flex items-center justify-between">
        <Star className="h-4 w-4 text-amber-500" />
        <span className="font-semibold">5 Top Matches</span>
      </div>
      <div className="flex items-center justify-between">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <span className="font-semibold">Avg Score: 78%</span>
      </div>
    </div>
  </motion.div>
)

export default QuickStats
