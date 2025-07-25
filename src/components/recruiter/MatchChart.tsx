import { motion } from "framer-motion"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register all required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const MatchChart = () => {
  const chartData = {
    labels: ['90-100%', '80-89%', '70-79%', '60-69%', '50-59%'],
    datasets: [
      {
        label: 'Candidates',
        data: [2, 8, 12, 6, 3],
        backgroundColor: 'hsl(221, 83%, 53%)',
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Candidate Match Distribution',
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Candidates' } },
      x: { title: { display: true, text: 'Match Score Range' } },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card p-6"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  )
}

export default MatchChart
