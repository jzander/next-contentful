"use client";
import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
  Button
} from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { lazy } from "react";
import { richTextOptions } from "@/components/RichTextSection/RichTextSection";
import Share from "@/components/Share/Share";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  createFacebookShareLink,
  shareThisBlogPostViaEmail,
} from "@/utils/misc";

const CenteredHero = lazy(() =>
  import("@/components/CenteredHero/CenteredHero")
);

export default function BlogPostItem({ blogPost, latestPosts, globalData }) {
  const WEBSITE = process.env.WEBSITE_URL;

  return (
    <Box>
      <CenteredHero
        header={blogPost?.title}
        phoneNumber={globalData?.phoneNumber}
        useH1={true}
        subtitle={blogPost?.excerpt}
        overlayOpacity={70}
        imgSrc={blogPost?.image}
        buttonColor={"#1eb924"}
      />
      <Box
        mx="auto"
        py={16}
        maxW={{
          base: "xl",
          md: "6xl",
        }}
        px={{ base: "5", md: "5", lg: "0" }}
      >
        <HStack justify={"space-between"} mb={5}>
          <Tag colorScheme="blue">
            {formatDate(blogPost?.sys?.firstPublishedAt)}
          </Tag>
          <Share
            facebookUrl={createFacebookShareLink(window.location.href)}
            emailUrl={shareThisBlogPostViaEmail(
              window.location.href,
              blogPost?.title
            )}
          />
        </HStack>
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          spacing={{
            base: "12",
            lg: "16",
          }}
          flex="1"
        >
          <Box as="main" role="main" width="full" bg="bg.accent.default">
            <Stack spacing="8">
              <Box overflow="hidden">
                <Image
                  src={blogPost?.image?.url}
                  alt={blogPost?.title}
                  width="full"
                  height={{ base: "15rem", md: "sm" }}
                  objectFit="cover"
                  transition="all 0.2s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
              </Box>
              <Stack spacing="6" px={{ base: "5", md: "0" }}>
                <Stack spacing="3">
                  {documentToReactComponents(
                    blogPost?.body?.json,
                    richTextOptions(WEBSITE)
                  )}
                </Stack>
                <Stack
                  textAlign={"center"}
                  boxShadow="md"
                  bg={"#eee"}
                  px={10}
                  py={10}
                >
                  <Heading as={'h2'}>{globalData.heading}</Heading>
                  <Text fontSize={'x-large'}>{globalData.subtitle}</Text>
                  <Button leftIcon={<PhoneIcon/>} size={'lg'} bg={'#1eb924'} textTransform="uppercase"
                                            mt={5}
                                            color={'#fff'} as={'a'} _hover={{bg: globalData?.brandColor?.value}}
                                            mx={'auto'}
                                            href={`tel:${globalData.phoneNumber}`} maxW={'2xl'}>Call us today!</Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Box
            as="aside"
            role="complementary"
            bg="bg.accent.default"
            width={{
              base: "full",
              lg: "xl",
            }}
            alignSelf="start"
            position={{
              base: "unset",
              lg: "sticky",
            }}
            top="36"
            px={{ base: "5", md: "0" }}
          >
            <VStack>
              {latestPosts
                ?.filter((post) => post.slug !== blogPost.slug)
                .slice(0, 3)
                .map((post) => {
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      _hover={{ textDecor: "none" }}
                      role="group"
                    >
                      <Box
                        p="6"
                        bg="bg.surface"
                        boxShadow="md"
                        _groupHover={{ boxShadow: "xl" }}
                        transition="all 0.2s"
                        height="full"
                      >
                        <Stack
                          spacing={{ base: "8", lg: "16" }}
                          justify="space-between"
                          height="full"
                        >
                          <Stack spacing="8">
                            <Box overflow="hidden">
                              <Image
                                src={post.image.url}
                                alt={
                                  post?.imageAltText ||
                                  post?.image?.title ||
                                  post?.title
                                }
                                width="full"
                                height="15rem"
                                objectFit="cover"
                              />
                            </Box>
                            <Stack spacing="3">
                              <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                color="accent"
                              >
                                {formatDate(post.sys.publishedAt)}
                              </Text>
                              <Heading size="md">{post.title}</Heading>
                              <Text color="fg.muted">{post.excerpt}</Text>
                              <Text fontWeight="bold">Read article</Text>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </Link>
                  );
                })}
            </VStack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
