import CenteredHero from "@/components/CenteredHero/CenteredHero";
import {Container, SimpleGrid, Stack} from "@chakra-ui/react";
import {BlogPost} from "@/components/BlogPost/BlogPost";
import {client} from "../../../lib/api";
import {getGlobalData} from "@/app/page";
import {isEmpty} from "lodash";

export async function getPageBlogData() {
    const data = await client.fetchContentfulBlogPostsDataGql()
    const {pageData, blogPosts} = data;
    return {
        blogPageData: pageData,
        blogPosts: blogPosts,
    }
}

export async function generateMetadata({params}) {
    const globalData = await getGlobalData()
    const {blogPageData} = await getPageBlogData();
    const {metaTitle = "", metaDescription = "", metaImage = ""} = blogPageData
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            images: metaImage.url,
        },
        'theme-color': themeColor,
        alternates: {
            canonical: `${process.env.WEBSITE_URL}/blog`,
        },
    }
}


export default async function Blog() {
    const globalData = await getGlobalData()
    const {blogPageData, blogPosts: posts} = await getPageBlogData();
    return (
        <div className="main_wrapper">
            <CenteredHero header={blogPageData?.headerH1} subtitle={blogPageData?.subHeader}
                          imgSrc={blogPageData?.heroBackgroundImage} useH1={true}
                          overlayOpacity={blogPageData?.overlayOpacity}
                          phoneNumber={globalData?.phoneNumber}/>
            <Container pb={{base: '16', md: '24'}} mt={{base: '16', md: '24'}} maxW={{
                base: 'xl',
                md: '6xl',
            }}>
                <Stack spacing={{base: '16', md: '24'}}>
                    <Stack spacing={{base: '12', md: '16'}}>
                        {/*<BlogPost post={posts[0]} isHero/>*/}
                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={{base: '12', lg: '8'}}>
                            {posts?.length > 0 && posts?.sort((a, b) => new Date(b.firstPublishedAt) - new Date(a.firstPublishedAt)).map((post, idx) => (
                                <BlogPost key={`${post.id}-${idx}`} post={post}
                                          brandColor={globalData.brandColor.value}/>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}
