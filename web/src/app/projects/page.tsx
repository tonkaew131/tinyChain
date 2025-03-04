import { ProjectFilters } from "@/components/project-filters"
import { ProjectGrid } from "@/components/project-grid"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carbon Projects</h1>
          <p className="text-muted-foreground">
            Browse and purchase carbon credits from verified sustainable farming projects.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <ProjectFilters />
          </div>
          <div className="md:w-3/4">
            <ProjectGrid />
          </div>
        </div>
      </div>
    </div>
  )
}

