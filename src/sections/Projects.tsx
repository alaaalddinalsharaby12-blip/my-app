import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'تركيب سخان مركزي',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    description: 'تركيب سخان مركزي لمجمع سكني'
  },
  {
    id: 2,
    title: 'تأسيس كهرباء',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    description: 'تأسيس كامل للكهرباء في فيلا سكنية'
  },
  {
    id: 3,
    title: 'إصلاح تسرب ماء',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'كشف وإصلاح تسرب ماء في الحمام'
  },
  {
    id: 4,
    title: 'تركيب إضاءة LED',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    description: 'تركيب نظام إضاءة LED حديث'
  },
  {
    id: 5,
    title: 'تسليك مجاري',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    description: 'تسليك مجاري المطبخ والحمام'
  },
  {
    id: 6,
    title: 'تركيب قواطع كهرباء',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    description: 'تركيب لوحة قواطع كهربائية حديثة'
  },
  {
    id: 7,
    title: 'صيانة دفاية',
    category: 'سباكة',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    description: 'صيانة دورية لدفايات الغاز'
  },
  {
    id: 8,
    title: 'تمديد كابلات',
    category: 'كهرباء',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    description: 'تمديد كابلات كهربائية للطابق العلوي'
  },
];

const categories = ['الكل', 'سباكة', 'كهرباء'];

interface ProjectsProps {
  limit?: number;
}

export default function Projects({ limit }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  let filteredProjects = selectedCategory === 'الكل' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  // Apply limit if provided
  if (limit) {
    filteredProjects = filteredProjects.slice(0, limit);
  }

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'ArrowRight') navigateImage(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

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

  const navigateToProjects = () => {
    window.location.hash = '#/projects';
    window.scrollTo(0, 0);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <span className="inline-block bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
            معرض أعمالنا
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            نفتخر بأعمالنا
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            شاهد بعض من أعمالنا السابقة التي نفذناها بأعلى معايير الجودة
          </p>
        </div>

        {/* Category Filter - Only show if no limit */}
        {!limit && (
          <div className="flex justify-center gap-3 mb-10 animate-on-scroll opacity-0">
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
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0 group relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-brand-blue-light text-xs font-medium mb-1">
                  {project.category}
                </span>
                <h3 className="text-white font-bold mb-1">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.description}</p>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {limit && (
          <div className="text-center mt-10 animate-on-scroll opacity-0">
            <Button 
              size="lg" 
              className="bg-gradient-orange text-white gap-2"
              onClick={navigateToProjects}
            >
              <span>عرض جميع الأعمال</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors ${
              currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentImageIndex === 0}
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors ${
              currentImageIndex === filteredProjects.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentImageIndex === filteredProjects.length - 1}
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredProjects[currentImageIndex].image}
              alt={filteredProjects[currentImageIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-brand-blue-light text-sm font-medium">
                {filteredProjects[currentImageIndex].category}
              </span>
              <h3 className="text-white font-bold text-xl mt-1">
                {filteredProjects[currentImageIndex].title}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                {filteredProjects[currentImageIndex].description}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-6' : 'bg-white/40'
                }`}
                aria-label={`الصورة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
