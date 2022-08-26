import { MoonOutline as MoonIcon, SunOutline as SunIcon } from "@graywolfai/react-heroicons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Logo from "../components/logo";

const Header = () => {

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
        <header className="sticky top-0 w-screen flex justify-between flex-row h-15 shadow-sm dark:border-gray-700">
            <div className="container  px-4 sm:px-6 py-4 flex justify-between items-center">
                <Logo />
                {renderThemeChanger()}
            </div>
        </header>
    );
}



export default Header;