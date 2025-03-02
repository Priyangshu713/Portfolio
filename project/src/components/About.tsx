import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);

        if (isVisible) {
          element.classList.add('appear');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const timelineItems = [
    {
      year: "2022 - Present",
      title: "Bachelor of Computer Applications (BCA)",
      company: "Global Institute of Science and Technology",
      description: "Focusing on web development, UI/UX design, and artificial intelligence. Active member of the Web Development Club.",
      icon: <BookOpen className="w-6 h-6 text-primary-500" />,
    },
    {
      year: "2024 - 2024",
      title: "Machine Learning Intern",
      company: "Euphoia GenX",
      description: "Developed a machine learning model for predicting the price of a product based on its features.",
      icon: <Award className="w-6 h-6 text-primary-500" />,
    },
    {
      year: "2020 - 2022",
      title: "High School",
      company: "Science Academy",
      description: "I'm a science student specializing in computer science. I'm currently pursuing my degree while building practical skills through projects and internships.",
      icon: <GraduationCap className="w-6 h-6 text-primary-500" />,
    },
  ];

  return (
    <section id="about" className="section bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 blur-3xl"></div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <motion.h2
          ref={titleRef}
          variants={itemVariants}
          className={`section-title ${titleInView ? 'animate-underline' : ''}`}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants} className="fade-in-left">
            <p className="text-gray-700 mb-6 leading-relaxed">
              I'm Priyangshu Dutta, a passionate Computer Science student specializing in computer science. I'm currently pursuing my degree while building practical skills through projects and internships.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              My approach combines technical learning with creative design thinking. I'm developing expertise in building responsive web applications with modern JavaScript frameworks while exploring user experience principles through coursework and personal projects.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When I'm not coding or studying, you can find me participating in hackathons, contributing to open-source projects, or sharing my knowledge through campus tech events and study groups.
            </p>

            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              variants={itemVariants}
            >
              <div className="fade-in-up stagger-1">
                <h3 className="font-serif text-xl font-bold text-primary-500 mb-2">3+</h3>
                <p className="text-gray-600">Years Coding</p>
              </div>
              <div className="fade-in-up stagger-2">
                <h3 className="font-serif text-xl font-bold text-primary-500 mb-2">15+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="fade-in-up stagger-3">
                <h3 className="font-serif text-xl font-bold text-primary-500 mb-2">5+</h3>
                <p className="text-gray-600">Hackathons</p>
              </div>
              <div className="fade-in-up stagger-4">
                <h3 className="font-serif text-xl font-bold text-primary-500 mb-2">3.9</h3>
                <p className="text-gray-600">GPA</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="fade-in-right">
            <h3 className="font-serif text-2xl font-bold mb-6">My Journey</h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-primary-200">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative pl-10 fade-in-up"
                  variants={itemVariants}
                  custom={index}
                  style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md z-10 pulse-glow">
                    {item.icon}
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <span className="text-sm text-primary-500 font-medium">{item.year}</span>
                    <h4 className="font-serif text-lg font-bold mt-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.company}</p>
                    <p className="text-gray-700 mt-2 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;