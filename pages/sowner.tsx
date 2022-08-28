import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../sections/header";
import { getDataUrl } from "../utils";

export const Sowner = () => {
    const router = useRouter();
    const { sha } = router.query;

    const [ownerlist, setOwnerlist] = useState<Array<{ userId: number, name: string, uuid: string[] }> | undefined>(undefined);
    const [toDisplay, setToDisplay] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState<{ id: boolean, value: string | undefined }>({ id: false, value: undefined });

    useEffect(() => {
        if (sha === undefined || sha === null) return;
        setLoading(true);
        fetch(getDataUrl(sha as string, "ownerlist.json"))
            .then((res) => res.json())
            .then(data => {
                setOwnerlist(data);
                setLoading(false);
            })
    }, [sha])

    useEffect(() => {
        const { id, value } = { ...searchValue }
        if (value === undefined) {
            return;
        }
        const arr: string[] = []
        if (id) {
            ownerlist?.forEach((v, i) => {
                console.log(v.userId.toString())
                if (v.userId.toString(10).indexOf(value) !== -1)
                    arr.push(...v.uuid)
            })
        } else {
            ownerlist?.forEach((v, i) => {
                if (v.name.toLowerCase().indexOf(value) !== -1)
                    arr.push(...v.uuid)
            })
        }
        setToDisplay(arr)
    }, [searchValue, ownerlist])
    return <div>
        <Header branch="Search Game" />


        <div className="flex w-screen flex-row justify-center mt-8"> {/* center alignment */}
            <div className="flex flex-col justify-center mx-8"> {/* main container */}
                <h1 className="font-bold text-4xl">Search Owner</h1>
                <div className="flex-row flex justify-between">
                    <div className="mt-auto mx-1">
                        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" value="UseID" id="default-toggle" className="sr-only peer" onChange={(handle) => {
                                setSearchValue({ id: handle.currentTarget.checked, value: searchValue.value })
                            }} />
                            <div className="w-11 h-6 bg-zinc-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500 dark:peer-checked:bg-violet-500"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{searchValue.id ? "ID: Enabled" : "ID: Disabled"}</span>
                        </label>
                    </div>
                    <div className="mt-auto mx-1">
                        <input type="search" className="search" placeholder="Type the user's UserID/Name here" onChange={(handle) => {
                            handle.target.style.minWidth = Math.max(handle.target.value.length, 10).toString() + "ch";
                            if (handle.target.value.length === 0) {
                                setSearchValue({ id: searchValue.id, value: undefined })
                                return
                            }
                            setSearchValue({ id: searchValue.id, value: handle.target.value })
                        }} />
                    </div>
                </div>
                <div className="mt-4 overflow-y-auto flex flex-col" style={{ maxHeight: "75%" }}>
                    {
                        searchValue.value === undefined && ownerlist !== undefined
                            ? ownerlist.map((v, i) => {
                                return <div className="flex flex-col" key={v.userId}>
                                    <span className="text-lg font-bold">{searchValue.id ? v.userId : v.name}</span>
                                    {
                                        v.uuid.map((v, i) => {
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

export default Sowner;