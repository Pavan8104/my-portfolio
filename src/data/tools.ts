export interface SkillSubcategory {
  title: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  subcategories: SkillSubcategory[];
}

export const toolCategories: SkillCategory[] = [
  {
    category: 'Intelligence & AI Safety',
    subcategories: [
      {
        title: 'Generative AI',
        skills: ['RAG (Retrieval-Augmented Generation)', 'Agentic Workflows', 'Prompt Engineering', 'LangChain']
      },
      {
        title: 'AI Safety & Evaluation',
        skills: ['LLM Red Teaming', 'Adversarial Robustness', 'Model Alignment', 'Safety Guardrails']
      },
      {
        title: 'Machine Learning',
        skills: ['NLP', 'Predictive Modeling (Regression/Classification)']
      },
      {
        title: 'Vector Infrastructure',
        skills: ['ChromaDB', 'Pinecone', 'Semantic Search Optimization']
      }
    ]
  },
  {
    category: 'Backend & Engineering',
    subcategories: [
      {
        title: 'Core Languages',
        skills: ['Python (Expert)', 'JavaScript', 'C++ (Fundamentals)']
      },
      {
        title: 'API Architecture',
        skills: ['FastAPI', 'RESTful Design', 'Pydantic (Data Validation)', 'JWT Authentication', 'RBAC (Role-Based Access Control)']
      },
      {
        title: 'Database & ORM',
        skills: ['PostgreSQL', 'MongoDB', 'Database Design', 'SQLAlchemy']
      },
      {
        title: 'Data Engineering',
        skills: ['Pandas', 'NumPy', 'ETL Pipelines', 'Feature Engineering']
      },
      {
        title: 'Data Science',
        skills: ['Scikit-learn', 'Matplotlib', 'Seaborn', 'EDA']
      },
      {
        title: 'Optional / Advanced',
        skills: ['Power BI', 'Tableau', 'PyTorch', 'TensorFlow']
      }
    ]
  },
  {
    category: 'Infrastructure & Cloud',
    subcategories: [
      {
        title: 'Containerization',
        skills: ['Docker', 'Multi-stage Builds']
      },
      {
        title: 'Cloud Services',
        skills: ['AWS (EC2, S3, Lambda)', 'Serverless Architecture']
      },
      {
        title: 'CI/CD & Version Control',
        skills: ['GitHub Actions', 'Git', 'Automated Testing (Pytest)']
      },
      {
        title: 'Environment',
        skills: ['Linux/Unix', 'Shell Scripting (Bash)', 'Security Risk Management']
      }
    ]
  },
  {
    category: 'Interface & Specialized Tooling',
    subcategories: [
      {
        title: 'Frontend',
        skills: ['React.js', 'Tailwind CSS', 'Framer Motion']
      },
      {
        title: 'AI Prototyping',
        skills: ['Streamlit', 'Gradio']
      },
      {
        title: 'Visualization',
        skills: ['Plotly']
      }
    ]
  }
];
