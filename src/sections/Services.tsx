import { useEffect, useRef } from "react";
import {
  Droplets,
  Zap,
  Wrench,
  Home,
  Settings,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import A1 from '../../public/images/IMG-20260212-WA0042.jpg'
import A2 from '../../public/images/IMG-20260212-WA0048.jpg'


const services = [
  {
    icon: Droplets,
    title: "خدمات السباكة",
    description: "حلول شاملة لجميع مشاكل السباكة المنزلية والتجارية",
    features: ["إصلاح التسربات", "تركيب الأدوات الصحية", "تسليك المجاري", "صيانة السخانات"],
    color: "blue",
    image: A2,
  },
  {
    icon: Zap,
    title: "خدمات الكهرباء",
    description: "تركيب وصيانة كهربائية احترافية بأعلى معايير الأمان",
    features: ["تركيب الإضاءة", "إصلاح الأعطال", "تأسيس الكهرباء", "تركيب القواطع"],
    color: "orange",
    image: A1,
  },
  {
    icon: Settings,
    title: "الصيانة الدورية",
    description: "عقود صيانة دورية للمنازل والشركات والمؤسسات",
    features: ["فحص دوري", "صيانة وقائية", "تقارير فنية", "استجابة سريعة"],
    color: "green",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    icon: Home,
    title: "تأسيس المنازل",
    description: "تأسيس كامل للسباكة والكهرباء للمنازل الجديدة",
    features: ["تخطيط الشبكات", "تركيب المواسير", "تمديد الكابلات", "اختبار النظام"],
    color: "purple",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
  },
  {
    icon: Wrench,
    title: "أعمال الصيانة العامة",
    description: "خدمات إصلاح وتركيب لجميع احتياجات المنزل",
    features: ["إصلاح الأعطال", "تركيب الأجهزة", "صيانة متكاملة", "خدمة سريعة"],
    color: "blue",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
  },
];

const colorClasses: Record<
  string,
  { bg: string; text: string; border: string; gradient: string }
> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-500 to-blue-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-500 to-orange-600",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-500 to-purple-600",
  },
};

interface ServicesProps {
  limit?: number;
}

export default function Services({ limit }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const displayedServices = limit ? services.slice(0, limit) : services;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navigateToServices = () => {
    window.location.hash = "#/services";
    window.scrollTo(0, 0);
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            خدماتنا المتميزة
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            حلول متكاملة لمنزلك
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            نقدم مجموعة واسعة من الخدمات المنزلية الاحترافية بأعلى معايير الجودة والأمان
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => {
            const colors = colorClasses[service.color];

            return (
              <Card
                key={index}
                className={`animate-on-scroll opacity-0 group overflow-hidden border-2 ${colors.border} hover:border-transparent transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div
                    className={`absolute top-4 right-4 w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={navigateToServices}
                    className={`w-full py-2 px-4 rounded-lg border-2 font-medium transition-all duration-300 hover:bg-gradient-to-r ${colors.gradient} hover:text-white hover:border-transparent`}
                  >
                    <span>اطلب الخدمة</span>
                    <ArrowLeft className="w-4 h-4 inline mr-2 transition-transform group-hover:-translate-x-1" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        {limit && (
          <div className="text-center mt-10 animate-on-scroll opacity-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white gap-2"
              onClick={navigateToServices}
            >
              <span>عرض جميع الخدمات</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}