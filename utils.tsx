export interface ICommitObject {
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
}

export type user = {
  name: string,
  userId: number
}
export type dialogue = {
  mnemonic: string,
  game: number,
  owner: user,
  users: user[],
  pkgversion: string,
  date: string,
  data: { user: user, message: string }[]
}
// Helper functions

export function getDataUrl(sha: string, sticky: string): string {
  return `https://raw.githubusercontent.com/RobloxArchiveChatProject/ChatArchive.backend/${sha}/src/data/${sticky}`;
}

export function createPlayerLink(u: user, className = "link") {
  return <a className={className} target="_blank" rel="noreferrer" href={`https://www.roblox.com/users/${u.userId.toString()}/profile`}>
    {u.name}
  </a>
}