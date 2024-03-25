import {gql} from 'graphql-request'

export const FETCH_LATEST_BLOG_POSTS = gql`
    query {
      blogPostCollection(
        limit: 4
        where: {
          website_contains_all: "${process.env.WEBSITE_URL}"
        }
      ) {
        items {
          title
          slug
          sys {
            publishedAt
            firstPublishedAt
          }
          excerpt
          image {
            url
            title
          }
        }
      }
    }
`
