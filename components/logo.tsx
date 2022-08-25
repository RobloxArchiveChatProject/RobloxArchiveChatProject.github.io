import { LightningBoltSolid } from "@graywolfai/react-heroicons";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <a className="my-2 flex items-center space-x-1 text-amber-700 dark:text-violet-700">
                <LightningBoltSolid className="h-8 w-8 flex-shrink-0 mr-3" />
                <span className="font-bold text-3xl font-sans tracking-tight whitespace-nowrap">Roblox Archive Chat Project</span>
            </a>
        </Link>
    )
}

export default Logo;