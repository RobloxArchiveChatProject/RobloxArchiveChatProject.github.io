import Link from "next/link"

type user = {
    name: string,
    userId: number
}

function createPlayerLink(u: user, className: string = "link") {
    return <a className={className} href={`https://www.roblox.com/users/${u.userId.toString()}/profile`}>
        {u.name}
    </a>
}

function Dialogue({ uuid, dialogue }: {
    uuid: string,
    dialogue: {
        mnemonic: string,
        game: number,
        owner: user,
        users: user[],
        data: { user: user, message: string }[]
    }
}) {
    return <div className="text-lg" style={{ maxHeight: "20rem" }}>
        <h2 className="font-mono text-2xl"># {uuid}</h2>
        <p>Game: <a className="link" href={"https://www.roblox.com/games/" + dialogue.game.toString()}>{dialogue.game}</a></p>
        <p>Owner: {createPlayerLink(dialogue.owner)}</p>
        <h3>Users:</h3>
        <ul className="list-decimal list-inside pl-3.5">
            {dialogue.users.map((v, i) => {
                return <li key={v.userId.toString()}>{createPlayerLink(v)}</li>
            })}
        </ul>
        <br />
        <div className="overflow-auto flex flex-col justify-start" style={{ maxHeight: "20rem" }}>
            {dialogue.data.map((v, i) => {
                return <div key={i} className="font-semibold">
                    <div className="badge"> {createPlayerLink(v.user, "d-link")}  </div> : {v.message}
                </div>
            })}
        </div>
    </div>
}

export default Dialogue