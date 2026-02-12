import { useEffect, useRef } from 'react';
import { Shield, Clock, Award, Users, ThumbsUp, BadgeCheck } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'ضمان شامل',
    description: 'ضمان على جميع الأعمال والقطع',
    color: 'blue',
  },
  {
    icon: Clock,
    title: 'استجابة سريعة',
    description: 'وصول في أقل من ساعة للطوارئ',
    color: 'orange',
  },
  {
    icon: Award,
    title: 'خبرة 8+ سنة',
    description: 'سنوات من الخبرة في المجال',
    color: 'purple',
  },
  {
    icon: Users,
    title: '5000+ عميل',
    description: 'ثقة آلاف العملاء بنا',
    color: 'green',
  },
  {
    icon: ThumbsUp,
    title: 'جودة مضمونة',
    description: 'أعلى معايير الجودة في العمل',
    color: 'red',
  },
  {
    icon: BadgeCheck,
    title: 'فنيون معتمدون',
    description: 'فريق محترف ومعتمد رسمياً',
    color: 'blue',
  },
];

const colorClasses: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
  red: { bg: 'bg-red-50', icon: 'text-red-600' },
};

export default function TrustBadges() {
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
    <section ref={sectionRef} className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const colors = colorClasses[badge.color];
            return (
              <div
                key={index}
                className="animate-on-scroll opacity-0 text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${colors.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <badge.icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{badge.title}</h3>
                <p className="text-gray-500 text-xs">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
