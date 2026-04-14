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
        skills: ['RAG (Retrieval-Augmented Generation)', 'Agentic Workflows', 'LangChain', 'LlamaIndex']
      },
      {
        title: 'AI Safety & Evaluation',
        skills: ['LLM Red Teaming', 'Adversarial Robustness', 'Model Alignment', 'Safety Guardrails']
      },
      {
        title: 'Machine Learning',
        skills: ['Scikit-learn', 'NLP', 'Predictive Modeling (Regression/Classification)']
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
        skills: ['Python (Expert)', 'SQL (PostgreSQL)', 'JavaScript', 'C++ (Fundamentals)']
      },
      {
        title: 'API Architecture',
        skills: ['FastAPI', 'RESTful Design', 'Pydantic (Data Validation)']
      },
      {
        title: 'Data Engineering',
        skills: ['Pandas', 'NumPy', 'ETL Pipelines', 'Automated Feature Engineering']
      },
      {
        title: 'Data Science',
        skills: ['Exploratory Data Analysis (EDA)', 'Statistical Modeling', 'Jupyter Ecosystem']
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
        skills: ['Matplotlib', 'Seaborn', 'Plotly']
      }
    ]
  }
];
