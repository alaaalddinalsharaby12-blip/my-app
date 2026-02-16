import { Phone, Mail, MapPin, Wrench, Zap, Facebook, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'الرئيسية', href: 'home' },
  { label: 'خدماتنا', href: 'services' },
  { label: 'أعمالنا', href: 'projects' },
  { label: 'من نحن', href: 'about' },
  { label: 'اتصل بنا', href: 'contact' },
];

const services = [
  { label: 'سباكة', href: 'services' },
  { label: 'كهرباء', href: 'services' },
  { label: 'صيانة دورية', href: 'services' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'فيسبوك' },
  { icon: Instagram, href: '#', label: 'إنستغرام' },
  { icon: Linkedin, href: '#', label: 'لينكد إن' },
];

export default function Footer() {
  const handleNavigate = (page: string) => {
    window.location.hash = `#/${page}`;
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1">
                <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center -mr-2">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mr-3">
                <h3 className="font-bold text-lg">سباكة وكهربائي</h3>
                <p className="text-gray-400 text-xs">خدمات منزلية</p>
              </div>
            </button>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              نقدم خدمات احترافية في مجال السباكة والكهرباء للمنازل والشركات.
              نقدم من الفنيين المعتمدين جاهز لخدمتكم على مدار 24 ساعة.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-blue transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(service.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:0506880495" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">هاتف</p>
                    <p className="text-white" dir="ltr">0506 880 495</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@plumbing-electric.com" className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">بريد إلكتروني</p>
                    <p className="text-white text-sm">info@plumbing-electric.com</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">الموقع</p>
                    <p className="text-white text-sm">جدة ، المملكة العربية السعودية</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-right">
              © 2025 سباكة وكهربائي. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">سياسة الخصوصية</button>
              <button className="hover:text-white transition-colors">شروط الاستخدام</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
