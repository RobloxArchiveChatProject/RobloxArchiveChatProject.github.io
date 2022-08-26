import { Footer } from 'flowbite-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Header from '../sections/header'
const tips: string[] = [
  "RACP Provides you with complete chat logs!",
  "If you see any of our autonomous agents, feel free to use the commands!",
  "RACP Guarantees that the chat logs are preserved forever."
]
const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [conversation, setConver] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const [commit, setCommit] = useState<{
    commit: {
      author: {
        name: string
        date: string
      },
      committer: {
        name: string
        date: string
      },
      message: string,
      tree: {
        sha: string,
        url: string
      },
      url: string,
    }
    url: string,
    sha: string,
    html_url: string
  } | undefined>(undefined)

  const [tip, setTip] = useState(0)
  useEffect(() => {
    setTip(Math.floor(Math.random() * tips.length))
  }, [tip])

  useEffect(() => {
    if (commit == undefined || commit == null) return;
    fetch(`https://raw.githubusercontent.com/rblxacp/ChatArchive.backend/${commit.sha}/src/data/filelist.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [commit])

  useEffect(() => {
    fetch('https://api.github.com/repos/rblxacp/chatarchive.backend/branches/master')
      .then((res) => res.json())
      .then((data) => {
        setCommit(data.commit)
      })
  }, [])

  return (
    <div className='w-screen'>
      <Head>
        <title>Roblox Archive Chat Project</title>
        <meta name="description" content="Welcome to RACP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
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

          <div className="flex justify-center w-full m-2 overflow-auto" style={{ maxHeight: "15rem" }}>
            <ul className="list-none">
              {data.map((v, i) => (<li key={i}>
                <Link href={`/cluster?uuid=${v}`}>
                  <div className="btn m-1 text-sm">
                    {i + ' : ' + v}
                  </div>
                </Link>
              </li>))}
            </ul>
          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
