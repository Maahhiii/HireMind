import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button-custom";
import {
  FileSearch,
  Brain,
  Users,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  // Example: Replace with your real auth logic
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole"); // "candidate" | "recruiter"

  const handleRedirect = (role: "candidate" | "recruiter") => {
    if (isLoggedIn) {
      navigate(`/${role}`);
    } else {
      navigate("/login", { state: { redirectTo: `/${role}` } });
    }
  };

  const features = [
    {
      icon: FileSearch,
      title: "ATS Resume Scoring",
      description:
        "Get instant feedback on your resume with our AI-powered ATS scoring system. Optimize your resume to pass through applicant tracking systems.",
    },
    {
      icon: Brain,
      title: "Semantic Job Matching",
      description:
        "Our advanced AI understands context and skills beyond keywords to match you with the perfect opportunities or candidates.",
    },
    {
      icon: Users,
      title: "AI Interview Coach",
      description:
        "Practice with our AI interview coach to improve your performance and confidence for real interviews.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content:
        "HireMind helped me optimize my resume and land my dream job at a Fortune 500 company. The ATS scoring was incredibly accurate!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "HR Director",
      content:
        "As a recruiter, HireMind has revolutionized how we screen candidates. The semantic matching saves us hours of manual review.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Product Manager",
      content:
        "The AI interview coach feature helped me prepare for challenging technical interviews. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading leading-tight">
                  AI-Powered Recruitment,{" "}
                  <span className="text-gradient">Simplified.</span>
                </h1>
                <p className="text-xl text-text-body max-w-2xl">
                  Optimize resumes, match candidates, and prepare with AI-driven
                  interview coaching. Transform your hiring process with
                  intelligent automation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => handleRedirect("candidate")}
                >
                  For Candidates
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => handleRedirect("recruiter")}
                >
                  For Recruiters
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-text-muted">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <span>Trusted by 10k+ professionals</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src={heroIllustration}
                alt="AI-Powered Recruitment Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-text-body max-w-3xl mx-auto">
              Leverage cutting-edge artificial intelligence to streamline your
              recruitment process and make data-driven hiring decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-heading mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-body">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-text-body">
              Join thousands of satisfied candidates and recruiters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-accent fill-current"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-text-body mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-text-heading">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of professionals using AI to revolutionize
              recruitment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="cta" size="lg" className="w-full sm:w-auto">
                  Get Started as Candidate
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-secondary"
                >
                  Start Recruiting
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-text-muted">
            <p>
              © 2025 HireMind |{" "}
              <Link to="/privacy" className="hover:text-primary">
                Privacy
              </Link>{" "}
              |{" "}
              <Link to="/terms" className="hover:text-primary">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
