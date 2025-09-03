import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    name: "Data Analytics",
    skills: [
      { name: "Python (Pandas, NumPy)", icon: "python", level: 90 },
      { name: "SQL (MySQL, PostgreSQL)", icon: "sql", level: 85 },
      { name: "Excel & Google Sheets", icon: "excel", level: 88 },
      { name: "Data Visualization (Matplotlib, Seaborn)", icon: "visualization", level: 82 },
      { name: "Power BI", icon: "powerbi", level: 80 },
      { name: "Tableau", icon: "tableau", level: 75 },
      { name: "Data Cleaning & Preparation", icon: "cleaning", level: 87 },
      { name: "Statistical Analysis", icon: "statistics", level: 80 }
    ]
  },
  {
    name: "Business Intelligence",
    skills: [
      { name: "Dashboard Design", icon: "dashboard", level: 85 },
      { name: "Reporting & Insights", icon: "reporting", level: 88 },
      { name: "ETL Processes", icon: "etl", level: 80 },
      { name: "Data Warehousing", icon: "warehouse", level: 75 }
    ]
  },
  {
    name: "Machine Learning",
    skills: [
      { name: "Scikit-learn", icon: "scikit", level: 75 },
      { name: "Regression & Classification", icon: "ml", level: 70 },
      { name: "Model Evaluation", icon: "evaluation", level: 72 },
      { name: "Jupyter Notebook", icon: "jupyter", level: 80 }
    ]
  },
  {
    name: "Other Skills",
    skills: [
      { name: "Git & GitHub", icon: "git", level: 88 },
      { name: "Technical Writing", icon: "writing", level: 82 }
    ]
  },
  {
    name: "Soft Skills",
    skills: [
      { name: "Communication", icon: "communication", level: 90 },
      { name: "Problem Solving", icon: "problem", level: 92 },
      { name: "Team Collaboration", icon: "team", level: 88 },
      { name: "Time Management", icon: "time", level: 85 },
      { name: "Adaptability", icon: "adapt", level: 90 },
      { name: "Project Management", icon: "project", level: 83 }
    ]
  }
];
