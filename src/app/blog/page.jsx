import CenteredHero from "@/components/CenteredHero/CenteredHero";
import {Container, SimpleGrid, Stack} from "@chakra-ui/react";
import {BlogPost} from "@/components/BlogPost/BlogPost";
import {client} from "../../../lib/api";

export default async function Blog() {
    const data = await client.fetchContentfulBlogPostsDataGql()
    const {pageData: blogPageData, blogPosts: posts, globalData} = data;
    return (
        <div className="main_wrapper">
            <CenteredHero header={blogPageData.headerH1} subtitle={blogPageData.subHeader}
                          imgSrc={blogPageData?.heroBackgroundImage} useH1={true}
                          overlayOpacity={blogPageData.overlayOpacity}
                          phoneNumber={globalData.phoneNumber}/>
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
