import { gql } from '@apollo/client'


export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }




`

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query fetchSubredditByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
