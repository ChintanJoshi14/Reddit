import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import client from '../apollo-client'
import toast from 'react-hot-toast'
// import { text } from 'stream/consumers'

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

type Props = {
  subreddit?: string
}

function PostBox({ subreddit }: Props) {
  // console.log(subreddit)
  const [addPost, { loading, error, data }] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
  const { data: session } = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)

    const notification = toast.loading('Creating a new post....');

    try {
      //query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit, //will prioritize subreddit over formData.subreddit
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0;

      if(!subredditExists) {
        //create a new subreddit
        console.log("New subreddit, creating one!!")
        const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
          variables: {
            topic: formData.subreddit
          }
        })
        console.log("Creating a post......", formData);
        //if user does not provide an image
        const image = formData.postImage || '';

        const { data: { insertPost: newPost } } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log("New post is : ", newPost)
      } else {
        //use the existing subreddit
        console.log("Using existing subreddit!!")
        console.log(getSubredditListByTopic);

        const image = formData.postImage || '';

        const { data: { insertPost: newPost } } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,

          },
        })
        console.log("New post added for existing subreddit: ", newPost);

      }

      setValue('postBody', '')
      setValue('postTitle', '')
      setValue('postImage', '')
      setValue('subreddit', '')

      toast.success('Post created!', {
        id: notification
      })

    } catch (error) {
      toast.error('Error creating a post', {
        id: notification
      })
    }
  })

  return (
    // <div>
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50  p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session ? subreddit ? `Create a post in r/${subreddit}` : 'Create a post by entering a title' : 'Sign in to post'
          }
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 cursor-pointer text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {!subreddit &&  //if subreddit prop is not passed only then render the following div
          (<div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('subreddit', { required: true })}
              type="text"
              placeholder="anything"
            />
          </div>)
          }

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
                type="text"
                placeholder="Optional...."
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>A Post is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>A subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
    // </div>
  )
}

export default PostBox
