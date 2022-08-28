import Footer from "./footer";
import Head from "next/head";

const Layout = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>Nextjs-Dev Blog</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>

            <div className="min-h-screen mx-auto max-w-2xl flex flex-col">
                <main className="flex-grow container mx-auto px-4 sm:px-6">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;