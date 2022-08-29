import dayjs from "dayjs"
import Head from "next/head"
import Link from "next/link"
import Header from "../../sections/header"
import { getAllArticles } from "../api/utils"

export default function BlogPage({ posts }: { posts: any[] }) {
    return (
        <>
            <Header branch={"Blog"} />

            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center mx-4 px-4">
                    <div>
                        {posts.map((frontMatter: any) => {
                            return (
                                <Link key={frontMatter.title} href={`/blog/${frontMatter.slug}`} passHref>
                                    <div className="bg-amber-300 dark:bg-zinc-700 hover:bg-amber-500 dark:hover:bg-indigo-900 p-2 md:p-4 md:text-xl text-lg rounded-xl transition-colors shadow-xl">
                                        <h1 className="title text-3xl font-bold">{frontMatter.title}</h1>
                                        <p className="summary italic">{frontMatter.excerpt}</p>
                                        <p className="date">
                                            {dayjs(frontMatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                                            {frontMatter.readingTime}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const articles = await getAllArticles()

    articles
        .map((article) => article.data)
        .sort((a, b) => {
            if (a.data.publishedAt > b.data.publishedAt) return 1
            if (a.data.publishedAt < b.data.publishedAt) return -1

            return 0
        })

    return {
        props: {
            posts: articles.reverse(),
        },
    }
}