import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/design-mode/IMG_0027.PNG.png"
                alt="Valley Sports Arena"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-lg font-bold text-primary">Valley Sports Arena</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md text-pretty">
              Mannargudi's premier FIFA-certified sports turf. Experience world-class facilities for cricket and
              football with 50mm eco-friendly grass.
            </p>
            <p className="text-sm text-muted-foreground">Open 24/7 for your convenience</p>

            <div className="mt-4">
              <a
                href="https://www.instagram.com/vall.eyturf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@vall.eyturf</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Slot
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Mela mottai road</li>
              <li>Mannargudi, Tamil Nadu</li>
              <li>614001</li>
              <li className="pt-2">
                <a href="tel:+917904831017" className="hover:text-primary transition-colors">
                  +91 7904831017
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Valley Sports Arena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
