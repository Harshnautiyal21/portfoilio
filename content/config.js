export const portfolioConfig = {
  name: "Harsh Nautiyal",
  title: "AI & Data Engineer",
  headline: "Building Intelligent Systems That Automate Decision Making",
  subheadline: "AI & Data Engineer | MCA Student | 23 y/o",
  about:
    "I'm Harsh Nautiyal, a 23-year-old AI & Data enthusiast pursuing my MCA. I build intelligent data pipelines, train machine learning models, and architect end-to-end AI systems. Passionate about turning raw data into decisions that matter.",
  resumeUrl: "/resume.pdf",

  contact: {
    email: "harsh.nautiyal@email.com",
    linkedin: "https://linkedin.com/in/harshnautiyal",
    github: "https://github.com/harshnautiyal",
  },

  skills: [
    {
      category: "AI / ML",
      icon: "🤖",
      items: [
        { name: "Python", icon: "🐍" },
        { name: "PyTorch", icon: "🔥" },
        { name: "TensorFlow", icon: "🧠" },
        { name: "Scikit-learn", icon: "📊" },
        { name: "LangChain", icon: "🔗" },
        { name: "OpenAI API", icon: "⚡" },
        { name: "Transformers", icon: "🤗" },
        { name: "RAG Systems", icon: "📚" },
      ],
    },
    {
      category: "Data & Analytics",
      icon: "📈",
      items: [
        { name: "Apache Spark", icon: "✨" },
        { name: "Apache Kafka", icon: "📨" },
        { name: "dbt", icon: "🔧" },
        { name: "Airflow", icon: "🌪️" },
        { name: "Pandas", icon: "🐼" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Snowflake", icon: "❄️" },
      ],
    },
    {
      category: "Engineering & Infra",
      icon: "⚙️",
      items: [
        { name: "Docker", icon: "🐳" },
        { name: "Kubernetes", icon: "☸️" },
        { name: "AWS", icon: "☁️" },
        { name: "FastAPI", icon: "🚀" },
        { name: "Next.js", icon: "▲" },
        { name: "Git", icon: "🔀" },
        { name: "Linux", icon: "🐧" },
        { name: "MLflow", icon: "📋" },
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "AutoAgent — Autonomous AI Agent",
      description:
        "A fully autonomous AI agent built with LangChain and GPT-4 that can browse the web, write code, execute tasks, and self-correct. Implements ReAct reasoning loops with persistent memory and tool use.",
      tags: ["Python", "LangChain", "GPT-4", "FastAPI", "Redis", "Docker"],
      demoUrl: "#",
      githubUrl: "https://github.com/harshnautiyal/autoagent",
      highlight: true,
    },
    {
      id: 2,
      title: "StreamIQ — Real-time Data Pipeline",
      description:
        "Production-grade streaming data pipeline processing 1M+ events/day using Kafka, Spark Streaming, and dbt. Ingests clickstream data, runs transformations, and serves dashboards in near real-time.",
      tags: ["Apache Kafka", "Apache Spark", "dbt", "Airflow", "Snowflake", "Python"],
      demoUrl: "#",
      githubUrl: "https://github.com/harshnautiyal/streamiq",
      highlight: false,
    },
    {
      id: 3,
      title: "ChurnSense — Predictive ML Platform",
      description:
        "End-to-end ML platform for customer churn prediction with 94% accuracy. Includes automated feature engineering, model training, hyperparameter tuning via Optuna, and a REST API for real-time inference.",
      tags: ["Python", "XGBoost", "MLflow", "FastAPI", "PostgreSQL", "Docker"],
      demoUrl: "#",
      githubUrl: "https://github.com/harshnautiyal/churnsense",
      highlight: false,
    },
  ],

  skillRadar: [
    { name: "Python", proficiency: 95 },
    { name: "PyTorch", proficiency: 85 },
    { name: "LangChain", proficiency: 88 },
    { name: "Spark", proficiency: 82 },
    { name: "Docker", proficiency: 90 },
    { name: "FastAPI", proficiency: 88 },
    { name: "Next.js", proficiency: 78 },
    { name: "PostgreSQL", proficiency: 80 },
  ],

  timeline: [
    {
      year: "2021",
      title: "Started BCA",
      description:
        "Began Bachelor of Computer Applications. Discovered Python and fell in love with programming and data.",
    },
    {
      year: "2022",
      title: "First ML Model",
      description:
        "Built my first machine learning model — a spam classifier using Naive Bayes. Got hooked on AI/ML from that day.",
    },
    {
      year: "2023",
      title: "Data Engineering Deep Dive",
      description:
        "Mastered the modern data stack: Spark, Kafka, Airflow, dbt. Built first production data pipeline processing real-time events.",
    },
    {
      year: "2024",
      title: "MCA + AI Agents",
      description:
        "Started MCA program while diving deep into LLMs, RAG systems, and autonomous AI agents. Built AutoAgent.",
    },
    {
      year: "2025",
      title: "Open to Opportunities",
      description:
        "Actively seeking roles in AI Engineering, Data Engineering, or ML Engineering. Let's build something impactful.",
    },
    {
      year: "2026",
      title: "MCA Completion",
      description: "Expected graduation. Vision: Lead AI systems at scale, solve real-world problems with data and intelligence.",
    },
  ],
};
