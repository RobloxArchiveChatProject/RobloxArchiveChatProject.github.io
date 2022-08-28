import { Footer } from 'flowbite-react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '../sections/header'
import { ICommitObject } from '../utils'
const tips: string[] = [
  "RCAP Provides you with complete chat logs!",
  "If you see any of our autonomous agents, feel free to use the commands!",
  "RCAP Guarantees that the chat logs are preserved forever."
]

const createBtn = (message: string, href: string) => {
  return <Link href={href}>
    <div className="btn lg:mx-4 mx-1">
      {message}
    </div>
  </Link>
}
const Home: NextPage = () => {
  const [commit, setCommit] = useState<ICommitObject | undefined>(undefined)

  const [tip, setTip] = useState(0)
  useEffect(() => {
    setTip(Math.floor(Math.random() * tips.length))
  }, [tip])

  useEffect(() => {
    fetch('https://api.github.com/repos/rblxacp/chatarchive.backend/branches/master')
      .then((res) => res.json())
      .then((data) => {
        setCommit(data.commit)
      })
  }, [])

  return (
    <div className='w-screen'>

      <Header branch={undefined} />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center mx-4 px-4">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold mb-2">
              This is <a className="text-amber-800 dark:text-violet-500 hover:underline" href="https://github.com/rblxacp" target="_blank" rel="noreferrer">RACP</a>
            </h1>
          </div>
          <div className="flex flex-row justify-center">
            <div>
              {
                commit ?
                  <footer className="text-lg">Last:{' '}
                    <code className="text-lg font-bold text-amber-800 dark:text-indigo-400">{commit.commit.author.date}
                    </code> | <a className="link" href={commit.html_url} target="_blank" rel="noreferrer">Commit Link</a></footer> : <div>Fetching Data...</div>
              }</div>
          </div>

          <div className="flex font-mono justify-center m-2 overflow-auto">
            {tips[tip]}
          </div>

          <div className="flex flex-row justify-evenly mx-2 mt-2">
            {createBtn("Search Owner", `/sowner?sha=${commit?.sha}`)}
            {createBtn("Search Game", `/sgame?sha=${commit?.sha}`)}
            {createBtn("List All", `/listall?sha=${commit?.sha}`)}
          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
