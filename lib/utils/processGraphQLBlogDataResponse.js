export function processGraphQLBlogDataResponse(data) {
    const globalData = data['globalDataCollection'].items[0];
    return {
        pageData: data['blogPageCollection'].items[0],
        blogPosts: data['blogPostCollection'].items,
        globalData: data?.globalDataCollection?.items?.length > 0 ? globalData : [],
    }
}
