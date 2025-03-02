import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { socialLinks } from '../data/social';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [privacyConsent, setPrivacyConsent] = useState(false);

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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formState.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    if (!privacyConsent) {
      errors.privacy = 'You must agree to the privacy policy';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

    // Clear validation error when user types
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Using EmailJS to send the form
      const result = await emailjs.send(
        'service_3y2vg5n',
        'template_5foya8h',
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_name: "Priyangshu",
          reply_to: formState.email
        },
        'up916aLQKcVp5vB6S'
      );

      console.log('EmailJS result:', result);

      if (result.status === 200) {
        setSubmitSuccess(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setPrivacyConsent(false);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants (keeping all of them for animation purposes)
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

  // Button animation variants
  const buttonVariants = {
    initial: {
      boxShadow: "0 4px 6px -1px rgba(232, 160, 164, 0.1), 0 2px 4px -1px rgba(232, 160, 164, 0.06)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(232, 160, 164, 0.3), 0 4px 6px -2px rgba(232, 160, 164, 0.15)",
      transition: {
        scale: {
          duration: 0.2,
          ease: "easeOut"
        },
        boxShadow: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 2px 4px -1px rgba(232, 160, 164, 0.2), 0 1px 2px -1px rgba(232, 160, 164, 0.1)",
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary-500" />,
      title: "Email",
      content: "priyangshudutta2003@gmail.com",
      link: "mailto:priyangshudutta2003@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-500" />,
      title: "Phone",
      content: "+91 8101020120",
      link: "tel:+918101020120",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: "Location",
      content: "Contai, Purba Medinipur, West Bengal",
      link: "https://www.google.co.in/maps/place/Contai,+West+Bengal+721401/@21.7771574,87.729263,14z/data=!3m1!4b1!4m6!3m5!1s0x3a0326e5394d8237:0x7bb6b4d525857f71!8m2!3d21.778109!4d87.7517427!16zL20vMGRsbXFw?hl=en&entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <section id="contact" className="section">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          ref={titleRef}
          variants={itemVariants}
          className={`section-title ${titleInView ? 'animate-underline' : ''}`}
        >
          Get In Touch
        </motion.h2>

        <motion.p variants={itemVariants} className="text-gray-700 max-w-3xl mb-12 fade-in-up">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out using the form below or through my contact information.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            className="md:col-span-2 space-y-8"
            variants={itemVariants}
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow fade-in-left"
                whileHover={{ y: -5 }}
                variants={itemVariants}
                style={{ transitionDelay: `${0.1 * index}s` }}
                target={item.title === "Location" ? "_blank" : undefined}
                rel={item.title === "Location" ? "noopener noreferrer" : undefined}
              >
                <div className="p-3 bg-primary-100 rounded-lg pulse-glow">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              className="mt-8 fade-in-left"
              variants={itemVariants}
              style={{ transitionDelay: "0.4s" }}
            >
              <h3 className="font-serif text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ transitionDelay: `${0.1 * index}s` }}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon === 'github' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>}
                    {social.icon === 'linkedin' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                    {social.icon === 'facebook' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                    {social.icon === 'instagram' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                    {social.icon === 'mail' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-8 p-6 bg-white rounded-xl shadow-sm fade-in-left"
              variants={itemVariants}
              style={{ transitionDelay: "0.5s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary-500" />
                <h3 className="font-serif text-lg font-bold">Privacy Notice</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your data is securely processed and stored. I only use your information to respond to your inquiry and will never share it with third parties without your consent.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-3 bg-white p-8 rounded-xl shadow-sm fade-in-right"
            variants={itemVariants}
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Send Me a Message</h3>

            {submitSuccess ? (
              <motion.div
                className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-5 h-5 mt-0.5 text-green-500" />
                <div>
                  <p className="font-medium">Thank you for your message!</p>
                  <p>I'll get back to you as soon as possible.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <motion.div
                    className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 mt-0.5 text-red-500" />
                    <div>
                      <p className="font-medium">Failed to send message</p>
                      <p>{submitError}</p>
                    </div>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="fade-in-up stagger-1">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                      placeholder="John Doe"
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                    )}
                  </div>
                  <div className="fade-in-up stagger-2">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                      placeholder="johndoe@gmail.com"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="fade-in-up stagger-3">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border ${validationErrors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Project Inquiry"
                  />
                  {validationErrors.subject && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.subject}</p>
                  )}
                </div>

                <div className="fade-in-up stagger-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border ${validationErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300`}
                    placeholder="Hello, I'd like to talk about..."
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>
                  )}
                </div>

                <div className="fade-in-up stagger-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => {
                        setPrivacyConsent(e.target.checked);
                        if (e.target.checked && validationErrors.privacy) {
                          setValidationErrors({
                            ...validationErrors,
                            privacy: ''
                          });
                        }
                      }}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      I consent to having this website store my submitted information so they can respond to my inquiry. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {validationErrors.privacy && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.privacy}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center gap-2 fade-in-up stagger-6 overflow-hidden relative btn-hover-effect"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                  animate={{
                    boxShadow: ["0 4px 6px -1px rgba(232, 160, 164, 0.1)", "0 8px 15px -3px rgba(232, 160, 164, 0.3)", "0 4px 6px -1px rgba(232, 160, 164, 0.1)"],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{
                      x: ['100%', '-100%'],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
