"use client"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Download, Code, Briefcase, User, MessageSquare, Star } from "lucide-react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

// Dynamic imports for enhanced 3D components
const AdvancedHeroSection = dynamic(
  () => import("@/components/advanced-hero-section").then((mod) => mod.AdvancedHeroSection),
  {
    ssr: false,
  },
)

const FancyProjectsSection = dynamic(
  () => import("@/components/fancy-projects-section").then((mod) => mod.FancyProjectsSection),
  {
    ssr: false,
  },
)

const HolographicAboutSection = dynamic(
  () => import("@/components/holographic-about-section").then((mod) => mod.HolographicAboutSection),
  {
    ssr: false,
  },
)

const AdvancedSkillsSection = dynamic(
  () => import("@/components/advanced-skills-section").then((mod) => mod.AdvancedSkillsSection),
  {
    ssr: false,
  },
)

const FuturisticContactSection = dynamic(
  () => import("@/components/futuristic-contact-section").then((mod) => mod.FuturisticContactSection),
  {
    ssr: false,
  },
)

const ParticleField = dynamic(() => import("@/components/particle-field").then((mod) => mod.ParticleField), {
  ssr: false,
})

const FloatingNavigation = dynamic(
  () => import("@/components/floating-navigation").then((mod) => mod.FloatingNavigation),
  {
    ssr: false,
  },
)

export default function SanjayRawatPortfolio() {
  // Enhanced Personal Information
  const personalInfo = {
    name: "Sanjay Rawat",
    title: "Full-Stack Developer & AI Engineer",
    subtitle: "Crafting Tomorrow's Digital Experiences",
    tagline: "Where Innovation Meets Excellence",
    location: "Mumbai, India",
    email: "sanjay.rawat@example.com",
    phone: "+91 98765 43210",
    website: "https://sanjayrawat.dev",
    bio: "Passionate full-stack developer with 5+ years of experience in creating revolutionary web applications, AI solutions, and immersive 3D experiences. Specialized in React, Node.js, Python, and cutting-edge technologies that shape the future.",
    resume: "/resume-sanjay-rawat.pdf",
    avatar: "/placeholder.svg?height=400&width=400",
    social: {
      github: "https://github.com/sanjayrawat",
      linkedin: "https://linkedin.com/in/sanjayrawat",
      twitter: "https://twitter.com/sanjayrawat",
      instagram: "https://instagram.com/sanjayrawat",
    },
    stats: {
      projectsCompleted: 50,
      clientsSatisfied: 25,
      yearsExperience: 5,
      technologiesMastered: 30,
    },
  }

  // Enhanced Skills with more detailed categorization
  const skillsData = {
    programmingLanguages: [
      {
        name: "JavaScript",
        percentage: 95,
        color: "#f7df1e",
        experience: "5+ years",
        category: "Frontend",
        level: "Expert",
        projects: 45,
      },
      {
        name: "TypeScript",
        percentage: 92,
        color: "#3178c6",
        experience: "4+ years",
        category: "Frontend",
        level: "Expert",
        projects: 35,
      },
      {
        name: "Python",
        percentage: 90,
        color: "#3776ab",
        experience: "4+ years",
        category: "Backend",
        level: "Expert",
        projects: 30,
      },
      {
        name: "Java",
        percentage: 85,
        color: "#ed8b00",
        experience: "3+ years",
        category: "Backend",
        level: "Advanced",
        projects: 20,
      },
      {
        name: "C++",
        percentage: 80,
        color: "#00599c",
        experience: "3+ years",
        category: "Systems",
        level: "Advanced",
        projects: 15,
      },
      {
        name: "Go",
        percentage: 75,
        color: "#00add8",
        experience: "2+ years",
        category: "Backend",
        level: "Intermediate",
        projects: 12,
      },
      {
        name: "Rust",
        percentage: 72,
        color: "#ce422b",
        experience: "2+ years",
        category: "Systems",
        level: "Intermediate",
        projects: 8,
      },
      {
        name: "SQL",
        percentage: 88,
        color: "#336791",
        experience: "4+ years",
        category: "Database",
        level: "Expert",
        projects: 40,
      },
    ],
    frontendTechnologies: [
      {
        name: "React.js",
        percentage: 96,
        color: "#61dafb",
        experience: "5+ years",
        category: "Framework",
        level: "Expert",
        projects: 50,
      },
      {
        name: "Next.js",
        percentage: 94,
        color: "#000000",
        experience: "4+ years",
        category: "Framework",
        level: "Expert",
        projects: 35,
      },
      {
        name: "Vue.js",
        percentage: 85,
        color: "#4fc08d",
        experience: "3+ years",
        category: "Framework",
        level: "Advanced",
        projects: 25,
      },
      {
        name: "Angular",
        percentage: 80,
        color: "#dd0031",
        experience: "2+ years",
        category: "Framework",
        level: "Advanced",
        projects: 15,
      },
      {
        name: "Three.js",
        percentage: 92,
        color: "#000000",
        experience: "3+ years",
        category: "3D Graphics",
        level: "Expert",
        projects: 20,
      },
      {
        name: "Tailwind CSS",
        percentage: 95,
        color: "#06b6d4",
        experience: "3+ years",
        category: "Styling",
        level: "Expert",
        projects: 45,
      },
      {
        name: "SASS/SCSS",
        percentage: 88,
        color: "#cc6699",
        experience: "4+ years",
        category: "Styling",
        level: "Expert",
        projects: 35,
      },
      {
        name: "WebGL",
        percentage: 85,
        color: "#990000",
        experience: "2+ years",
        category: "Graphics",
        level: "Advanced",
        projects: 12,
      },
    ],
    backendTechnologies: [
      {
        name: "Node.js",
        percentage: 92,
        color: "#8cc84b",
        experience: "4+ years",
        category: "Runtime",
        level: "Expert",
        projects: 40,
      },
      {
        name: "Express.js",
        percentage: 90,
        color: "#000000",
        experience: "4+ years",
        category: "Framework",
        level: "Expert",
        projects: 35,
      },
      {
        name: "Django",
        percentage: 86,
        color: "#092e20",
        experience: "3+ years",
        category: "Framework",
        level: "Advanced",
        projects: 25,
      },
      {
        name: "FastAPI",
        percentage: 84,
        color: "#009688",
        experience: "3+ years",
        category: "Framework",
        level: "Advanced",
        projects: 20,
      },
      {
        name: "GraphQL",
        percentage: 88,
        color: "#e535ab",
        experience: "3+ years",
        category: "API",
        level: "Expert",
        projects: 30,
      },
      {
        name: "REST APIs",
        percentage: 95,
        color: "#ff6b35",
        experience: "5+ years",
        category: "API",
        level: "Expert",
        projects: 50,
      },
      {
        name: "Microservices",
        percentage: 85,
        color: "#ff9500",
        experience: "3+ years",
        category: "Architecture",
        level: "Advanced",
        projects: 18,
      },
      {
        name: "Socket.io",
        percentage: 87,
        color: "#010101",
        experience: "3+ years",
        category: "Real-time",
        level: "Expert",
        projects: 15,
      },
    ],
    aiAndML: [
      {
        name: "Machine Learning",
        percentage: 87,
        color: "#ff6b6b",
        experience: "3+ years",
        category: "AI/ML",
        level: "Expert",
        projects: 25,
      },
      {
        name: "Deep Learning",
        percentage: 84,
        color: "#4ecdc4",
        experience: "3+ years",
        category: "AI/ML",
        level: "Advanced",
        projects: 20,
      },
      {
        name: "TensorFlow",
        percentage: 82,
        color: "#ff6f00",
        experience: "3+ years",
        category: "Framework",
        level: "Advanced",
        projects: 18,
      },
      {
        name: "PyTorch",
        percentage: 85,
        color: "#ee4c2c",
        experience: "3+ years",
        category: "Framework",
        level: "Advanced",
        projects: 15,
      },
      {
        name: "OpenAI APIs",
        percentage: 90,
        color: "#00a67e",
        experience: "2+ years",
        category: "API",
        level: "Expert",
        projects: 22,
      },
      {
        name: "Computer Vision",
        percentage: 80,
        color: "#9b59b6",
        experience: "2+ years",
        category: "Specialty",
        level: "Advanced",
        projects: 12,
      },
      {
        name: "NLP",
        percentage: 83,
        color: "#e74c3c",
        experience: "3+ years",
        category: "Specialty",
        level: "Advanced",
        projects: 16,
      },
      {
        name: "LangChain",
        percentage: 88,
        color: "#1c3d5a",
        experience: "2+ years",
        category: "Framework",
        level: "Expert",
        projects: 14,
      },
    ],
  }

  // Enhanced Projects with more details
  const projects = [
    {
      id: 1,
      title: "NeuroCommerce AI",
      description:
        "Revolutionary e-commerce platform powered by AI for personalized shopping experiences with neural recommendation engine.",
      longDescription:
        "A next-generation e-commerce platform that leverages artificial intelligence to create hyper-personalized shopping experiences. Features include AI-powered product recommendations, dynamic pricing, virtual try-on using AR, and predictive inventory management.",
      tags: ["React", "Node.js", "TensorFlow", "MongoDB", "Stripe", "AR"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://neurocommerce.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/neurocommerce-ai",
      featured: true,
      category: "AI/E-Commerce",
      status: "Live",
      year: "2024",
      complexity: "High",
      impact: "Revolutionary",
      technologies: ["React.js", "Node.js", "TensorFlow", "MongoDB", "Stripe API", "AR.js", "Redis", "Docker"],
      features: [
        "AI-Powered Product Recommendations",
        "Virtual Try-On with AR",
        "Dynamic Pricing Algorithm",
        "Predictive Inventory Management",
        "Real-time Analytics Dashboard",
        "Multi-language Support",
        "Advanced Search with NLP",
        "Social Commerce Integration",
      ],
      metrics: {
        users: "50K+",
        performance: "99.9%",
        satisfaction: "4.9/5",
        conversion: "+35%",
      },
    },
    {
      id: 2,
      title: "Quantum Task Orchestrator",
      description:
        "AI-powered task management system with quantum computing algorithms for optimal resource allocation and productivity optimization.",
      longDescription:
        "An advanced task management platform that uses quantum-inspired algorithms and machine learning to optimize task scheduling, resource allocation, and team productivity. Features predictive analytics and autonomous task prioritization.",
      tags: ["React", "Python", "Quantum", "FastAPI", "PostgreSQL", "Redis"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://quantum-tasks.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/quantum-task-orchestrator",
      featured: true,
      category: "AI/Productivity",
      status: "Live",
      year: "2024",
      complexity: "Extreme",
      impact: "Groundbreaking",
      technologies: ["React.js", "Python", "Qiskit", "FastAPI", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      features: [
        "Quantum-Inspired Optimization",
        "AI Task Prioritization",
        "Predictive Deadline Management",
        "Resource Allocation Algorithms",
        "Team Productivity Analytics",
        "Natural Language Processing",
        "Real-time Collaboration",
        "Advanced Reporting Dashboard",
      ],
      metrics: {
        users: "25K+",
        performance: "99.8%",
        satisfaction: "4.8/5",
        efficiency: "+45%",
      },
    },
    {
      id: 3,
      title: "HoloChat Universe",
      description:
        "Immersive 3D communication platform with holographic avatars, spatial audio, and metaverse integration for next-gen collaboration.",
      longDescription:
        "A revolutionary communication platform that combines real-time messaging, 3D holographic avatars, spatial audio, and metaverse environments. Users can meet in virtual spaces, share holographic content, and collaborate in immersive 3D environments.",
      tags: ["Three.js", "WebRTC", "Node.js", "WebGL", "Socket.io", "AR/VR"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://holochat.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/holochat-universe",
      featured: true,
      category: "Metaverse/Communication",
      status: "Beta",
      year: "2024",
      complexity: "Extreme",
      impact: "Revolutionary",
      technologies: ["Three.js", "WebRTC", "Node.js", "WebGL", "Socket.io", "WebXR", "Babylon.js", "AWS"],
      features: [
        "3D Holographic Avatars",
        "Spatial Audio Technology",
        "Virtual Meeting Rooms",
        "Real-time 3D Collaboration",
        "Metaverse Integration",
        "Cross-platform Compatibility",
        "AI-powered Moderation",
        "Blockchain Identity Verification",
      ],
      metrics: {
        users: "15K+",
        performance: "99.5%",
        satisfaction: "4.9/5",
        engagement: "+60%",
      },
    },
    {
      id: 4,
      title: "Neural Analytics Engine",
      description:
        "Advanced data visualization platform with AI-powered insights, real-time processing, and interactive 3D data exploration.",
      longDescription:
        "A sophisticated analytics platform that transforms complex datasets into interactive 3D visualizations. Features AI-powered pattern recognition, predictive analytics, and real-time data processing with immersive exploration capabilities.",
      tags: ["D3.js", "Three.js", "Python", "TensorFlow", "WebGL", "Real-time"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://neural-analytics.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/neural-analytics-engine",
      featured: false,
      category: "Data Science/AI",
      status: "Live",
      year: "2023",
      complexity: "High",
      impact: "Significant",
      technologies: ["D3.js", "Three.js", "Python", "TensorFlow", "WebGL", "Apache Kafka", "ClickHouse", "Docker"],
      features: [
        "3D Data Visualization",
        "AI Pattern Recognition",
        "Real-time Data Processing",
        "Predictive Analytics",
        "Interactive Exploration",
        "Custom Dashboard Builder",
        "Export & Sharing Tools",
        "Multi-source Data Integration",
      ],
      metrics: {
        users: "10K+",
        performance: "99.7%",
        satisfaction: "4.7/5",
        insights: "+40%",
      },
    },
    {
      id: 5,
      title: "CryptoVote Nexus",
      description:
        "Decentralized voting platform with quantum-resistant encryption, holographic verification, and transparent blockchain governance.",
      longDescription:
        "A next-generation blockchain voting system that ensures maximum security, transparency, and accessibility. Features quantum-resistant encryption, biometric verification, and real-time result visualization with immutable audit trails.",
      tags: ["Solidity", "React", "Web3", "Quantum", "Biometrics", "IPFS"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://cryptovote.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/cryptovote-nexus",
      featured: false,
      category: "Blockchain/Governance",
      status: "Development",
      year: "2024",
      complexity: "Extreme",
      impact: "Revolutionary",
      technologies: ["Solidity", "React.js", "Web3.js", "IPFS", "Ethereum", "Biometric.js", "Zero-Knowledge Proofs"],
      features: [
        "Quantum-Resistant Encryption",
        "Biometric Voter Verification",
        "Real-time Result Visualization",
        "Immutable Audit Trails",
        "Multi-signature Governance",
        "Cross-chain Compatibility",
        "Anonymous Voting Options",
        "Decentralized Identity Management",
      ],
      metrics: {
        users: "5K+",
        performance: "99.9%",
        satisfaction: "4.8/5",
        security: "Military-grade",
      },
    },
    {
      id: 6,
      title: "SmartHome Nexus AI",
      description:
        "Intelligent IoT ecosystem with AI-powered automation, predictive maintenance, and immersive 3D home management interface.",
      longDescription:
        "A comprehensive smart home platform that uses AI to learn user patterns, predict needs, and automate home management. Features include energy optimization, security monitoring, and a 3D interface for intuitive home control.",
      tags: ["IoT", "AI", "React Native", "Python", "3D Interface", "Edge Computing"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://smarthome.sanjayrawat.dev",
      githubUrl: "https://github.com/sanjayrawat/smarthome-nexus-ai",
      featured: false,
      category: "IoT/Smart Home",
      status: "Live",
      year: "2023",
      complexity: "High",
      impact: "Innovative",
      technologies: ["React Native", "Python", "TensorFlow Lite", "MQTT", "InfluxDB", "Three.js", "Edge AI"],
      features: [
        "AI-Powered Automation",
        "Predictive Maintenance",
        "3D Home Interface",
        "Energy Optimization",
        "Security Monitoring",
        "Voice Control Integration",
        "Weather-based Adjustments",
        "Remote Management App",
      ],
      metrics: {
        users: "8K+",
        performance: "99.6%",
        satisfaction: "4.6/5",
        efficiency: "+30%",
      },
    },
  ]

  // Enhanced Experience Data
  const experience = [
    {
      id: 1,
      company: "TechCorp Innovations",
      position: "Senior Full-Stack Developer & AI Architect",
      duration: "2022 - Present",
      location: "Mumbai, India",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
      description:
        "Leading development of next-generation web applications and AI solutions. Architecting scalable systems and mentoring development teams while driving innovation in emerging technologies.",
      achievements: [
        "Architected and led development of 5 major AI-powered applications serving 200K+ users",
        "Implemented advanced CI/CD pipelines reducing deployment time by 75% and improving reliability",
        "Mentored 8 junior developers and established coding standards adopted company-wide",
        "Designed microservices architecture handling 1M+ daily transactions with 99.9% uptime",
        "Pioneered integration of AI/ML models resulting in 40% improvement in user engagement",
      ],
      technologies: ["React", "Node.js", "Python", "TensorFlow", "AWS", "Docker", "Kubernetes", "GraphQL"],
      projects: ["NeuroCommerce AI", "Quantum Task Orchestrator", "HoloChat Universe"],
    },
    {
      id: 2,
      company: "InnovateLabs Digital",
      position: "Full-Stack Developer & 3D Specialist",
      duration: "2020 - 2022",
      location: "Bangalore, India",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
      description:
        "Specialized in creating immersive web experiences with 3D graphics and real-time interactions. Developed multiple award-winning applications and contributed to open-source projects.",
      achievements: [
        "Built 8 production applications with 3D interfaces serving 100K+ users globally",
        "Optimized application performance achieving 95+ Lighthouse scores across all metrics",
        "Integrated advanced payment systems and third-party APIs for seamless user experiences",
        "Contributed to 5 open-source projects with 10K+ GitHub stars combined",
        "Won 'Innovation Award' for developing industry-first 3D data visualization tool",
      ],
      technologies: ["React", "Vue.js", "Three.js", "WebGL", "Python", "Django", "MongoDB", "AWS"],
      projects: ["Neural Analytics Engine", "3D Portfolio Platform", "Interactive Data Explorer"],
    },
    {
      id: 3,
      company: "StartupXYZ Technologies",
      position: "Frontend Developer & UI/UX Designer",
      duration: "2019 - 2020",
      location: "Delhi, India",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
      description:
        "Focused on creating beautiful, responsive user interfaces and exceptional user experiences. Collaborated with design teams to implement pixel-perfect designs with smooth animations.",
      achievements: [
        "Developed 12 responsive web applications with modern UI/UX principles",
        "Implemented advanced CSS animations and micro-interactions improving user engagement by 45%",
        "Achieved 98+ Google PageSpeed scores through performance optimization techniques",
        "Collaborated with backend teams for seamless API integration and data flow",
        "Established design system and component library used across 15+ projects",
      ],
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "SASS", "Bootstrap", "Figma", "Git"],
      projects: ["E-commerce Platform", "Corporate Website", "Mobile-first Applications"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col theme-transition theme-bg-primary theme-text-primary relative overflow-hidden">
      {/* Advanced Background Effects */}
      <ParticleField />

      {/* Floating Navigation */}
      <FloatingNavigation />

      {/* Enhanced Header */}
      <header className="fixed top-0 z-50 w-full glass-effect-advanced theme-border-accent backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-bold text-2xl gradient-text-primary hover:animate-text-glow transition-all duration-300 relative group"
          >
            <span className="relative z-10">{personalInfo.name}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-yellow-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </Link>

          <nav className="hidden md:flex gap-8">
            {[
              { href: "#about", icon: User, label: "ABOUT" },
              { href: "#projects", icon: Briefcase, label: "PROJECTS" },
              { href: "#skills", icon: Code, label: "SKILLS" },
              { href: "#contact", icon: MessageSquare, label: "CONTACT" },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className="nav-link-advanced group">
                <Icon className="inline w-4 h-4 mr-2 group-hover:animate-pulse" />
                {label}
                <span className="nav-underline-advanced"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="cyber-button-advanced group">
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              <span className="relative z-10">RESUME</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Advanced Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <AdvancedHeroSection personalInfo={personalInfo} />
        </section>

        {/* Holographic About Section */}
        <section id="about" className="relative py-32 overflow-hidden">
          <HolographicAboutSection personalInfo={personalInfo} experience={experience} />
        </section>

        {/* Fancy Projects Section */}
        <section id="projects" className="relative py-32 overflow-hidden">
          <FancyProjectsSection projects={projects} />
        </section>

        {/* Advanced Skills Section */}
        <section id="skills" className="relative py-32 overflow-hidden">
          <AdvancedSkillsSection skillsData={skillsData} />
        </section>

        {/* Futuristic Contact Section */}
        <section id="contact" className="relative py-32 overflow-hidden">
          <FuturisticContactSection personalInfo={personalInfo} />
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="glass-effect-advanced py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-pink-500/5 to-yellow-500/5"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-3 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold gradient-text-primary mb-2">{personalInfo.name}</h3>
              <p className="text-sm theme-text-secondary font-mono">
                © {new Date().getFullYear()} | Crafted with ❤️ and ⚡ in India
              </p>
            </div>

            <div className="flex justify-center gap-6">
              {[
                { href: personalInfo.social.github, icon: Github, label: "GitHub" },
                { href: personalInfo.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: personalInfo.social.twitter, icon: Twitter, label: "Twitter" },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Button key={label} variant="ghost" size="icon" className="social-icon-advanced group" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
                  </a>
                </Button>
              ))}
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-2 text-sm theme-text-accent-primary">
                <Star className="h-4 w-4 animate-pulse" />
                <span className="font-mono">Status: Available for Projects</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
