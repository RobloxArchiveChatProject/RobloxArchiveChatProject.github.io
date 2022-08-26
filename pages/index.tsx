import { Footer } from 'flowbite-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Dialogue from '../components/dialogue'
import Header from '../sections/header'
const tips: string[] = [
  "RCAP Provides you with complete chat logs!",
  "If you see any of our autonomous agents, feel free to use the commands!",
  "RCAP Guarantees that the chat logs are preserved forever."
]
const Home: NextPage = () => {
  const [data, setData] = useState([])
  const [conversation, setConver] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [uuid, setuuid] = useState(null)

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
    if(commit == undefined || commit == null) return;
// https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/34faa7a4d14fbc22cb52b1167c490902fc49d0dd/src/data/709dad93-b27f-4875-bc2a-d4888bf9cfa8.json
    fetch(`https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/${commit.sha}/src/data/filelist.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [commit])

  useEffect(() => {
    fetch('https://api.github.com/repos/robloxarchivechatproject/chatarchive.backend/branches/master')
      .then((res) => res.json())
      .then((data) => {
        setCommit(data.commit)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    if (uuid == null) return
    fetch('https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/master/src/data/' + uuid)
      .then((res) => res.json())
      .then((data) => {
        setConver(data)
      })
  }, [uuid])
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <Head>
        <title>Roblox Archive Chat Project</title>
        <meta name="description" content="Welcome to RACP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex flex-row justify-center" style={{ marginTop: "calc(5rem + 5px)"}}>
        <div className="flex flex-col justify-center mx-4 px-4">
          <div className="flex justify-center w-full">
            <h1 className="text-4xl font-bold mb-2">
              This is <a className="text-amber-800 dark:text-violet-500 hover:underline" href="https://github.com/robloxarchivechatproject" target="_blank" rel="noreferrer">RACP</a>
            </h1>
          </div>
          <div className="flex justify-center w-full">
            {
              commit ?
                <footer className="text-lg">Last Update:{' '}
                  <code className="text-lg font-bold text-amber-800 dark:text-indigo-400">{commit.commit.author.date}
                  </code> | <a className="link" href={commit.html_url} target="_blank" rel="noreferrer">Commit Link</a></footer> : <div>Fetching Data...</div>
            }
          </div>

          <div className="flex justify-center w-full m-2 overflow-auto" style={{ maxHeight: "15rem" }}>
            <ul className="list-none">
              {data.map((v, i) => (<li key={i}>
                <button className="btn m-1 text-sm" id={(i + tip + Math.random() * 10).toString() + "_" + uuid} onClick={() => {
                  setuuid(v)
                }}>
                  {i + ' : ' + v}
                </button>
              </li>))}
            </ul>
          </div>

        </div>

          <div className="w-3/5 whitespace-pre-wrap" style={{ maxHeight: "70vh" }}>
            <hr className="my-5" />
            {conversation
              ? <Dialogue uuid={uuid as any} dialogue={conversation as any}></Dialogue>
              : <span className="font-mono">{`Tip: ${tips[tip]} | There is a two-minute gap between the current display and the latest commit.
              If you encounter async problems, wait for several minutes and the data will be transferred.`}</span>}
          </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
