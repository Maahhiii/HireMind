import { motion } from "framer-motion"

interface ProfileCompletionProps {
  completion: number
}

const ProfileCompletion = ({ completion }: ProfileCompletionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold text-text-heading">Profile Completion</h3>
        <p className="text-sm text-text-body">{completion}% complete</p>
      </div>
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 32}
            strokeDashoffset={2 * Math.PI * 32 * (1 - completion / 100)}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-medium">
          {completion}%
        </span>
      </div>
    </motion.div>
  )
}

export default ProfileCompletion
