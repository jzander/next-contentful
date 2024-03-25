import {gql} from 'graphql-request'


export const FETCH_ALL_BLOG_POSTS = gql`
    query {
      globalDataCollection(
        limit:1
        where: {
          website: {
            website_contains_all: [
              "${process.env.WEBSITE_URL}"
            ]
          }
        }
      ) {
        items {
          phoneNumber
          brandColor
          themeColor
        }
      }
      blogPageCollection(
        limit:1,
        where: {
          website: {
            website_contains_all: [
              "${process.env.WEBSITE_URL}"
            ]
          }
        }
      ) {
        items {
          headerH1
          metaTitle
          metaImage {
            url
          }
          metaDescription
          heroBackgroundImage {
            url
          }
          subHeader
          headerFontColor
          colorOverlay
          overlayOpacity
        }
      }
      blogPostCollection(
        where: {
          website_contains_all:  "${process.env.WEBSITE_URL}"
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
          imageAltText
          image {
            url
            title
          }
        }
      }
    }
`
