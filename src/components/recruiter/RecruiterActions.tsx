import { motion } from "framer-motion"
import { Button } from "@/components/ui/button-custom"

const RecruiterActions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="glass-card p-6"
  >
    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
    <div className="space-y-2">
      <Button variant="outline" size="sm" className="w-full">Schedule Interviews</Button>
      <Button variant="outline" size="sm" className="w-full">Send Bulk Emails</Button>
      <Button variant="outline" size="sm" className="w-full">Export Shortlist</Button>
      <Button variant="ghost" size="sm" className="w-full">View Analytics</Button>
    </div>
  </motion.div>
)

export default RecruiterActions
