import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import dayJs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowBigRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayJs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  console.log(token)
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data
  console.log(memories)
  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((mem) => {
        return (
          <div key={mem.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayJs(mem.createAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>

            <Image src={mem.coverUrl} width={592} height={280} alt="" />
            <p className="text-lg leading-relaxed text-gray-100">
              {mem.excerpt}
            </p>
            <Link
              href={`/memories/${mem.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowBigRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
