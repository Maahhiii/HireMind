import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { Job } from '@/pages/RecruiterDashboard' 

interface JobUploadProps {
  onJobCreated?: (newJob: Job) => void
}

const JobUpload = ({ onJobCreated }: JobUploadProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields.")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Unauthorized. Please login again.")
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recruiter/job`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success("Job created successfully")
      setTitle("")
      setDescription("")
      if (onJobCreated && res.data && res.data.job) {
        onJobCreated(res.data.job)
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800">Post a New Job</h2>

      <div>
        <label className="block mb-1 font-medium">Job Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Frontend Developer"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Job Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the role..."
          rows={5}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Job"}
      </Button>
    </form>
  )
}

export default JobUpload
