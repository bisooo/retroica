"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube } from "lucide-react"

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup")

    if (!hasSeenPopup) {
      // Show popup after a short delay
      setTimeout(() => {
        setIsOpen(true)
      }, 500)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenWelcomePopup", "true")
  }

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-black border-2 border-black dark:border-white">
        <DialogHeader>
          <DialogTitle className="font-helvicta text-xl text-center text-black dark:text-white">
            ON THE HUNT FOR SOME VINTAGE ELECTRONICS ?
          </DialogTitle>
          <DialogDescription className="font-business text-sm text-center text-black dark:text-white pt-4">
            This website is a work in progress but you can check out our collection on Etsy and stay up to date with our
            content on Instagram and Youtube
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={() => handleLinkClick("https://www.etsy.com/shop/Retroica")}
            className="w-full font-helvicta text-sm bg-orange-500 text-white border-2 border-black dark:border-white hover:bg-orange-600"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 3c-1.5 0-3 .5-4.5 1.5C10.5 3.5 9 3 7.5 3 4.5 3 2 5.5 2 8.5c0 4 3.5 7.5 10 13 6.5-5.5 10-9 10-13C22 5.5 19.5 3 16.5 3z" />
            </svg>
            SHOP ON ETSY
          </Button>

          <Button
            onClick={() => handleLinkClick("https://www.instagram.com/retroica.co/")}
            className="w-full font-helvicta text-sm bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-2 border-black dark:border-white hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5 mr-2" />
            VISIT OUR INSTAGRAM
          </Button>

          <Button
            onClick={() => handleLinkClick("https://www.youtube.com/@retroica")}
            className="w-full font-helvicta text-sm bg-red-600 text-white border-2 border-black dark:border-white hover:bg-red-700"
          >
            <Youtube className="w-5 h-5 mr-2" />
            WATCH ON YOUTUBE
          </Button>
        </div>

        <Button
          onClick={handleClose}
          variant="outline"
          className="w-full mt-2 font-business text-xs border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 bg-transparent"
        >
          CONTINUE TO WEBSITE
        </Button>
      </DialogContent>
    </Dialog>
  )
}
