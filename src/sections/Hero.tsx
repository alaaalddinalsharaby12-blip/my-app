import { useEffect, useRef } from 'react';
import { Phone, ArrowDown, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Shield, text: 'ضمان على جميع الأعمال' },
  { icon: Clock, text: 'استجابة سريعة' },
  { icon: Award, text: 'فنيون معتمدون' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navigateToServices = () => {
    window.location.hash = '#/services';
    window.scrollTo(0, 0);
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80"
          alt="فني سباكة وكهرباء يعمل"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-on-scroll opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange-light px-4 py-2 rounded-full text-sm font-medium border border-brand-orange/30">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              متوفرون على مدار الساعة
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="animate-on-scroll opacity-0 text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ animationDelay: '0.1s' }}>
            خدمات <span className="text-brand-blue-light">السباكة</span> و{' '}
            <span className="text-brand-orange-light">الكهرباء</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl">بأعلى معايير الجودة</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-on-scroll opacity-0 text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
            نقدم خدمات احترافية في مجال السباكة والكهرباء للمنازل والشركات.
            نقدم من الفنيين المعتمدين جاهز لخدمتكم على مدار 24 ساعة.
          </p>

          {/* CTA Buttons */}
          <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={{ animationDelay: '0.3s' }}>
            <a href="tel:0506880495">
              <Button 
                size="lg"
                className="bg-gradient-brand hover:opacity-90 text-white gap-2 text-lg px-8 py-6 shadow-glow"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل الآن</span>
              </Button>
            </a>
            <Button 
              size="lg"
              variant="outline"
              onClick={navigateToServices}
              className="border-white/30 text-white hover:bg-white/10 gap-2 text-lg px-8 py-6"
            >
              <span>استكشف خدماتنا</span>
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="animate-on-scroll opacity-0 flex flex-wrap items-center justify-center gap-4 sm:gap-8" style={{ animationDelay: '0.4s' }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-white/80"
              >
                <feature.icon className="w-5 h-5 text-brand-blue-light" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-white/50 hover:text-white transition-colors"
          aria-label="انتقل للأسفل"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
