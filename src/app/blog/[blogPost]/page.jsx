import {client} from "../../../../lib/api";
import BlogPostItem from "@/components/BlogPostItem";
import {getGlobalData} from "@/app/page";

export async function getBlogPostData(slug) {
    const [blogPost, latestPosts] = await Promise.all([
        client.fetchContentfulBlogPostBySlugDataGql(slug),
        client.fetchContentfulLatestBlogPostsDataGql()
    ]);
    return {
        blogPost,
        latestPosts,
        WEBSITE: process.env.WEBSITE_URL,
    };
}

export async function generateMetadata({params}) {
    const globalData = await getGlobalData()
    const {blogPost, WEBSITE} = await getBlogPostData(params.blogPost);
    const {title, metaDescription, image} = blogPost;
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: title,
        description: metaDescription,
        openGraph: {
            images: image?.url
        },
        'theme-color': themeColor,
        alternates: {
            canonical: `${WEBSITE}/blog/${params.blogPost}`,
        },
    }
}

export default async function BlogPostContainer({params}) {
    const {blogPost, latestPosts} = await getBlogPostData(params.blogPost);
    const globalData = await getGlobalData()

    return <BlogPostItem blogPost={blogPost} latestPosts={latestPosts} globalData={globalData}/>;
}
