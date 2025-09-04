export interface Course {
  title: string;
  platform: string;
  year: string;
  description: string;
  icon: 'book' | 'award' | 'graduation';
  certificate: string;
}

export const courses: Course[] = [
  {
    title: 'Machine Learning A-Z',
    platform: 'Udemy',
    year: '2024',
    description: 'Learnt Machine Learning and Data Science',
    icon: 'book',
    certificate: 'https://udemy-certificate.s3.amazonaws.com/image/UC-f6159429-2487-4508-a84f-2dc6e10ad97d.jpg?v=1724420600000'
  },
  {
    title: 'The Complete Python Pro Bootcamp',
    platform: 'Udemy',
    year: 'Dec 2024',
    description: 'Covered Python, Data Science, Machine Learning, and Web Development.',
    icon: 'award',
    certificate: 'https://udemy-certificate.s3.amazonaws.com/image/UC-69b0face-5d3f-4762-862c-ccf536422250.jpg?v=1733380052000'
  },
  {
    title: 'Python Fundamentals for Beginners',
    platform: 'Great Learning',
    year: 'Jul 2023',
    description: 'Learnt Python Fundamentals',
    icon: 'book',
    certificate: 'https://dtmvamahs40ux.cloudfront.net/ComplementaryCourseCertificate/3008596/original/Priyangshu_Dutta20230728-69-1eqt5v5.jpg'
  }
];
