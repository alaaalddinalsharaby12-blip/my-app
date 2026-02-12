import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Clock,
  MessageCircle,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Phone,
    title: 'اتصل بنا',
    content: '0506880495',
    href: 'tel:0506880495',
    description: 'متاحون 24/7',
    color: 'blue',
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    content: 'info@plumbing-electric.com',
    href: 'mailto:info@plumbing-electric.com',
    description: 'نرد خلال 24 ساعة',
    color: 'orange',
  },
  {
    icon: MapPin,
    title: 'الموقع',
    content: 'جدة، المملكة العربية السعودية',
    href: '#',
    description: 'نغطي جميع الأحياء',
    color: 'green',
  },
  {
    icon: MessageCircle,
    title: 'واتساب',
    content: '0506880495',
    href: 'https://wa.me/0506880495',
    description: 'تواصل معنا مباشرة',
    color: 'purple',
  },
];

const serviceTypes = [
  'سباكة',
  'كهرباء',
  'صيانة دورية',
  'تأسيس منازل',
  'أخرى',
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

const colorClasses: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'الاسم مطلوب';
        if (value.length < 2) return 'الاسم يجب أن يكون حرفين على الأقل';
        break;
      case 'phone':
        if (!value.trim()) return 'رقم الهاتف مطلوب';
        const phoneRegex = /^05[0-9]{8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام';
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'البريد الإلكتروني غير صالح';
        break;
      case 'service':
        if (!value) return 'يرجى اختيار نوع الخدمة';
        break;
      case 'message':
        if (!value.trim()) return 'الرسالة مطلوبة';
        if (value.length < 10) return 'الرسالة يجب أن تكون 10 أحرف على الأقل';
        break;
    }
    return undefined;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const isFormValid = () => {
    return formData.name && formData.phone && formData.service && formData.message &&
           !errors.name && !errors.phone && !errors.email && !errors.service && !errors.message;
  };

  return (
    <div className="pt-32 pb-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            تواصل معنا
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            نحن هنا لمساعدتك
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر مناسب
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const colors = colorClasses[info.color];
            return (
              <a
                key={index}
                href={info.href}
                className="animate-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`${colors.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <info.icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-700 mb-1">{info.content}</p>
                    <p className="text-gray-500 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Working Hours & Info */}
          <div className="animate-on-scroll opacity-0 space-y-6">
            {/* Working Hours */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="font-bold text-gray-900">ساعات العمل</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">السبت - الخميس</span>
                    <span className="font-medium">8 ص - 10 م</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">الجمعة</span>
                    <span className="font-medium">2 م - 10 م</span>
                  </li>
                  <li className="flex justify-between text-sm text-emergency">
                    <span>طوارئ 24/7</span>
                    <span>متوفر</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-gradient-brand text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold">دعم فني على مدار الساعة</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  فريقنا جاهز لمساعدتك في أي وقت. لا تتردد في التواصل معنا.
                </p>
                <a href="tel:0506880495">
                  <Button variant="secondary" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    <span>اتصل الآن</span>
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll opacity-0 lg:col-span-2" style={{ animationDelay: '0.2s' }}>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        الاسم <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="أدخل اسمك الكامل"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        className={errors.phone ? 'border-red-500 text-right' : 'text-right'}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني (اختياري)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="example@email.com"
                        dir="ltr"
                        className={errors.email ? 'border-red-500 text-right' : 'text-right'}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Service Type */}
                    <div className="space-y-2">
                      <Label htmlFor="service">
                        نوع الخدمة <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => handleChange('service', value)}
                      >
                        <SelectTrigger className={errors.service ? 'border-red-500' : ''}>
                          <SelectValue placeholder="اختر نوع الخدمة" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      الرسالة <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="صف مشكلتك أو الخدمة المطلوبة..."
                      rows={5}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full bg-gradient-brand hover:opacity-90 text-white gap-2"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>إرسال الطلب</span>
                      </>
                    )}
                  </Button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-green-700 font-medium">تم إرسال طلبك بنجاح!</p>
                        <p className="text-green-600 text-sm">سنقوم بالتواصل معك في أقرب وقت.</p>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
