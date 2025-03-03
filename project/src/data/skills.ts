import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    skills: [
      { name: "HTML5 & CSS3", icon: "html", level: 95 },
      { name: "JavaScript (ES6+)", icon: "javascript", level: 92 },
      { name: "TypeScript", icon: "typescript", level: 85 },
      { name: "React.js", icon: "react", level: 90 },
      // { name: "Vue.js", icon: "vue", level: 80 },
      { name: "Next.js", icon: "next", level: 85 },
      { name: "Tailwind CSS", icon: "tailwind", level: 88 },
      { name: "Framer Motion", icon: "framer", level: 82 },
      { name: "Responsive Design", icon: "responsive", level: 95 }
    ]
  },
  {
    name: "UI/UX Design",
    skills: [
      { name: "Figma", icon: "figma", level: 90 },
      { name: "Adobe XD", icon: "xd", level: 85 },
      { name: "Sketch", icon: "sketch", level: 75 },
      // { name: "Prototyping", icon: "prototype", level: 88 },
      { name: "User Research", icon: "research", level: 80 },
      // { name: "Wireframing", icon: "wireframe", level: 92 },
      { name: "Design Systems", icon: "design-system", level: 87 },
      { name: "Interaction Design", icon: "interaction", level: 84 },
      { name: "Visual Design", icon: "visual", level: 89 }
    ]
  },
  {
    name: "Backend Development",
    skills: [
      { name: "Node.js", icon: "node", level: 75 },
      { name: "Express.js", icon: "express", level: 78 },
      // { name: "RESTful APIs", icon: "api", level: 85 },
      { name: "Python", icon: "python", level: 85 },
      { name: "Machine Learning", icon: "Machine Learning", level: 65 },
      // { name: "GraphQL", icon: "graphql", level: 70 },
      { name: "MongoDB", icon: "mongodb", level: 72 },
      // { name: "Firebase", icon: "firebase", level: 80 },
      { name: "SQL Basics", icon: "sql", level: 65 }
    ]
  },
  {
    name: "Other Skills",
    skills: [
      { name: "Git & GitHub", icon: "git", level: 88 },
      { name: "Performance Optimization", icon: "performance", level: 85 },
      // { name: "Accessibility (WCAG)", icon: "accessibility", level: 80 },
      // { name: "Testing (Jest, Cypress)", icon: "testing", level: 75 },
      // { name: "CI/CD Basics", icon: "cicd", level: 70 },
      // { name: "SEO Fundamentals", icon: "seo", level: 78 },
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
      // { name: "Client Relations", icon: "client", level: 87 },
      { name: "Project Management", icon: "project", level: 83 }
    ]
  }
];
