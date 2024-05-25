import {client} from "../../../../lib/api";
import BlogPostItem from "@/components/BlogPostItem";
import {getGlobalData} from "@/app/page";

export async function getBlogPostData(slug) {
    const [blogPost, latestPosts] = await Promise.all([
        client.fetchContentfulBlogPostBySlugDataGql(slug),
        client.fetchContentfulLatestBlogPostsDataGql()
    ]);
    const embeddedAsset = blogPost.body.json.content.find((node)=> {
        return node.nodeType === 'embedded-asset-block'
    })
    const asset = await client.fetchContentfulAssetById(embeddedAsset.data.target.sys.id);
    return {
        asset: asset || {},
        blogPost,
        latestPosts,
        WEBSITE: process.env.WEBSITE_URL,
    };
}

export async function generateMetadata({params}) {
    const globalData = await getGlobalData()
    const {blogPost, WEBSITE} = await getBlogPostData(params.blogPost);
    const {title, metaDescription, metaTitle, image} = blogPost;
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: metaTitle || title,
        description: metaDescription,
        openGraph: {
            images: image?.url,
            type: "website",
            url: `${WEBSITE}/blog/${params.blogPost}`,
        },
        'theme-color': themeColor,
        alternates: {
            canonical: `${WEBSITE}/blog/${params.blogPost}`,
        },
    }
}

export default async function BlogPostContainer({params}) {
    const {blogPost, latestPosts, asset = {}} = await getBlogPostData(params.blogPost);
    const globalData = await getGlobalData()
    return <BlogPostItem blogPost={blogPost} latestPosts={latestPosts} globalData={globalData} asset={asset}/>;
}
