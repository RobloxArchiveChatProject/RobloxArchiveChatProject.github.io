import { Footer } from 'flowbite-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Dialogue from '../components/dialogue'
import Header from '../sections/header'

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
    html_url: string
  } | undefined>(undefined)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/master/src/data/filelist.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

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
      <div className="flex flex-row justify-center h-full">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center w-full">
            <h1 className="text-6xl font-bold mb-2">
              This is <a className="text-amber-800 dark:text-violet-500 hover:underline" href="https://github.com/robloxarchivechatproject" target="_blank" rel="noreferrer">RACP</a>
            </h1>
          </div>
          <div className="flex justify-center w-full">
            {
              commit ?
                <footer className="text-xl">Last Update:{' '}
                  <code className="text-2xl font-bold text-amber-800 dark:text-indigo-400">{commit.commit.author.date}
                  </code> | <a className="link" href={commit.html_url} target="_blank" rel="noreferrer">Commit Link</a></footer> : <div>Roblox Chat Archive Project</div>
            }
          </div>

          <div className="flex justify-center w-full m-2 max-h-max overflow-auto">
            <ul className="list-none">
              {data.map((v, i) => (<li key={i}>
                <button className="btn" onClick={() => {
                  setuuid(v)
                }}>
                  {i + ' : ' + v}
                </button>
              </li>))}
            </ul>
          </div>

          <hr className="my-5" />
          <div className="w-max" style={{ height: "20rem" }}>
            {conversation ? <Dialogue uuid={uuid as any} dialogue={conversation as any}></Dialogue> : "None"}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
