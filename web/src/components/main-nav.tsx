import Link from "next/link"
import { Leaf } from "lucide-react"
import Logo from '@/../public/logo.png';
import Image from "next/image";

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <div className="h-12 relative w-[5rem]">
          <Image fill alt="AkaraCarbon" className="object-contain" src={Logo} />
        </div>
      </Link>
    </div>
  )
}

