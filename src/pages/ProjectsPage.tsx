import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Filter } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'تركيب سخان مركزي',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    description: 'تركيب سخان مركزي لمجمع سكني يضم 20 شقة',
    location: 'جدة - حي الياسمين',
    date: 'يناير 2025'
  },
  {
    id: 2,
    title: 'تأسيس كهرباء فيلا',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    description: 'تأسيس كامل للكهرباء في فيلا سكنية ثلاثة أدوار',
    location: 'جدة - حي الملقا',
    date: 'ديسمبر 2024'
  },
  {
    id: 3,
    title: 'إصلاح تسرب ماء',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'كشف وإصلاح تسرب ماء في الحمام الرئيسي',
    location: 'جدة - حي النرجس',
    date: 'ديسمبر 2024'
  },
  {
    id: 4,
    title: 'تركيب إضاءة LED',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    description: 'تركيب نظام إضاءة LED حديث لمكتب تجاري',
    location: 'جدة - حي العليا',
    date: 'نوفمبر 2024'
  },
  {
    id: 5,
    title: 'تسليك مجاري',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    description: 'تسليك مجاري المطبخ والحمام بأحدث المعدات',
    location: 'جدة - حي الصحافة',
    date: 'نوفمبر 2024'
  },
  {
    id: 6,
    title: 'تركيب لوحة قواطع',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    description: 'تركيب لوحة قواطع كهربائية حديثة مع حماية شاملة',
    location: 'جدة - حي النزهة',
    date: 'أكتوبر 2024'
  },
  {
    id: 7,
    title: 'صيانة دفايات غاز',
    category: 'سباكة', // تم تعديلها إلى سباكة
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    description: 'صيانة دورية لدفايات الغاز في شركة تجارية',
    location: 'جدة - حي السليمانية',
    date: 'أكتوبر 2024'
  },
  {
    id: 8,
    title: 'تمديد كابلات',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    description: 'تمديد كابلات كهربائية للطابق العلوي في فيلا',
    location: 'جدة - حي الروضة',
    date: 'سبتمبر 2024'
  },
  {
    id: 9,
    title: 'تركيب فلاتر مياه',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    description: 'تركيب نظام فلاتر مياه متكامل لمنزل',
    location: 'جدة - حي الغدير',
    date: 'سبتمبر 2024'
  },
  {
    id: 10,
    title: 'إصلاح عطل كهربائي',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    description: 'إصلاح عطل كهربائي طارئ في مصنع',
    location: 'جدة - المدينة الصناعية',
    date: 'أغسطس 2024'
  },
  {
    id: 11,
    title: 'تأسيس سباكة كامل',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'تأسيس كامل لشبكة السباكة في فيلا جديدة',
    location: 'جدة - حي الملقا',
    date: 'أغسطس 2024'
  },
  {
    id: 12,
    title: 'تركيب مكيفات',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    description: 'تركيب 10 مكيفات سبليت في مبنى إداري',
    location: 'جدة - حي العليا',
    date: 'يوليو 2024'
  },
];

// ✅ إزالة الغاز من الفلتر
const categories = ['الكل', 'سباكة', 'كهرباء'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedCategory === 'الكل'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: number) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredProjects.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            معرض أعمالنا
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            شاهد بعض من أعمالنا السابقة التي نفذناها بأعلى معايير الجودة
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-3 mb-12 animate-on-scroll opacity-0">
          <Filter className="w-5 h-5 text-gray-500 ml-2" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-brand-blue text-white shadow-glow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl"
              onClick={() => openLightbox(index)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    project.category === 'سباكة'
                      ? 'bg-blue-500'
                      : 'bg-orange-500'
                  }`}
                >
                  {project.category}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.description}</p>
                <p className="text-white/70 text-sm">{project.location}</p>
              </div>

              {/* Zoom */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">لا توجد مشاريع في هذا القسم</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            disabled={currentImageIndex === 0}
            className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            disabled={currentImageIndex === filteredProjects.length - 1}
            className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-5xl px-16">
            <img
              src={filteredProjects[currentImageIndex].image}
              alt={filteredProjects[currentImageIndex].title}
              className="rounded-lg max-h-[70vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
