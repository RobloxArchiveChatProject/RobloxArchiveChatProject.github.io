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

interface Color3 {
  r: number,
  g: number,
  b: number
}

function fromRGB(r: number, g: number, b: number): Color3 {
  return {
    r: r,
    g: g,
    b: b
  }
}

const NameColors = [
  fromRGB(253, 41, 67),
  fromRGB(1, 162, 255),
  fromRGB(2, 184, 87),
  fromRGB(107, 50, 124),
  fromRGB(218, 133, 65),
  fromRGB(245, 205, 48),
  fromRGB(232, 186, 200),
  fromRGB(215, 197, 154)
]

export function GetNameValue(pName: string) {
  let value = 0
  for (let i = 0; i < pName.length; i++) {
    let cValue = pName.charCodeAt(i)
    let reverseIndex = pName.length - i
    if (pName.length % 2 == 1)
      reverseIndex = reverseIndex - 1;
    if (reverseIndex % 4 >= 2)
      cValue = -cValue;
    value = value + cValue
  }
  return value
}

const color_offset = 0
export function ComputeNameColor(pName: string) {
  return NameColors[((GetNameValue(pName) + color_offset) % NameColors.length)]
}