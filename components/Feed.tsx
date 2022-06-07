import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

// import Post from "./Post";
type Props = {
  topic?: string
}

export default function Feed({ topic }: Props) {
  const { data: session } = useSession()
  const { data, error, loading } = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
    variables: {
      topic: topic,

    }
  })

  if (session) {
    if (loading) {
      return <div className="ml-[45%] text-gray-400">Loading posts....</div>
    }
  }

  const posts: Post[] = session && (!topic ? data?.getPostList : data?.getPostListByTopic)
  // console.log('data is:', posts)

  return (
    <div className="mt-5 space-y-4">
      {session && posts?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
}
