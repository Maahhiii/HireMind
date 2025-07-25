import React, { useEffect, useState } from "react";
import JobUpload from "@/components/recruiter/JobUpload";
import CandidateList from "@/components/recruiter/CandidateList";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface Job {
  _id: string;
  recruiter: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ResumeCandidate {
  _id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  location: string;
  lastActive: string;
  atsScore: number;
  fileUrl: string;
  user: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
  };
}

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<ResumeCandidate[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // or show a message
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/recruiter/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recruiter/candidates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch candidates");
        }

        const data = await res.json();
        setCandidates(Array.isArray(data.candidates) ? data.candidates : []);
      } catch (err: any) {
        console.error("Could not fetch candidates:", err.message);
      }
    };

    if (token && jobs.length > 0) {
      fetchCandidates();
    }
  }, [jobs, token]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10 text-lg"
      >
        Loading dashboard...
      </motion.div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4 text-center">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Always show job upload form */}
      <section>
        <JobUpload onJobCreated={(newJob: Job) => setJobs([...jobs, newJob])} />
      </section>

      {/* Jobs Section */}
      {jobs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Jobs</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Candidates Section */}
      {candidates.length > 0 && (
        <section>
          <CandidateList candidates={candidates} />
        </section>
      )}
    </div>
  );
};

export default RecruiterDashboard;
