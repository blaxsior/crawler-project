import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search page',
  description: '검색 페이지',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
