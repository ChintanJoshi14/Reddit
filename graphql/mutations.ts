import { gql } from '@apollo/client'
// import { useCallback, useEffect } from 'react'

export const ADD_COMMENT = gql`
  mutation AddComment($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      created_at
      id
      post_id
      username  
      text
    }
  }
`

export const ADD_POST = gql`
  mutation AddPost(
    $body: String!
    $image: String!
    $title: String!
    $username: String!
    $subreddit_id: ID!
  ) {
    insertPost(
      body: $body
      image: $image
      title: $title
      username: $username
      subreddit_id: $subreddit_id
    ) {
      body
      created_at
      image
      title
      username
      subreddit_id
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const ADD_VOTE = gql`
mutation AddVote($post_id: ID!, $username: String!, $upvote: Boolean!) {
  insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
    id
    created_at
    username
    post_id
    upvote
  }
}



`
// useEffect(() => {}, [count])

// useCallback(() => {}, [count])
