import { useEffect } from 'react'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, type SEOProps } from '../lib/seo'

// Vite/React Router equivalent of Next.js metadata API.
// Renders nothing — updates <head> imperatively on mount/change.
export default function SEOMeta({ title, description, ogImage, ogType = 'website' }: SEOProps) {
  useEffect(() => {
    document.title = title

    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', ogImage ?? DEFAULT_OG_IMAGE)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:url', SITE_URL + window.location.pathname)

    // Twitter / X card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage ?? DEFAULT_OG_IMAGE)
  }, [title, description, ogImage, ogType])

  return null
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}
