import { client } from "../../../../lib/api";
// import { useParams } from "next/navigation";
import BlogPostItem from "@/components/BlogPostItem";

export default async function BlogPostContainer({ params }) {
  const [blogPostsData, latestPostsData] = await Promise.all([
    client.fetchContentfulBlogPostBySlugDataGql(params?.blogPost),
    client.fetchContentfulLatestBlogPostsDataGql(),
  ]);
  const data = await client.fetchContentfulBlogPostsDataGql()
  const { globalData } = data;

  let blogPost = blogPostsData;
  let latestPosts = latestPostsData;

  return <BlogPostItem blogPost={blogPost} latestPosts={latestPosts} globalData={globalData} />;
}
