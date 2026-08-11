export const SITE_NAME = 'AusRealTour'
export const SITE_URL = 'https://ausrealtour.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export type SEOProps = {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
}

export function buildTitle(pageTitle: string) {
  return `${pageTitle} | ${SITE_NAME}`
}
