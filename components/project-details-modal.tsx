"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { X } from "lucide-react"

type ProjectDetailsProps = {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    fullDescription?: string
    image: string
    tags: string[]
    features?: string[]
  }
}

export function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] bg-alania-dark border-white/10 p-0 overflow-hidden">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors sm:hidden"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <DialogHeader className="p-4 sm:p-6">
            <DialogTitle className="text-xl sm:text-2xl font-bold pr-8 sm:pr-0">{project.title}</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm sm:text-base">{project.description}</DialogDescription>
          </DialogHeader>

          {/* Project Image */}
          <div className="relative h-48 sm:h-60 w-full">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div className="p-4 sm:p-6">
            {/* Full Description */}
            {project.fullDescription && (
              <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            )}

            {/* Features */}
            {project.features && (
              <div className="mb-4 sm:mb-6">
                <h4 className="text-lg font-semibold mb-3">Ключевые функции:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-white/90 text-sm sm:text-base">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 rounded-full bg-alania-orange/10 text-alania-orange text-xs sm:text-sm border border-alania-orange/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
