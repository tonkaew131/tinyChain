import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center">
            <span className="font-bold">AkaraCarbon</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} AkaraCarbon. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/terms">Terms</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/privacy">Privacy</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}

