import React, { useEffect, useState } from "react"
import { FaDiscord, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const JoinDiscordModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Want to learn more about Hydra-AI?</DialogTitle>
          <DialogDescription>
            Yage is being powered by hydra-ai an open-source react framework for
            adaptive UIs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="default"
            className="bg-[#5865F2] text-white hover:bg-[#4752C4]"
            onClick={() =>
              window.open("https://discord.gg/dJNvPEHth6", "_blank")
            }
          >
            <FaDiscord className="mr-2" />
            Join Discord
          </Button>
          <Button
            variant="secondary"
            className="bg-[#24292e] text-white hover:bg-[#2c3136]"
            onClick={() =>
              window.open("https://github.com/michaelmagan/hydraai", "_blank")
            }
          >
            <FaGithub className="mr-2" />
            Check out our Repo
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Don&apos;t forget to star our GitHub. It really helps!
        </p>
      </DialogContent>
    </Dialog>
  )
}

export const TweetAboutUsModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const tweetText = encodeURIComponent(
    "You have got to checkout yage: https://yage.usehydra.ai cc @mrmagan_"
  )
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
  const emailSubject = encodeURIComponent("Check out Yage!")
  const emailBody = encodeURIComponent(
    "Hey, I found this cool AI-powered app called Yage. Check it out: https://yage.usehydra.ai"
  )
  const emailUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wow you are really loving Yage!</DialogTitle>
          <DialogDescription>
            While you wait, want to share this demo?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="default"
            className="bg-[#1DA1F2] text-white hover:bg-[#1a91da]"
            onClick={() => window.open(tweetUrl, "_blank")}
          >
            <FaTwitter className="mr-2" />
            Post on X
          </Button>
          <Button
            variant="default"
            className="bg-[#D44638] text-white hover:bg-[#B23121]"
            onClick={() => window.open(emailUrl, "_blank")}
          >
            <FaEnvelope className="mr-2" />
            Email a Friend
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
