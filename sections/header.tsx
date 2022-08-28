import { MoonOutline as MoonIcon, SunOutline as SunIcon } from "@graywolfai/react-heroicons";
import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../components/logo";

const Header = ({ branch }: { branch: string | undefined }) => {

    const { systemTheme, theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <SunIcon className="w-10 h-10 text-yellow-400 " role="button" onClick={() => setTheme('light')} />
            )
        }

        else {
            return (
                <MoonIcon className="w-10 h-10 text-blue-500 " role="button" onClick={() => setTheme('dark')} />
            )
        }
    };
    return (
        <>
            <Head>
                <title>RACP{(branch !== undefined ? ` | ${branch}` : "")}</title>
                <meta name="description" content="Welcome to RACP" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="sticky top-0 w-screen flex justify-between flex-row h-15 shadow-sm dark:border-gray-700">
                <div className="container  px-4 sm:px-6 py-4 flex justify-start items-center">
                    <Logo branch={branch} />
                    {renderThemeChanger()}
                </div>

            </header>

            {
                branch ?
                    <Link href="/"><div className="btn w-min mx-8" > Go Back</div></Link> : <></>
            }
        </>
    );
}



export default Header;