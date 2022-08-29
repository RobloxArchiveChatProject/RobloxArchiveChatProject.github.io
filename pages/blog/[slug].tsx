import dayjs from 'dayjs'
import React from 'react'
import Head from 'next/head'
import rehypeSlug from 'rehype-slug'
import { MDXRemote } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import { serialize } from 'next-mdx-remote/serialize'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { getSlug, getArticleFromSlug } from '../api/utils'
import { SectionTitle, Text } from '../../data/components/mdx-components'
import Header from '../../sections/header'


export default function Blog({ post: { source, frontmatter } }: any) {
    return (
        <>
            <Header branch={frontmatter.title} />

            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center mx-4 px-4">
                    <div className="article-container">
                        <h1 className="article-title">{frontmatter.title}</h1>
                        <hr className="my-2" />
                        <p className="publish-date font-mono">
                            {dayjs(frontmatter.publishedAt).format('MMMM D, YYYY')} &mdash;{' '}
                            {frontmatter.readingTime}
                        </p>
                        <div className="content" style={{ maxWidth: "120ch" }}>
                            <MDXRemote {...source} components={{ SectionTitle, Text }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps({ params }: any) {
    //fetch the particular file based on the slug
    const { slug } = params
    console.log(slug)
    const { content, frontmatter } = await getArticleFromSlug(slug)

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: { className: ['anchor'] },
                    },
                    { behaviour: 'wrap' },
                ],
                rehypeHighlight,
                rehypeCodeTitles,
            ],
        },
    })

    return {
        props: {
            key: frontmatter.title,
            post: {
                source: mdxSource,
                frontmatter,
            },
        },
    }
}

export async function getStaticPaths() {
    const paths = (await getSlug()).map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}