import { useEffect, useRef } from 'react';
import { 
  Shield, 
  Clock, 
  Award, 
  Users, 
  ThumbsUp, 
  BadgeCheck,
  Target,
  Eye,
  Heart,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { number: '9+', label: 'سنة خبرة', icon: Award },
  { number: '5000+', label: 'عميل سعيد', icon: Users },
  { number: '10000+', label: 'مشروع منجز', icon: ThumbsUp },
  { number: '50+', label: 'فني معتمد', icon: BadgeCheck },
];

const values = [
  {
    icon: Shield,
    title: 'الجودة',
    description: 'نلتزم بأعلى معايير الجودة في كل عمل نقوم به',
    color: 'blue',
  },
  {
    icon: Clock,
    title: 'السرعة',
    description: 'نصلك في أسرع وقت ممكن، خاصة في حالات الطوارئ',
    color: 'orange',
  },
  {
    icon: Heart,
    title: 'الأمانة',
    description: 'الشفافية والأمانة في التعامل مع عملائنا',
    color: 'red',
  },
  {
    icon: Target,
    title: 'الدقة',
    description: 'ننفذ الأعمال بدقة عالية وبأحدث التقنيات',
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  red: { bg: 'bg-red-50', icon: 'text-red-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
};

export default function AboutPage() {
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

  return (
    <div className="pt-32 pb-20 bg-white" ref={sectionRef}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll opacity-0">
            <span className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
              من نحن
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              خبرة 9 عاماً في خدمات السباكة والكهرباء
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              نحن شركة رائدة في مجال الخدمات المنزلية، نقدم حلولاً متكاملة في السباكة والكهرباء 
              للمنازل والشركات. نقدم من الفنيين المعتمدين يضمن لك جودة عالية وخدمة متميزة.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              نؤمن بأن رضا العميل هو المقياس الحقيقي لنجاحنا، لذلك نسعى دائماً لتقديم الأفضل 
              وبناء علاقات طويلة الأمد مع عملائنا.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0506880495">
                <Button className="bg-gradient-brand text-white gap-2">
                  <Phone className="w-5 h-5" />
                  <span>اتصل بنا</span>
                </Button>
              </a>
              <a href="/services">
                <Button variant="outline">
                  <span>استكشف خدماتنا</span>
                </Button>
              </a>
            </div>
          </div>
          <div className="animate-on-scroll opacity-0 relative" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
                alt="فني يعمل"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <Award className="w-7 h-7 text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">9+</p>
                    <p className="text-gray-500 text-sm">سنة خبرة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-brand-blue" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{stat.number}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-on-scroll opacity-0 bg-gradient-brand rounded-2xl p-8 text-white">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
            <p className="text-white/80 leading-relaxed">
              أن نكون الخيار الأول في المملكة العربية السعودية للخدمات المنزلية، 
              من خلال تقديم خدمات استثنائية تعتمد على الجودة والاحترافية والابتكار.
            </p>
          </div>
          <div className="animate-on-scroll opacity-0 bg-gradient-orange rounded-2xl p-8 text-white" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
            <p className="text-white/80 leading-relaxed">
              تقديم خدمات سباكة وكهرباء عالية الجودة بأسعار تنافسية، 
              مع ضمان رضا العملاء من خلال عمل محترف ومعتمد.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            هذه هي القيم التي نؤمن بها ونسعى لتطبيقها في كل عمل نقوم به
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const colors = colorClasses[value.color];
            return (
              <div
                key={index}
                className="animate-on-scroll opacity-0 text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${colors.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Info */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">هاتف</p>
                <p className="font-bold" dir="ltr">0506 880 495</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">بريد إلكتروني</p>
                <p className="font-bold">info@plumbing-electric.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">الموقع</p>
                <p className="font-bold">جدة، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
