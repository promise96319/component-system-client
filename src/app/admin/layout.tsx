import Link from 'next/link'
import './layout.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='container'>
      <div className='sidebar'>
        <Link href="/admin/version-history">Version History</Link>
        <Link href="/admin/account">Account</Link>
      </div>
     
      {children}
    </div>
  )
}
