import { FunctionComponent } from "react"
import { FaGithub } from "react-icons/fa"

export const Header: FunctionComponent = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-4 my-4 space-y-4 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold sm:text-2xl">Yage</h1>
          <p className="text-xs text-gray-800 dark:text-gray-400 sm:text-lg">
            Chat with 4500+ YC companies
          </p>
        </div>
        <a
          href="https://github.com/michaelmagan/yc-sage-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </header>
  )
}
