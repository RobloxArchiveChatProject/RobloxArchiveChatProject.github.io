import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Header from "../sections/header";

type user = {
    name: string,
    userId: number
}
type dialogue = {
    mnemonic: string,
    game: number,
    owner: user,
    users: user[],
    data: { user: user, message: string }[]
}

function createPlayerLink(u: user, className: string = "link") {
    return <a className={className} target="_blank" rel="noreferrer" href={`https://www.roblox.com/users/${u.userId.toString()}/profile`}>
        {u.name}
    </a>
}
const geturl = (uuid: string) => {
    return 'https://raw.githubusercontent.com/rblxacp/ChatArchive.backend/master/src/data/' + uuid;
}

const Cluster = () => {
    const router = useRouter();
    const { uuid } = router.query;
    const [currentUUID, setUUID] = useState<string | undefined>(uuid as any);
    const [dialogue, setDialogue] = useState<dialogue | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (uuid === undefined || uuid === null || uuid === "") {
            return;
        }
        setLoading(true);
        setUUID(uuid as any);
        fetch(geturl(uuid as string))
            .then((res) => res.json())
            .then((data) => {
                setDialogue(data);
                setLoading(false);
            })
    }, [uuid])

    return <div className="h-screen flex-col flex">
        <Header />
        <div className="btn w-min mx-8" ><Link href="/"> Go Back</Link></div>
        <div className="flex w-screen flex-row justify-center mt-8"> {/* center alignment */}
            <div className="flex flex-col justify-center mx-8"> {/* main container */}
                <h1 className={"text-3xl " + ((loading) ? "text-red-700 font-bold" : "")}> {currentUUID} </h1>
                {
                    (!loading && dialogue)
                        ? <>
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
                                    return <div key={i} className="font-semibold px-2">
                                        <div className="badge"> {createPlayerLink(v.user, "d-link")}  </div> : {v.message}
                                    </div>
                                })}
                            </div>
                        </>
                        : <div className="font-mono">
                            This can take up to ten seconds, depending on your Internet connection.
                        </div>
                }
            </div>
        </div>
    </div>
}

export default Cluster
