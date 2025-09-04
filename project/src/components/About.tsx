import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, GraduationCap, X } from 'lucide-react';
import { courses } from '../data/courses';
import { achievements } from '../data/achievements';

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  type Tab = 'journey' | 'courses' | 'achievements';
  const [activeTab, setActiveTab] = useState<Tab>('journey');

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const timelineVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Add certificate URLs here
  const timelineItems = [
    {
      year: "Sep 2022 - Jul 2025",
      title: "Bachelor of Computer Applications (BCA)",
      company: "Global Institute of Science and Technology",
      description: "Focusing on Data Analytics and Business Intelligence for Decision Making.",
      icon: <BookOpen className="w-6 h-6 text-primary-500" />,
      certificate: "https://raw.githubusercontent.com/Priyangshu713/project_images/refs/heads/main/Project2.png"
    },
    {
      year: "Jul 2024 - Aug 2024",
      title: "Machine Learning Intern",
      company: "Euphoia GenX",
      description: "Developed Machine Learning models for Diabetes Prediction, achieving 97% accuracy.",
      icon: <Award className="w-6 h-6 text-primary-500" />,
      certificate: "/certificates/internship.jpg"
    },
    {
      year: "2014 - 2022",
      title: "High School",
      company: "Science Academy",
      description: "I'm a science student specializing in computer science. I'm currently pursuing my degree while building practical skills through projects and internship.",
      icon: <GraduationCap className="w-6 h-6 text-primary-500" />,
      certificate: "/certificates/12th_certificate.jpg"
    },
  ];

  // Map external courses & achievements to display items
  const iconMap = {
    book: <BookOpen className="w-6 h-6 text-primary-500" />,
    award: <Award className="w-6 h-6 text-primary-500" />,
    graduation: <GraduationCap className="w-6 h-6 text-primary-500" />,
  } as const;

  const coursesItems = courses.map(c => ({
    ...c,
    icon: iconMap[c.icon],
  }));

  const achievementsItems = achievements.map(a => ({
    ...a,
    icon: iconMap[a.icon],
  }));

  // Modal component
  const CertificateModal = ({ imageUrl, onClose }: { imageUrl: string, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl relative w-[90%] max-w-3xl">
          
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-primary-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img src={imageUrl} alt="Certificate" className="max-h-[80vh] w-auto mx-auto object-contain" />
      </motion.div>
    </div>
  );

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
              I'm Priyangshu Dutta, a passionate Computer Science student specializing in <b>data analytics</b> and business intelligence. I'm currently pursuing my degree while building practical skills through projects and internships focused on extracting insights from data.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              My approach combines technical learning with analytical thinking. I'm developing expertise in <b>data analysis, visualization, and statistical modeling</b> using Python, SQL, and modern BI tools. I love transforming raw data into actionable insights that drive smarter decisions.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              When I'm not crunching numbers or studying, you can find me participating in analytics competitions, contributing to open-source data projects, or sharing my knowledge through campus tech events and study groups.
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
                <h3 className="font-serif text-xl font-bold text-primary-500 mb-2">7.1</h3>
                <p className="text-gray-600">CGPA</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="fade-in-right">
            {/* Header with swap */}
            <div className="flex items-center mb-6 space-x-4">
              <h3
                onClick={() => setActiveTab('journey')}
                className={`font-serif text-2xl font-bold cursor-pointer transition-colors ${activeTab==='journey' ? 'text-primary-600' : 'text-gray-400'}`}
              >
                My Journey
              </h3>
              <h3
                onClick={() => setActiveTab('courses')}
                className={`font-serif text-2xl font-bold cursor-pointer transition-colors ${activeTab==='courses' ? 'text-primary-600' : 'text-gray-400'}`}
              >
                Courses
              </h3>
              <h3
                onClick={() => setActiveTab('achievements')}
                className={`font-serif text-2xl font-bold cursor-pointer transition-colors ${activeTab==='achievements' ? 'text-primary-600' : 'text-gray-400'}`}
              >
                Achievements
              </h3>
            </div>
            <div className="relative min-h-[24rem]">
              <AnimatePresence mode="wait">
                {activeTab === 'courses' ? (
                  <motion.div
                    key="courses"
                    variants={timelineVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8 absolute inset-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-primary-200"
                  >
                    {coursesItems.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        className="relative pl-10 cursor-pointer"
                        onClick={() => {
                          setSelectedCertificate(item.certificate);
                          setModalOpen(true);
                        }}
                      >
                        <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md z-10 pulse-glow">
                          {item.icon}
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                          <span className="text-sm text-primary-500 font-medium">{item.year}</span>
                          <h4 className="font-serif text-lg font-bold mt-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.platform}</p>
                          <p className="text-gray-700 mt-2 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : activeTab === 'achievements' ? (
                  <motion.div
                    key="achievements"
                    variants={timelineVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8 absolute inset-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-primary-200"
                  >
                    {achievementsItems.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        className="relative pl-10 cursor-pointer"
                        onClick={() => {
                          if(item.certificate){
                            setSelectedCertificate(item.certificate);
                            setModalOpen(true);
                          }
                        }}
                      >
                        <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md z-10 pulse-glow">
                          {item.icon}
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                          <span className="text-sm text-primary-500 font-medium">{item.year}</span>
                          <h4 className="font-serif text-lg font-bold mt-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.platform}</p>
                          <p className="text-gray-700 mt-2 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="journey"
                    variants={timelineVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8 absolute inset-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-primary-200"
                  >
                    {timelineItems.map((item) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        className="relative pl-10 cursor-pointer"
                        onClick={() => {
                          setSelectedCertificate(item.certificate);
                          setModalOpen(true);
                        }}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
              </motion.div>
        </div>
      </motion.div>
      {modalOpen && selectedCertificate && (
        <CertificateModal imageUrl={selectedCertificate} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
};

export default About;
