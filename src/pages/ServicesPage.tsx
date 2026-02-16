import { useEffect, useRef } from 'react';
import { 
  Droplets, 
  Zap, 
  Home, 
  Settings,
  ArrowLeft,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import A3 from '../../public/images/IMG-20260212-WA0042.jpg'

const services = [
  {
    icon: Droplets,
    title: 'خدمات السباكة',
    description: 'حلول شاملة لجميع مشاكل السباكة المنزلية والتجارية',
    features: [
      'إصلاح التسربات بأحدث الأجهزة',
      'تركيب الأدوات الصحية',
      'تسليك المجاري والصرف',
      'صيانة السخانات المركزية',
      'تركيب فلاتر المياه',
      'تأسيس شبكات المياه'
    ],
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80'
  },
  {
    icon: Zap,
    title: 'خدمات الكهرباء',
    description: 'تركيب وصيانة كهربائية احترافية بأعلى معايير الأمان',
    features: [
      'تركيب الإضاءة الداخلية والخارجية',
      'إصلاح الأعطال الكهربائية',
      'تأسيس الكهرباء للمنازل الجديدة',
      'تركيب القواطع واللوحات',
      'تركيب المكيفات',
      'فحص الأمان الكهربائي'
    ],
    color: 'orange',
    image: A3,
  },
  {
    icon: Settings,
    title: 'الصيانة الدورية',
    description: 'عقود صيانة دورية للمنازل والشركات والمؤسسات',
    features: [
      'فحص دوري شامل شهرياً',
      'صيانة وقائية للأعطال',
      'تقارير فنية مفصلة',
      'أولوية الاستجابة',
      'خصومات على قطع الغيار',
      'دعم فني على مدار الساعة'
    ],
    color: 'green',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  },
  {
    icon: Home,
    title: 'تأسيس المنازل',
    description: 'تأسيس كامل للسباكة والكهرباء للمنازل الجديدة',
    features: [
      'تخطيط الشبكات الهندسي',
      'تركيب مواسير المياه والصرف',
      'تمديد الكابلات الكهربائية',
      'اختبار النظام بالكامل',
      'ضمان شامل على التأسيس',
      'متابعة ما بعد التركيب'
    ],
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80'
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  blue: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  orange: { 
    bg: 'bg-orange-50', 
    text: 'text-orange-600', 
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600'
  },
  red: { 
    bg: 'bg-red-50', 
    text: 'text-red-600', 
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600'
  },
  green: { 
    bg: 'bg-green-50', 
    text: 'text-green-600', 
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600'
  },
  purple: { 
    bg: 'bg-purple-50', 
    text: 'text-purple-600', 
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600'
  },
  emergency: { 
    bg: 'bg-red-50', 
    text: 'text-red-600', 
    border: 'border-red-200',
    gradient: 'from-red-600 to-red-700'
  },
};

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

const navigateToServices = () => {
    window.location.hash = "#/contact";
    window.scrollTo(0, 0);
};

  return (
    <div className="pt-32 pb-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            خدماتنا المتميزة
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            حلول متكاملة لمنزلك
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            نقدم مجموعة واسعة من الخدمات المنزلية الاحترافية بأعلى معايير الجودة والأمان
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            return (
              <Card 
                key={index}
                className={`animate-on-scroll opacity-0 group overflow-hidden card-hover border-2 ${colors.border} hover:border-transparent transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                    <div className={`absolute top-4 right-4 w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                      <service.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <a href="tel:0506880495" className="flex-1">
                        <Button 
                          className={`w-full bg-gradient-to-r ${colors.gradient} text-white gap-2`}
                        >
                          <Phone className="w-4 h-4" />
                          <span>اتصل الآن</span>
                        </Button>
                      </a>
                      <Button 
                        variant="outline" 
                        className="flex-1 group/btn"
                      >
                        <span>طلب عرض سعر</span>
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-on-scroll opacity-0">
          <div className="bg-gradient-brand rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              هل تحتاج إلى خدمة غير مذكورة هنا؟
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              نقدم العديد من الخدمات الأخرى. تواصل معنا وسنكون سعداء بمساعدتك
            </p>

              <Button 
              onClick={navigateToServices}
                size="lg"
                className="bg-white text-brand-blue hover:bg-gray-100 gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>تواصل معنا</span>
              </Button>
   
          </div>
        </div>
      </div>
    </div>
  );
}
