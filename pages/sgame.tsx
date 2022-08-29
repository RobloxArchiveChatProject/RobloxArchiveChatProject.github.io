import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../sections/header";
import { getDataUrl } from "../utils";

const iter = (a: IterableIterator<any>, b: (a: string) => any): any => {
    let v: any;
    const arr: Element[] = []
    do {
        v = a.next().value
        if (!v) break;
        arr.push(b(v))
    } while (v)
    return arr
}
const Sgame = () => {
    const router = useRouter();
    const { sha } = router.query;

    const [gamelist, setGamelist] = useState<Map<string, { gameName: string, uuid: string[] }> | undefined>(undefined);
    const [toDisplay, setToDisplay] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (sha === undefined || sha === null) return;
        setLoading(true);
        fetch(getDataUrl(sha as string, "gamelist.json"))
            .then((res) => res.json())
            .then(data => {
                setGamelist(new Map(Object.entries(data)));
                setLoading(false);
            })
    }, [sha])

    useEffect(() => {
        if (searchValue === undefined) {
            return;
        }
        const arr: string[] = []
        gamelist?.forEach((v, i) => {
            if (i.indexOf(searchValue) !== -1)
                arr.push(...v.uuid)
        })
        setToDisplay(arr)
    }, [searchValue, gamelist])
    return <div>
        <Header branch="Search Game" />


        <div className="flex w-screen flex-row justify-center mt-8"> {/* center alignment */}
            <div className="flex flex-col justify-center mx-8"> {/* main container */}
                <h1 className="font-bold text-4xl">Search Game(ID)</h1>
                <form>
                    <input type="search" className="search" onChange={(handle) => {
                        if (handle.target.value.length === 0) {
                            setSearchValue(undefined)
                            return
                        }
                        setSearchValue(handle.target.value)
                    }} />
                </form>
                <div className="mt-4 overflow-y-auto" style={{ maxHeight: "75%" }}>
                    {
                        searchValue === undefined && gamelist !== undefined
                            ? iter(gamelist.keys(), (ov: string) => {
                                return <div className="flex flex-col" key={ov}>
                                    <span className="text-lg">{ov + "|" + gamelist.get(ov)?.gameName ?? "No Name"}</span>
                                    <hr className="my-2" />
                                    {
                                        gamelist.get(ov)?.uuid.map((v, i) => {
                                            return <Link key={i} href={`/cluster?uuid=${v}`}><div className="btn-sm">{v}</div></Link>
                                        })
                                    }
                                </div>
                            })
                            :
                            toDisplay.map((v, i) => {
                                {/* !IMPORTANT: THERE SHALL NOT BE ANY WHITESPACES BETWEEN LINK AND DIV */ }
                                return <Link key={i} href={`/cluster?uuid=${v}`}><div className="btn">{v}</div></Link>
                            })
                    }
                </div>
            </div>
        </div>
    </div>
}

export default Sgame;