import { LightningBoltSolid } from "@graywolfai/react-heroicons";
import Link from "next/link";

const Logo = ({ branch }: { branch: string | undefined }) => {
    return (
        <Link href="/">
            <a className="select-none my-2 flex items-center space-x-1 text-amber-700 dark:text-violet-400 mr-2">
                <LightningBoltSolid className="h-8 w-8 flex-shrink-0 mr-3" />
                <span className="font-bold text-sm md:text-3xl font-sans tracking-tight whitespace-nowrap">Roblox Archive Chat Project{branch ? ` | ${branch}` : ""}</span>
            </a>
        </Link>
    )
}

export default Logo;