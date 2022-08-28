import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../sections/header";
import { getDataUrl, ICommitObject } from "../utils";

const ListAll = () => {
    const router = useRouter();
    const { sha } = router.query;

    const [filelist, setFilelist] = useState<string[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sha === undefined || sha === null) return;
        setLoading(true);
        fetch(getDataUrl(sha as string, "filelist.json"))
            .then((res) => res.json())
            .then(data => {
                setFilelist(data);
                setLoading(false);
            })
    }, [sha])
    return <div className="w-screen">
        <Header branch="List All" />

        <div className="flex w-screen flex-row justify-center mt-8"> {/* center alignment */}
            <div className="flex flex-col justify-center mx-8"> {/* main container */}
                <h1 className="font-bold text-4xl">List All Entries</h1>
                <div className="mt-4 overflow-y-auto flex flex-col" style={{ maxHeight: "75%" }}>
                    {
                        loading || filelist === undefined ? <span className="text-xl">Currently loading... This might take a while</span>
                            : filelist.map((v, i) => {
                                return <Link key={i} href={`/cluster?uuid=${v}`}>
                                    <div className="btn my-2">{v}</div>
                                </Link>
                            })
                    }
                </div>
            </div>
        </div>
    </div >
}

export default ListAll;