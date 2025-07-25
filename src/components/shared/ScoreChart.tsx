import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ScoreChartProps {
  score: number
  label?: string
  size?: number
}

const ScoreChart = ({ score, label = "ATS Score", size = 200 }: ScoreChartProps) => {
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [
          score >= 80 ? '#10B981' : score >= 60 ? '#FACC15' : '#EF4444',
          '#E5E7EB',
        ],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-500'
    return 'text-red-500'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative" style={{ width: size, height: size }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
          <span className="text-sm text-text-muted">{label}</span>
        </div>
      </div>
      <div className="text-center">
        <p className={`font-semibold ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </p>
        <p className="text-sm text-text-muted">Match Rating</p>
      </div>
    </div>
  )
}

export default ScoreChart