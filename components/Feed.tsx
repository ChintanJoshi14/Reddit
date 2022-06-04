import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS } from '../graphql/queries'
import Post from './Post'
import toast from 'react-hot-toast'

// import Post from "./Post";

export default function Feed() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  if (loading) return <div>Loading posts....</div>;

  const posts: Post[] = data?.getPostList
  console.log('data is:', posts)

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
