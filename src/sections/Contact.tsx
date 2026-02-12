import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ✅ بيانات التواصل */
const contactInfo = [
  {
    icon: Phone,
    title: "اتصل بنا مباشرة",
    content: "0506880495",
    href: "tel:0506880495",
    description: "متاحون لخدمتك على مدار الساعة",
  },
  {
    icon: MessageCircle,
    title: "واتساب",
    content: "0506880495",
    href: "https://wa.me/966506880495",
    description: "راسلنا عبر واتساب بسهولة",
  },
  {
    icon: MapPin,
    title: "موقعنا",
    content: "جدة",
    href: "#",
    description: "نغطي جميع أحياء جدة",
  },
];

/* ✅ أنواع الخدمات */
const serviceTypes = ["سباكة", "كهرباء", "صيانة دورية", "تأسيس منازل", "أخرى"];

interface FormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sectionRef = useRef<HTMLDivElement>(null);

  /* Animation on Scroll */
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* Validation */
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "الاسم مطلوب";
        break;

      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        const phoneRegex = /^05[0-9]{8}$/;
        if (!phoneRegex.test(value))
          return "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
        break;

      case "service":
        if (!value) return "يرجى اختيار نوع الخدمة";
        break;

      case "message":
        if (!value.trim()) return "الرسالة مطلوبة";
        if (value.length < 10) return "الرسالة يجب أن تكون 10 أحرف على الأقل";
        break;
    }
    return undefined;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus("success");

    setFormData({
      name: "",
      phone: "",
      service: "",
      message: "",
    });

    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.phone &&
      formData.service &&
      formData.message &&
      !errors.name &&
      !errors.phone &&
      !errors.service &&
      !errors.message
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            تواصل معنا
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            نحن هنا لمساعدتك
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            تواصل معنا الآن واحصل على استشارة مجانية وعرض سعر مناسب
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="animate-on-scroll opacity-0 space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target="_blank"
                className="flex items-start gap-4 bg-white p-5 rounded-xl hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <info.icon className="w-5 h-5 text-blue-600 group-hover:text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{info.title}</h3>
                  <p className="text-gray-700 mt-1">{info.content}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {info.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll opacity-0 lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label>الاسم *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="أدخل اسمك"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs flex gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>رقم الهاتف *</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs flex gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label>نوع الخدمة *</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      handleChange("service", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الخدمة" />
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
                    <p className="text-red-500 text-xs flex gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.service}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2 sm:col-span-2">
                  <Label>الرسالة *</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="صف مشكلتك..."
                    rows={4}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs flex gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white gap-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الطلب
                  </>
                )}
              </Button>

              {/* Success */}
              {submitStatus === "success" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-green-700 font-medium">
                    تم إرسال طلبك بنجاح! سنقوم بالتواصل معك قريباً.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}