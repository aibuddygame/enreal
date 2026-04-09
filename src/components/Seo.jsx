import { useEffect } from 'react'

const DEFAULT_IMAGE = '/og-course.jpg'
const SITE_NAME = 'Enreal AI'
const BASE_URL = 'https://enreal-ai.vercel.app'

function upsertMeta(attr, key, content) {
    if (!content) return
    const selector = `meta[${attr}="${key}"]`
    let element = document.head.querySelector(selector)
    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, key)
        document.head.appendChild(element)
    }
    element.setAttribute('content', content)
}

function upsertLink(rel, href, extra = {}) {
    if (!href) return
    const selector = Object.entries(extra).reduce(
        (acc, [k, v]) => `${acc}[${k}="${v}"]`,
        `link[rel="${rel}"]`,
    )
    let element = document.head.querySelector(selector)
    if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        Object.entries(extra).forEach(([k, v]) => element.setAttribute(k, v))
        document.head.appendChild(element)
    }
    element.setAttribute('href', href)
}

function upsertScript(id, json) {
    if (!json) return
    let element = document.head.querySelector(`script[data-seo-id="${id}"]`)
    if (!element) {
        element = document.createElement('script')
        element.type = 'application/ld+json'
        element.setAttribute('data-seo-id', id)
        document.head.appendChild(element)
    }
    element.textContent = JSON.stringify(json)
}

export default function Seo({
    title,
    description,
    path = '/',
    image = DEFAULT_IMAGE,
    type = 'website',
    robots = 'index, follow',
    alternates = [],
    schema,
}) {
    useEffect(() => {
        const canonical = new URL(path, BASE_URL).toString()
        const imageUrl = new URL(image, BASE_URL).toString()
        document.title = title

        upsertMeta('name', 'description', description)
        upsertMeta('name', 'robots', robots)
        upsertMeta('property', 'og:type', type)
        upsertMeta('property', 'og:site_name', SITE_NAME)
        upsertMeta('property', 'og:title', title)
        upsertMeta('property', 'og:description', description)
        upsertMeta('property', 'og:url', canonical)
        upsertMeta('property', 'og:image', imageUrl)
        upsertMeta('name', 'twitter:card', 'summary_large_image')
        upsertMeta('name', 'twitter:title', title)
        upsertMeta('name', 'twitter:description', description)
        upsertMeta('name', 'twitter:image', imageUrl)
        upsertLink('canonical', canonical)

        alternates.forEach(({ hrefLang, href }) => {
            upsertLink('alternate', new URL(href, BASE_URL).toString(), { hreflang: hrefLang })
        })

        upsertScript('route-schema', schema)
    }, [title, description, path, image, type, robots, alternates, schema])

    return null
}

export const seoBase = {
    siteName: SITE_NAME,
    baseUrl: BASE_URL,
}
