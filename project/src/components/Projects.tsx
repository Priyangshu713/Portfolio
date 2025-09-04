import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 4,
    title: "Financial Portfolio Analysis",
    description: "A Python-based analytics tool for tracking investments, calculating returns, and visualizing portfolio performance using Pandas and Matplotlib.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
    link: "#",
    github: "https://github.com/Priyangshu713/financial-portfolio-analysis"
  },
  {
    id: 3,
    title: "Customer Churn Prediction",
    description: "A machine learning project predicting customer churn for a telecom company, including data preprocessing, model building, and evaluation.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Scikit-learn", "Data Cleaning", "Machine Learning", "Jupyter Notebook"],
    link: "#",
    github: "https://github.com/Priyangshu713/customer-churn-prediction"
  },
  {
    id: 2,
    title: "Health Connect",
    description: "A health information platform, helping users identify potential concerns. A comprehensive health data through diverse metrics and intuitive interfaces.",
    image: "/certificates/Project2.png",
    tags: ["Python", "Scikit-learn", "Django", "Data Analysis", "Machine Learning", "Fine Tuning"],
    link: "https://health-connect-official.vercel.app/",
    github: "https://github.com/Priyangshu713/Health-Connect-App"
  },
  {
    id: 1,
    title: "Diabetes Prediction Web Application",
    description: "A machine learning-powered web app that predicts diabetes risk from user health data. Includes data cleaning, feature engineering, and model deployment.",
    image: "/certificates/Project1.png",
    tags: ["Python", "Scikit-learn", "Flask", "Data Analysis", "Machine Learning"],
    link: "https://diabetic-prediction-fontend.vercel.app/",
    github: "https://github.com/Priyangshu713/diabetes_prediction"
  }
];
