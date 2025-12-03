import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"

// Динамическая загрузка тяжелых компонентов для улучшения производительности
const ServicesSection = dynamic(() => import("@/components/services-section"), {
  loading: () => <div className="min-h-screen" />,
})
const AboutSection = dynamic(() => import("@/components/about-section"), {
  loading: () => <div className="min-h-screen" />,
})
const ProjectsSection = dynamic(() => import("@/components/projects-section"), {
  loading: () => <div className="min-h-screen" />,
})
const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <div className="min-h-screen" />,
})

export default function Home() {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
