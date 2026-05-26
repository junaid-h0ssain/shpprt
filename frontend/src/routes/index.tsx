import Navbar from '#/components/Navbar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className=''>
      <Navbar />
    </div>
  )
}
