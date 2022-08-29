import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { sync } from 'glob'

const articlesPath = path.join(process.cwd(), 'data/articles')


export async function getAllArticles() {
  const articles = fs.readdirSync(articlesPath)

  return articles.reduce((allArticles:any[], articleSlug:string) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/articles', articleSlug),
      'utf-8'
    )
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: articleSlug.replace('.mdx', ''),
        readingTime: readingTime(source).text,
      },
      ...allArticles,
    ]
  }, [])
}

export async function getArticleFromSlug(slug:string) {
    const articleDir = path.join(articlesPath, `${slug}.mdx`)
    const source = fs.readFileSync(articleDir)
    const { content, data } = matter(source)

    return {
        content,
        frontmatter: {
            slug,
            excerpt: data.excerpt,
            title: data.title,
            publishedAt: data.publishedAt,
            readingTime: readingTime(source as unknown as string).text,
            ...data,
        },
    }
}

export async function getSlug() {
    console.log(articlesPath)
    const paths = sync((`${articlesPath}/*.mdx`).replace(/\\/g, '/'))
    console.log(paths)

    return paths.map((path) => {
        // holds the paths to the directory of the article
        const pathContent = path.split('/')
        const fileName = pathContent[pathContent.length - 1]
        const [slug, _extension] = fileName.split('.')

        return slug
    })
}