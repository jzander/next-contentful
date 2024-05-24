import {gql} from "graphql-request";

export const getContentfulAsset = (id) => {
    return gql`
        query {
          asset(id: "${id}") {
            url
            title
          }
        }
`
}
