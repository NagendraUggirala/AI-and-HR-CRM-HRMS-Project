import React, { useEffect, useState, useRef } from 'react';
import { Star, ArrowRight, Check, Zap, Users, Briefcase, BarChart3, Shield, Sparkles, Brain, Target, TrendingUp, FileText, UserSearch, MessageSquare, CheckCircle, Bot, Building2, Crosshair } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';
import { Link } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";

// Global Animation Styles with Smooth Color Transitions
const animationStyles = `
  * {
    transition: background-color 0.6s ease, color 0.6s ease;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes rotate3D {
    0% {
      transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
    }
    100% {
      transform: perspective(1000px) rotateY(360deg) rotateX(10deg);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 3s ease-in-out infinite;
  }

  .gradient-animated {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-card-dark {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  html {
    scroll-behavior: smooth;
  }

  .section-transition {
    transition: background 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Custom Hook for Scroll-triggered Animations
const useIntersectionObserver = (resetOnExit = false) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (resetOnExit) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [resetOnExit]);

  return [ref, isVisible];
};

// Scroll Animated Card Component
const ScrollAnimatedCard = ({ children, delay = 0, isVisible }) => {
  return (
    <div
      style={{
        animation: isVisible ? `fadeInUp 0.8s ease-out ${delay}ms forwards` : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
      }}
    >
      {children}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Modern Navbar Component
const ModernNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`position-fixed top-0 start-0 end-0`}
                  style={{
        background: scrolled
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between py-3">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/assets/images/168X40.jpeg"
              alt="logo"
              style={{ width: '150px', height: 'auto' }}
            />
            <span
              className="fw-bold fs-5 d-none d-md-block"
                  style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              AI Recruitment
            </span>
          </div>

          <div className="d-none d-md-flex align-items-center gap-4">
            <a href="#features" className="text-decoration-none text-dark fw-medium">Features</a>
            <a href="#how-it-works" className="text-decoration-none text-dark fw-medium">How It Works</a>
            <a href="#roles" className="text-decoration-none text-dark fw-medium">For Teams</a>
            <a href="#pricing" className="text-decoration-none text-dark fw-medium">Pricing</a>
            <Link
              to="/login"
              className="btn btn-sm px-3"
                  style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn btn-sm px-4"
                    style={{
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(236, 72, 153, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
              Get Started
            </Link>
                    </div>

          <button
            className="d-md-none btn btn-link"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="ri-menu-line fs-4"></i>
          </button>
                  </div>

        {mobileMenuOpen && (
          <div className="d-md-none pb-3">
            <div className="d-flex flex-column gap-2">
              <a href="#features" className="text-decoration-none text-dark py-2">Features</a>
              <a href="#how-it-works" className="text-decoration-none text-dark py-2">How It Works</a>
              <a href="#roles" className="text-decoration-none text-dark py-2">For Teams</a>
              <a href="#pricing" className="text-decoration-none text-dark py-2">Pricing</a>
              <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          </div>
        )}
        </div>
    </nav>
  );
};

// Hero Section with 3D Background
const HeroSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="section-transition position-relative overflow-hidden"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/assets/images/gallery-img13.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Gradient Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 25%, rgba(240, 147, 251, 0.85) 50%, rgba(79, 172, 254, 0.85) 75%, rgba(0, 242, 254, 0.85) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          zIndex: 1
        }}
      />
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden', zIndex: 2 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="position-absolute"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 3 }}>
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-6">
            <ScrollAnimatedCard delay={0} isVisible={isVisible}>
              <div
                className="badge px-4 py-2 mb-4 glass-card text-white"
                style={{ borderRadius: '50px', display: 'inline-block' }}
              >
                <Sparkles size={16} className="me-2" />
                AI-Powered Recruitment Platform
              </div>
            </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={200} isVisible={isVisible}>
              <h1
                className="display-3 fw-bold text-white mb-4"
                      style={{
                  lineHeight: '1.2',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                AI-Powered Recruitment & HR Automation Platform
              </h1>
            </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={400} isVisible={isVisible}>
              <p
                className="lead text-white mb-5"
                      style={{
                  fontSize: '1.25rem',
                  opacity: 0.95,
                  lineHeight: '1.6'
                }}
              >
                Hire smarter, faster, and better with AI-driven hiring, assessments,
                interviews, onboarding, and HR management — all in one platform.
              </p>
            </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={600} isVisible={isVisible}>
              <div className="d-flex flex-column flex-sm-row gap-3 mb-5 align-items-center align-items-sm-start">
                <Link
                  to="/signup"
                  className="btn btn-lg px-4 px-md-5 py-3 text-white fw-bold d-flex align-items-center justify-content-center"
                      style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    minWidth: '180px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get Started Free
                  <ArrowRight size={20} className="ms-2" />
                </Link>
                <Link
                  to="/pricing"
                  className="btn btn-lg px-4 px-md-5 py-3 text-white fw-bold d-flex align-items-center justify-content-center"
                        style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                          transition: 'all 0.3s ease',
                    minWidth: '180px'
                        }}
                        onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        }}
                      >
                  Book a Demo
                </Link>
                      </div>
            </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={800} isVisible={isVisible}>
              <div className="d-flex flex-wrap gap-4 text-white">
                      <div>
                  <div className="fw-bold fs-4">
                    <AnimatedCounter end={500} suffix="+" />
                      </div>
                  <div className="small opacity-75">Companies Trust Us</div>
                    </div>
                <div>
                  <div className="fw-bold fs-4">
                    <AnimatedCounter end={50} suffix="K+" />
                  </div>
                  <div className="small opacity-75">Candidates Screened</div>
              </div>
                <div>
                  <div className="fw-bold fs-4">
                    <AnimatedCounter end={95} suffix="%" />
                  </div>
                  <div className="small opacity-75">Hiring Accuracy</div>
                </div>
              </div>
            </ScrollAnimatedCard>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <ScrollAnimatedCard delay={1000} isVisible={isVisible}>
              <div
                className="position-relative"
                  style={{
                  perspective: '1000px'
                }}
              >
                {/* 3D Animated Visual */}
                <div
                  className="glass-card rounded-4 p-4 position-relative overflow-hidden"
                  style={{
                    animation: 'float 8s ease-in-out infinite',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '300px'
                  }}
                >
                  {/* Overlay for better text visibility */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 50%, rgba(240, 147, 251, 0.7) 100%)',
                      zIndex: 1
                    }}
                  />
                  <div className="row g-3 position-relative" style={{ zIndex: 2 }}>
                    {[
                      { Icon: FileText, label: 'Create Job', color: '#3B82F6' },
                      { Icon: UserSearch, label: 'AI Screening', color: '#8B5CF6' },
                      { Icon: MessageSquare, label: 'Interview', color: '#EC4899' },
                      { Icon: CheckCircle, label: 'Hire & Onboard', color: '#10B981' }
                    ].map((step, idx) => (
                      <div key={idx} className="col-6">
                        <div
                          className="text-center p-3 p-md-4 rounded-3"
                          style={{
                            background: `linear-gradient(135deg, ${step.color}40 0%, ${step.color}60 100%)`,
                            border: `2px solid ${step.color}60`,
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            animation: `fadeInUp 0.8s ease-out ${idx * 200}ms forwards`,
                            minHeight: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                            e.currentTarget.style.boxShadow = `0 10px 30px ${step.color}50`;
                            e.currentTarget.style.background = `linear-gradient(135deg, ${step.color}60 0%, ${step.color}80 100%)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = `linear-gradient(135deg, ${step.color}40 0%, ${step.color}60 100%)`;
                          }}
                        >
                          <div className="mb-2 d-flex justify-content-center">
                            <step.Icon size={32} color="white" />
                          </div>
                          <div className="text-white fw-semibold small">{step.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </ScrollAnimatedCard>
        </div>
      </div>
    </div>
    </section>
  );
};

// Trust & Social Proof Section
const TrustSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <p className="text-center text-muted mb-4 small text-uppercase fw-bold">
            Trusted by fast-growing startups and enterprises
          </p>
        </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={200} isVisible={isVisible}>
          <div className="row g-4 align-items-center justify-content-center">
            {['TechCorp', 'InnovateLabs', 'StartupHub', 'FutureHire', 'SmartWorks'].map((company, idx) => (
              <div key={idx} className="col-6 col-md-4 col-lg-2 text-center">
                <div
                  className="p-4 rounded-3 glass-card"
                  style={{
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.8s ease-out ${idx * 100}ms forwards`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="fw-bold text-dark">{company}</div>
                        </div>
                      </div>
            ))}
              </div>
            </ScrollAnimatedCard>

            <ScrollAnimatedCard delay={400} isVisible={isVisible}>
          <div className="row g-4 mt-5 text-center">
            {[
              { label: 'Jobs Posted', value: 10000, suffix: '+' },
              { label: 'Candidates Screened', value: 50000, suffix: '+' },
              { label: 'Hours Saved', value: 50000, suffix: '+' },
              { label: 'Hiring Accuracy', value: 95, suffix: '%' }
            ].map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div
                  className="p-4 rounded-4"
                  style={{
                    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="fw-bold display-6 text-primary mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        </div>
                  <div className="text-muted small">{stat.label}</div>
                      </div>
                    </div>
            ))}
              </div>
            </ScrollAnimatedCard>
      </div>
    </section>
  );
};

// AI Features Section
const AIFeaturesSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const features = [
    {
      icon: Brain,
      title: 'AI Resume Screening & Fit Scoring',
      description: 'Automatically analyze resumes and score candidates based on job requirements with 95% accuracy. Our advanced AI algorithms evaluate skills, experience, and cultural fit to help you find the perfect match faster.',
      color: '#8B5CF6',
      bgColor: '#8B5CF6',
      iconBg: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      features: [
        '95% accuracy rate',
        'Multi-language support',
        'Cultural fit analysis',
        'Skill gap identification'
      ]
    },
    {
      icon: Zap,
      title: 'Automated Candidate Pipeline',
      description: 'Kanban-style pipeline management with AI-powered candidate ranking and status updates. Track candidates through every stage of the hiring process with intelligent automation and real-time notifications.',
      color: '#EC4899',
      bgColor: '#EC4899',
      iconBg: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
      features: [
        'Real-time updates',
        'Custom workflows',
        'Bulk actions',
        'Team collaboration'
      ]
    },
    {
      icon: Users,
      title: 'AI Interviews & Assessments',
      description: 'Conduct automated video interviews with AI analysis of candidate responses and body language. Get comprehensive insights on communication skills, confidence levels, and technical competencies.',
      color: '#F59E0B',
      bgColor: '#F59E0B',
      iconBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      features: [
        'Video analysis',
        'Sentiment detection',
        'Skill assessments',
        'Automated scheduling'
      ]
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics & Hiring Insights',
      description: 'Real-time dashboards with predictive analytics to optimize your hiring process. Make data-driven decisions with comprehensive reports on time-to-hire, candidate quality, and recruitment ROI.',
      color: '#10B981',
      bgColor: '#10B981',
      iconBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      features: [
        'Predictive analytics',
        'Custom reports',
        'ROI tracking',
        'Performance metrics'
      ]
    },
    {
      icon: Briefcase,
      title: 'Offer Management & E-Sign',
      description: 'Streamline offer creation, negotiation, and digital signing all in one place. Send professional offers, track acceptance status, and manage contracts with legally binding e-signatures.',
      color: '#3B82F6',
      bgColor: '#3B82F6',
      iconBg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      features: [
        'Template library',
        'Legal compliance',
        'Digital signatures',
        'Offer tracking'
      ]
    },
    {
      icon: Shield,
      title: 'HR Suite: Onboarding, Payroll, Attendance',
      description: 'Complete HR management with automated onboarding, payroll processing, and attendance tracking. Manage your entire employee lifecycle from hire to retirement in one integrated platform.',
      color: '#06B6D4',
      bgColor: '#06B6D4',
      iconBg: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      features: [
        'Automated workflows',
        'Payroll integration',
        'Attendance tracking',
        'Document management'
      ]
    },
    {
      icon: Target,
      title: 'Smart Job Matching',
      description: 'AI-powered job matching that connects the right candidates with the right opportunities. Our intelligent algorithm considers skills, experience, location, and preferences for perfect matches.',
      color: '#A855F7',
      bgColor: '#A855F7',
      iconBg: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
      features: [
        'Intelligent matching',
        'Location-based search',
        'Salary insights',
        'Career recommendations'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Monitor and track employee performance with comprehensive analytics. Get insights into productivity, engagement, and growth opportunities to help your team succeed.',
      color: '#EF4444',
      bgColor: '#EF4444',
      iconBg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      features: [
        'Performance reviews',
        'Goal tracking',
        '360 feedback',
        'Growth analytics'
      ]
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Recommendations',
      description: 'Get intelligent recommendations for candidates, jobs, and hiring strategies. Our AI learns from your preferences and provides personalized suggestions to improve your hiring process.',
      color: '#F97316',
      bgColor: '#F97316',
      iconBg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      features: [
        'Personalized suggestions',
        'Learning algorithms',
        'Trend analysis',
        'Best practices'
      ]
    }
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <div
              className="badge px-4 py-2 mb-3"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                color: 'white',
                borderRadius: '50px',
                display: 'inline-block',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Sparkles size={16} className="me-2" />
              AI Magic
            </div>
            <h2 
              className="display-4 fw-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
                color: '#1e293b'
              }}
            >
              What This Platform Does
            </h2>
            <p 
              className="lead text-muted mx-auto" 
              style={{ 
                maxWidth: '700px',
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: '#64748b'
              }}
            >
              Powerful AI-driven features that transform your recruitment and HR processes
            </p>
          </div>
        </ScrollAnimatedCard>

        <div className="row g-4 g-md-5 mt-4">
          {features.map((feature, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <ScrollAnimatedCard delay={idx * 100} isVisible={isVisible}>
                <div
                  className="h-100 p-4 p-md-5 rounded-4 position-relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: `2px solid ${feature.color}15`,
                    boxShadow: `0 4px 20px ${feature.color}10, 0 1px 3px rgba(0, 0, 0, 0.05)`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    minHeight: '380px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 25px 50px ${feature.color}25, 0 10px 25px rgba(0, 0, 0, 0.15)`;
                    e.currentTarget.style.borderColor = `${feature.color}40`;
                    e.currentTarget.style.background = `linear-gradient(135deg, #ffffff 0%, ${feature.color}05 100%)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${feature.color}10, 0 1px 3px rgba(0, 0, 0, 0.05)`;
                    e.currentTarget.style.borderColor = `${feature.color}15`;
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                  }}
                >
                  {/* Decorative Background Circle */}
                  <div
                    className="position-absolute top-0 end-0"
                    style={{
                      width: '150px',
                      height: '150px',
                      background: `radial-gradient(circle, ${feature.color}10 0%, transparent 70%)`,
                      borderRadius: '50%',
                      transform: 'translate(30%, -30%)',
                      transition: 'all 0.3s ease'
                    }}
                  />

                  {/* Icon Container - Enhanced Square with rounded corners */}
                  <div
                    className="rounded-3 mb-4 d-inline-flex align-items-center justify-content-center position-relative"
                    style={{
                      width: '72px',
                      height: '72px',
                      background: feature.iconBg,
                      color: 'white',
                      boxShadow: `0 8px 20px ${feature.color}30, 0 4px 10px ${feature.color}20`,
                      transition: 'all 0.3s ease',
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                      e.currentTarget.style.boxShadow = `0 12px 30px ${feature.color}40, 0 6px 15px ${feature.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <feature.icon size={32} color="white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Title */}
                  <h4 
                    className="fw-bold mb-3 position-relative"
                    style={{
                      fontSize: '1.375rem',
                      lineHeight: '1.4',
                      color: '#1e293b',
                      marginBottom: '16px',
                      zIndex: 1
                    }}
                  >
                    {feature.title}
                  </h4>
                  
                  {/* Description */}
                  <p 
                    className="text-muted mb-4 flex-grow-1 position-relative"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: '1.7',
                      color: '#64748b',
                      marginBottom: '20px',
                      zIndex: 1
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <div className="position-relative" style={{ zIndex: 1 }}>
                    <div className="d-flex flex-wrap gap-2">
                      {feature.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="badge px-3 py-2"
                          style={{
                            background: `${feature.color}15`,
                            color: feature.color,
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            border: `1px solid ${feature.color}25`,
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${feature.color}25`;
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${feature.color}15`;
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative gradient accent line */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: '4px',
                      background: feature.iconBg,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  />
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const steps = [
    {
      number: '01',
      title: 'Create Job',
      description: 'Post your job opening with AI-powered job description suggestions',
      Icon: FileText,
      color: '#3B82F6',
      bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
    },
    {
      number: '02',
      title: 'AI Screens Candidates',
      description: 'Our AI automatically screens and ranks candidates based on fit score',
      Icon: Bot,
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
    },
    {
      number: '03',
      title: 'Interview & Assess Automatically',
      description: 'Conduct AI-powered interviews and automated skill assessments',
      Icon: MessageSquare,
      color: '#EC4899',
      bgGradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
    },
    {
      number: '04',
      title: 'Hire, Onboard & Manage Employees',
      description: 'Complete the hiring process with automated onboarding and HR management',
      Icon: CheckCircle,
      color: '#10B981',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <h2 
              className="display-4 fw-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
                color: '#1e293b'
              }}
            >
              How It Works
            </h2>
            <p 
              className="lead text-muted mx-auto" 
              style={{ 
                maxWidth: '700px',
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: '#64748b'
              }}
            >
              A simple 4-step process to transform your hiring
            </p>
          </div>
        </ScrollAnimatedCard>

        <div className="row g-4 g-md-5 position-relative">
          {/* Animated Connecting Line */}
          <div
            className="d-none d-lg-block position-absolute"
            style={{
              top: '120px',
              left: '12%',
              right: '12%',
              height: '3px',
              background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 33%, #EC4899 66%, #10B981 100%)',
              borderRadius: '2px',
              zIndex: 0,
              opacity: 0.3
            }}
          />

          {steps.map((step, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3 position-relative" style={{ zIndex: 1 }}>
              <ScrollAnimatedCard delay={idx * 150} isVisible={isVisible}>
                <div
                  className="h-100 p-4 p-md-5 rounded-4 position-relative overflow-hidden"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${step.color}25, 0 10px 20px rgba(0, 0, 0, 0.1)`;
                    e.currentTarget.style.borderColor = `${step.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                  }}
                >
                  {/* Step Number */}
                  <div
                    className="mb-3 fw-bold"
                    style={{
                      fontSize: '0.875rem',
                      color: step.color,
                      letterSpacing: '1px',
                      opacity: 0.8
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon Circle */}
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: step.bgGradient,
                      color: 'white',
                      boxShadow: `0 10px 30px ${step.color}30, 0 4px 12px ${step.color}20`,
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${step.color}40, 0 6px 15px ${step.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <step.Icon size={48} color="white" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h4 
                    className="fw-bold mb-3"
                    style={{
                      fontSize: '1.375rem',
                      lineHeight: '1.4',
                      color: '#1e293b',
                      marginBottom: '16px'
                    }}
                  >
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p 
                    className="text-muted mb-0 flex-grow-1"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: '1.6',
                      color: '#64748b',
                      marginBottom: '0'
                    }}
                  >
                    {step.description}
                  </p>

                  {/* Decorative Accent Line */}
                  <div
                    className="position-absolute bottom-0 start-50 translate-middle-x"
                    style={{
                      width: '60px',
                      height: '4px',
                      background: step.bgGradient,
                      borderRadius: '2px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  />
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Role-Based Sections
const RoleBasedSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const roles = [
    {
      title: 'For Recruiters',
      Icon: Briefcase,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea',
      features: [
        'Job management dashboard',
        'AI-powered candidate pipeline',
        'Smart screening & ranking',
        'Real-time analytics',
        'Automated interview scheduling',
        'Candidate communication hub',
        'Advanced search & filters',
        'Team collaboration tools'
      ]
    },
    {
      title: 'For Candidates',
      Icon: Crosshair,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb',
      features: [
        'Smart job search & matching',
        'One-click applications',
        'Application tracking',
        'Profile management',
        'Resume builder & optimization',
        'Skill assessments & certifications',
        'Interview preparation tools',
        'Career insights & recommendations'
      ]
    },
    {
      title: 'For Companies/ HR',
      Icon: Building2,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe',
      features: [
        'Automated onboarding',
        'Payroll & attendance',
        'Employee analytics',
        'HR document management',
        'Leave management system',
        'Employee self-service portal',
        'Compliance & reporting tools'
      ]
    }
  ];

  return (
    <section
      id="roles"
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <h2 
              className="display-4 fw-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
                color: '#1e293b'
              }}
            >
              Built for Every Team
            </h2>
            <p 
              className="lead text-muted mx-auto" 
              style={{ 
                maxWidth: '700px',
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: '#64748b'
              }}
            >
              Tailored experiences for recruiters, candidates, and HR teams
            </p>
          </div>
        </ScrollAnimatedCard>

        <div className="row g-4 g-md-5">
          {roles.map((role, idx) => (
            <div key={idx} className="col-12 col-lg-4">
              <ScrollAnimatedCard delay={idx * 200} isVisible={isVisible}>
                <div
                  className="h-100 p-4 p-md-5 rounded-4 position-relative overflow-hidden"
                  style={{
                    background: role.gradient,
                    color: 'white',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 10px 40px ${role.color}30, 0 4px 15px rgba(0, 0, 0, 0.1)`,
                    border: 'none',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 25px 60px ${role.color}40, 0 10px 25px rgba(0, 0, 0, 0.15)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 10px 40px ${role.color}30, 0 4px 15px rgba(0, 0, 0, 0.1)`;
                  }}
                >
                  {/* Decorative Background Pattern */}
                  <div
                    className="position-absolute top-0 end-0"
                    style={{
                      width: '200px',
                      height: '200px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      transform: 'translate(30%, -30%)',
                      filter: 'blur(40px)'
                    }}
                  />

                  {/* Icon Container */}
                  <div 
                    className="mb-4 d-flex justify-content-center"
                    style={{
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <role.Icon size={40} color="white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="fw-bold mb-4 text-center"
                    style={{
                      fontSize: '1.2rem',
                      lineHeight: '1.3',
                      color: 'white',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {role.title}
                  </h3>

                  {/* Features List */}
                  <ul className="list-unstyled flex-grow-1">
                    {role.features.map((feature, fIdx) => (
                      <li 
                        key={fIdx} 
                        className="mb-3 d-flex align-items-start"
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${(idx * 200) + (fIdx * 50)}ms forwards`,
                          opacity: isVisible ? 1 : 0
                        }}
                      >
                        <div 
                          className="flex-shrink-0 me-3 mt-1"
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <Check size={16} color="white" strokeWidth={3} />
                        </div>
                        <span 
                          style={{
                            fontSize: '0.9375rem',
                            lineHeight: '1.6',
                            color: 'rgba(255, 255, 255, 0.95)',
                            flex: 1
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative Bottom Accent */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Advanced AI Features Section
const AdvancedAIFeaturesSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const aiFeatures = [
    {
      title: 'AI Prescreening Insights',
      description: 'Get detailed AI analysis of candidate qualifications, skills, and cultural fit',
      icon: Brain,
                  color: '#3B82F6'
                },
                {
      title: 'AI Interview Analysis',
      description: 'Real-time analysis of candidate responses, tone, and communication skills',
      icon: Target,
      color: '#8B5CF6'
    },
    {
      title: 'Skill Assessments',
      description: 'Automated technical and soft skill assessments with instant results',
      icon: TrendingUp,
      color: '#EC4899'
    },
    {
      title: 'Data-Driven Hiring Decisions',
      description: 'Predictive analytics to identify top performers and reduce time-to-hire',
      icon: BarChart3,
      color: '#10B981'
    }
  ];

  return (
    <section
      ref={ref}
      className="section-transition py-5"
              style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <div
              className="badge px-4 py-2 mb-3 glass-card text-white"
              style={{ borderRadius: '50px', display: 'inline-block' }}
            >
              <Sparkles size={16} className="me-2" />
              Advanced AI Features
            </div>
            <h2 className="display-4 fw-bold text-white mb-3">The Future of Hiring</h2>
            <p className="lead text-white mx-auto opacity-90" style={{ maxWidth: '600px' }}>
              Cutting-edge AI technology that transforms how you find and hire talent
            </p>
          </div>
        </ScrollAnimatedCard>

        <div className="row g-4">
          {aiFeatures.map((feature, idx) => (
            <div key={idx} className="col-12 col-md-6">
              <ScrollAnimatedCard delay={idx * 150} isVisible={isVisible}>
                <div
                  className="h-100 p-4 rounded-4 glass-card"
                    style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                    className="rounded-3 p-3 mb-3 d-inline-block"
                      style={{
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`
                    }}
                  >
                    <feature.icon size={32} color="white" />
                    </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="mb-0 opacity-90">{feature.description}</p>
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dashboard Previews Section
const DashboardPreviewSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeDashboard, setActiveDashboard] = useState(0);

  const dashboards = [
    {
      title: 'Recruiter Dashboard',
      description: 'Complete control over your hiring pipeline',
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      image: '/assets/images/gallery/gallery-img1.png',
      fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
      icon: Briefcase
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time insights and hiring metrics',
      gradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
      image: '/assets/images/gallery/gallery-img2.png',
      fallbackImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      icon: BarChart3
    },
    {
      title: 'HR Management Dashboard',
      description: 'Employee management and HR operations',
      gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      image: '/assets/images/gallery/gallery-img3.png',
      fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80',
      icon: Building2
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDashboard((prev) => (prev + 1) % dashboards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <h2 
              className="display-4 fw-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
                color: '#1e293b'
              }}
            >
              Powerful Dashboards
            </h2>
            <p 
              className="lead text-muted mx-auto" 
              style={{ 
                maxWidth: '700px',
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: '#64748b'
              }}
            >
              Beautiful, intuitive interfaces designed for productivity
            </p>
          </div>
        </ScrollAnimatedCard>

        <ScrollAnimatedCard delay={200} isVisible={isVisible}>
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <div
                className="rounded-4 overflow-hidden position-relative"
                style={{
                  background: dashboards[activeDashboard].gradient,
                  padding: '0',
                  minHeight: '450px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Window Controls */}
                <div 
                  className="d-flex gap-2 p-3 position-absolute"
                  style={{ 
                    top: 0, 
                    left: 0, 
                    zIndex: 10,
                    background: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    width: '100%'
                  }}
                >
                  <div 
                    className="rounded-circle" 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer'
                    }}
                  ></div>
                  <div 
                    className="rounded-circle" 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer'
                    }}
                  ></div>
                  <div 
                    className="rounded-circle" 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      background: 'rgba(255,255,255,0.4)',
                      cursor: 'pointer'
                    }}
                  ></div>
                </div>

                {/* Dashboard Image */}
                <div
                  className="position-relative w-100 h-100"
                  style={{
                    minHeight: '450px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={dashboards[activeDashboard].image}
                    alt={dashboards[activeDashboard].title}
                    className="w-100 h-100"
                    style={{
                      objectFit: 'cover',
                      transition: 'opacity 0.5s ease',
                      filter: 'brightness(0.85)'
                    }}
                    onError={(e) => {
                      // Fallback to placeholder image if local image fails
                      if (e.target.src !== dashboards[activeDashboard].fallbackImage) {
                        e.target.src = dashboards[activeDashboard].fallbackImage;
                      } else {
                        // If fallback also fails, hide image and show gradient
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                  
                  {/* Overlay with title */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <h4 
                      className="fw-bold mb-2 text-white"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {dashboards[activeDashboard].title}
                    </h4>
                    <p 
                      className="text-white opacity-90 mb-0"
                      style={{ fontSize: '0.9375rem' }}
                    >
                      {dashboards[activeDashboard].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Cards List */}
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                {dashboards.map((dashboard, idx) => (
                  <button
                    key={idx}
                    className="btn text-start p-4 rounded-3 border-0 position-relative overflow-hidden"
                    style={{
                      background: activeDashboard === idx
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)'
                        : '#ffffff',
                      border: activeDashboard === idx 
                        ? '2px solid #3B82F6' 
                        : '2px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: activeDashboard === idx
                        ? '0 4px 20px rgba(59, 130, 246, 0.15)'
                        : '0 1px 3px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      minHeight: '100px'
                    }}
                    onClick={() => setActiveDashboard(idx)}
                    onMouseEnter={(e) => {
                      if (activeDashboard !== idx) {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeDashboard !== idx) {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = activeDashboard === idx
                          ? '0 4px 20px rgba(59, 130, 246, 0.15)'
                          : '0 1px 3px rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.borderColor = activeDashboard === idx
                          ? '#3B82F6'
                          : 'rgba(0, 0, 0, 0.06)';
                      }
                    }}
                  >
                    {/* Icon */}
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '48px',
                          height: '48px',
                          background: dashboard.gradient,
                          color: 'white',
                          boxShadow: `0 4px 12px ${dashboard.gradient}30`
                        }}
                      >
                        <dashboard.icon size={24} color="white" />
                      </div>
                      
                      <div className="flex-grow-1">
                        <h5 
                          className="fw-bold mb-1"
                          style={{
                            fontSize: '1.125rem',
                            color: '#1e293b',
                            marginBottom: '4px'
                          }}
                        >
                          {dashboard.title}
                        </h5>
                        <p 
                          className="text-muted small mb-0"
                          style={{
                            fontSize: '0.875rem',
                            color: '#64748b',
                            lineHeight: '1.5'
                          }}
                        >
                          {dashboard.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimatedCard>
      </div>
    </section>
  );
};

// Pricing Preview Section
const PricingPreviewSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: 'FREE',
      color: '#8B5CF6',
      monthlyPrice: '₹0',
      yearlyPrice: '₹500',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: false },
        { text: 'Customer Management', included: false },
        { text: 'Advanced Analytics', included: false }
      ]
    },
    {
      name: 'BASIC',
      color: '#3B82F6',
      monthlyPrice: '₹799',
      yearlyPrice: '₹7,990',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: true },
        { text: 'Customer Management', included: false },
        { text: 'Advanced Analytics', included: false }
      ]
    },
    {
      name: 'STANDARD',
      color: '#EC4899',
      monthlyPrice: '₹1,199',
      yearlyPrice: '₹11,990',
      features: [
        { text: '50 GB Bandwidth', included: true },
        { text: 'Financial Analysis', included: true },
        { text: '24 hour support', included: true },
        { text: 'Customer Management', included: true },
        { text: 'Advanced Analytics', included: false }
      ]
    }
  ];

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-transition py-5"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <h2 
              className="display-4 fw-bold mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: '1.2',
                color: '#1e293b'
              }}
            >
              Simple, Transparent Pricing
            </h2>
            <p 
              className="lead text-muted mx-auto" 
              style={{ 
                maxWidth: '700px',
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: '#64748b'
              }}
            >
              Choose the plan that fits your team
            </p>
            
            {/* Billing Toggle */}
            <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
              <span 
                className={!isYearly ? 'fw-bold' : 'text-muted'}
                style={{ color: !isYearly ? '#1e293b' : '#64748b', transition: 'color 0.3s ease' }}
              >
                Monthly
              </span>
              <button
                className="btn p-0 border-0 bg-transparent"
                onClick={() => setIsYearly(!isYearly)}
                style={{
                  width: '50px',
                  height: '26px',
                  background: isYearly ? '#8B5CF6' : '#cbd5e1',
                  borderRadius: '13px',
                  position: 'relative',
                  transition: 'background 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: isYearly ? '27px' : '3px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </button>
              <span 
                className={isYearly ? 'fw-bold' : 'text-muted'}
                style={{ color: isYearly ? '#1e293b' : '#64748b', transition: 'color 0.3s ease' }}
              >
                Yearly
              </span>
              {isYearly && (
                <span 
                  className="badge px-2 py-1"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: 'white',
                    fontSize: '0.75rem',
                    marginLeft: '8px'
                  }}
                >
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </ScrollAnimatedCard>

        {/* Pricing Cards */}
        <div className="row g-3 g-md-4 justify-content-center mb-5">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4">
              <ScrollAnimatedCard delay={index * 200} isVisible={isVisible}>
                <div
                  className="card h-100 border-0 shadow-lg position-relative pricing-card"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    animation: `fadeInUp 0.8s ease-out ${index * 200}ms forwards`,
                    opacity: isVisible ? 1 : 0,
                    background: '#ffffff',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${plan.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Colored Tab */}
                  <div
                    className="position-absolute top-0 start-0 px-3 py-2 text-white fw-bold pricing-tab"
                    style={{
                      backgroundColor: plan.color,
                      borderRadius: '20px 0 20px 0',
                      fontSize: '14px',
                      zIndex: 1,
                      transition: 'all 0.3s ease',
                      boxShadow: `0 4px 12px ${plan.color}40`
                    }}
                  >
                    {plan.name}
                  </div>

                  <div className="card-body p-3 p-md-4 pt-4 pt-md-5">
                    {/* Price */}
                    <div className="text-center mb-3 mb-md-4">
                      <h4
                        className="display-6 fw-bold text-dark mb-0 pricing-price"
                        style={{
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)',
                          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'
                        }}
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        <span className="fs-6 text-black-50 ms-1">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      </h4>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="d-flex align-items-center mb-3 pricing-feature"
                          style={{
                            transition: 'all 0.3s ease',
                            transform: 'translateX(0)',
                            animation: `fadeInUp 0.6s ease-out ${(index * 200) + (featureIndex * 100)}ms forwards`,
                            opacity: isVisible ? 1 : 0
                          }}
                        >
                          <div className="me-3 flex-shrink-0">
                            {feature.included ? (
                              <i 
                                className="ri-check-line fs-5"
                                style={{ color: plan.color }}
                              ></i>
                            ) : (
                              <i className="ri-close-line text-muted fs-5"></i>
                            )}
                          </div>
                          <span 
                            className={feature.included ? 'text-dark' : 'text-muted'}
                            style={{
                              textDecoration: feature.included ? 'none' : 'line-through',
                              opacity: feature.included ? 1 : 0.6
                            }}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Buy Now Button */}
                    <div className="text-center">
                      <Link to="/pricing">
                        <button
                          className="btn btn-primary pricing-btn w-100"
                          style={{
                            background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)',
                            boxShadow: `0 4px 15px ${plan.color}30`,
                            animation: `fadeInUp 0.8s ease-out ${(index * 200) + 400}ms forwards`,
                            opacity: isVisible ? 1 : 0,
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 8px 25px ${plan.color}50`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 4px 15px ${plan.color}30`;
                          }}
                        >
                          Choose Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Head of HR',
      company: 'TechCorp',
      photo: 'SC',
      feedback: 'This platform cut our hiring time by 40% and improved candidate quality significantly. Game changer!',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Talent Director',
      company: 'InnovateLabs',
      photo: 'MJ',
      feedback: 'The AI screening is incredibly accurate. We\'ve hired 15 people in 3 months with zero regrets.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'StartupHub',
      photo: 'ER',
      feedback: 'As a startup, we needed speed and quality. AI Recruiter delivered both beyond our expectations.',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="section-transition py-5"
                  style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)'
      }}
    >
      <div className="container">
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">Loved by HR Teams Worldwide</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              See what our customers have to say
            </p>
                      </div>
        </ScrollAnimatedCard>

        <ScrollAnimatedCard delay={200} isVisible={isVisible}>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div
                className="p-5 rounded-4 glass-card"
                        style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.5s ease'
                }}
              >
                <div className="d-flex mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} color="#FBBF24" fill="#FBBF24" className="me-1" />
                  ))}
                    </div>
                <p className="fs-5 fw-medium mb-4" style={{ lineHeight: '1.8' }}>
                  "{testimonials[activeTestimonial].feedback}"
                </p>
                <div className="d-flex align-items-center">
                    <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-3"
                      style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                    }}
                  >
                    {testimonials[activeTestimonial].photo}
                    </div>
                  <div>
                    <div className="fw-bold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-muted small">
                      {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                  </div>
                </div>
            </div>
          </div>
              <div className="d-flex justify-content-center gap-2 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className="btn rounded-pill border-0"
                style={{
                      width: idx === activeTestimonial ? '32px' : '12px',
                      height: '12px',
                      background: idx === activeTestimonial ? '#3B82F6' : '#e5e7eb',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setActiveTestimonial(idx)}
                  />
                ))}
                  </div>
                </div>
              </div>
            </ScrollAnimatedCard>
        </div>
      </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
          <section
      ref={ref}
      className="section-transition py-5"
            style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Particles */}
      <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden' }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              background: 'rgba(255, 255, 255, 0.1)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <ScrollAnimatedCard delay={0} isVisible={isVisible}>
          <div className="text-center text-white py-5">
            <h2 className="display-3 fw-bold mb-4">
              Transform the Way You Hire & Manage Talent
            </h2>
            <p className="lead mb-5 opacity-90 mx-auto" style={{ maxWidth: '600px' }}>
              Join thousands of companies using AI to revolutionize their recruitment process
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                  <Link
                to="/signup"
                className="btn btn-lg px-5 py-3 text-white fw-bold"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
                    onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                Start Free Trial
                <ArrowRight size={20} className="ms-2" />
                  </Link>
                  <Link
                    to="/pricing"
                className="btn btn-lg px-5 py-3 text-white fw-bold"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease'
                }}
                    onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                Schedule a Demo
                  </Link>
                </div>
              </div>
        </ScrollAnimatedCard>
            </div>
          </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        color: 'white'
      }}
    >
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">
                  <span style={{ color: '#3B82F6' }}>AI</span> Recruitment
                </h5>
            <p className="text-white-50 small">
              Automate repetitive recruiting tasks and focus on great conversations.
              Our recruiter dashboard gives you full visibility from job posting to offer.
                </p>
              </div>
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3">Product</h6>
            <ul className="list-unstyled">
              {['Features', 'Pricing', 'Integrations', 'API'].map((item, idx) => (
                <li key={idx} className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none small">{item}</a>
                </li>
              ))}
            </ul>
              </div>
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              {['About', 'Blog', 'Careers', 'Contact'].map((item, idx) => (
                <li key={idx} className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none small">{item}</a>
                </li>
              ))}
            </ul>
            </div>
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              {['Documentation', 'Support', 'Community', 'Help Center'].map((item, idx) => (
                <li key={idx} className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none small">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3">Follow</h6>
            <div className="d-flex gap-3">
              {['ri-twitter-fill', 'ri-linkedin-fill', 'ri-facebook-fill', 'ri-instagram-fill'].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-white-50"
                  style={{ fontSize: '1.5rem', transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#3B82F6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                  <i className={icon}></i>
                    </a>
                ))}
            </div>
          </div>
        </div>
        <div className="border-top pt-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-white-50 small mb-0">© 2025 AI Recruitment. All Rights Reserved</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex flex-wrap justify-content-md-end gap-3">
                {['Privacy', 'Terms', 'Cookies'].map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-white-50 text-decoration-none small"
                    style={{ transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#3B82F6';
                      }}
                      onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                      }}
                    >
                      {item}
                    </a>
                ))}
            </div>
            </div>
            </div>
            </div>
          </div>
    </footer>
  );
};

// Main Landing Component
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Super Admins should not see landing page, redirect them directly to Super Admin Panel
    const userRole = getUserRole();
    if (userRole === 'superadmin') {
      navigate('/super-admin');
    }
  }, [navigate]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <style>{animationStyles}</style>

      {/* Modern Navbar */}
      <ModernNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust & Social Proof */}
      <TrustSection />

      {/* AI Features */}
      <AIFeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Role-Based Sections */}
      <RoleBasedSection />

      {/* Advanced AI Features */}
      <AdvancedAIFeaturesSection />

      {/* Dashboard Previews */}
      <DashboardPreviewSection />

      {/* Pricing Preview */}
      <PricingPreviewSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;