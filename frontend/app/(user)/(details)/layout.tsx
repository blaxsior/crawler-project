import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'detail page',
  description: 'detail page',
}

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
