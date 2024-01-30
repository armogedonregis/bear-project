import { _site_name, _site_url } from '@/config'
import Head from 'next/head'

type LayoutProps = {
  title?: string
  keywords?: string
  description?: string
  children: React.ReactNode
}

export default function HeadLayout({
  title,
  keywords,
  description,
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={_site_name} />
        <meta property="og:site_name" content={_site_url} />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  )
}
