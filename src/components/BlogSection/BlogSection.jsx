import {Box, Button, Container, Heading, HStack, Image, Link, SimpleGrid, Stack, Text,} from '@chakra-ui/react'
import {formatDate} from "@/utils/formatDate";
import {LightenDarkenColor} from "@/utils/lightenDarkenColor";
import {FaArrowRight} from "react-icons/fa";

const BlogSection = ({posts, preHeading, heading, subheading, cta, brandColor, backgroundColor, fontColor}) => {
    return (
        <Box as="section" bg={backgroundColor?.value || '#fff'} color={fontColor?.value || 'initial'}>
            <Container
                py={{
                    base: '8',
                    md: '16',
                }}
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
            >
                <Stack
                    minW={'full'}
                    spacing={{
                        base: '6',
                        md: '6',
                    }}
                >
                    <Stack direction="row" justify="space-between">
                        <Stack
                            spacing={{
                                base: '4',
                                md: '5',
                            }}
                        >
                            <Stack spacing="3">
                                <Text
                                    color="accent"
                                    fontWeight="semibold"
                                    textTransform='uppercase'
                                    fontSize={{
                                        base: 'sm',
                                        md: 'md',
                                    }}
                                >
                                    {preHeading}
                                </Text>
                                <Heading
                                    size={{
                                        base: 'md',
                                        md: 'lg',
                                    }}
                                >
                                    {heading}
                                </Heading>
                            </Stack>
                            <Text
                                color="fg.muted"
                                fontSize={{
                                    base: 'lg',
                                    md: 'xl',
                                }}
                            >
                                {subheading}
                            </Text>
                        </Stack>
                        <Button variant="ghost" as={'a'} size="xl" px={5} href={'/blog'} _hover={{bg: 'initial'}}
                                rightIcon={<FaArrowRight/>}>{cta || 'See all blog posts'}</Button>
                    </Stack>
                    <SimpleGrid
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 3,
                        }}
                        gap={{
                            base: '12',
                            lg: '8',
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        {posts?.length > 0 && posts?.sort((a, b) => new Date(b.sys.firstPublishedAt) - new Date(a.sys.firstPublishedAt)).slice(0, 3).map((post, idx) => {
                            return (
                                <Link
                                    key={`${post.id}-${idx}`}
                                    _hover={{
                                        textDecor: 'none',
                                    }}
                                    href={`/blog/${post.slug}`}
                                    role="group"
                                >
                                    <Stack spacing="3">
                                        {post?.image?.url &&
                                            <Box overflow="hidden">
                                                <Image
                                                    src={post?.image?.url}
                                                    alt={post?.image?.title}
                                                    width="full"
                                                    height="15rem"
                                                    objectFit="cover"
                                                    transition="all 0.2s"
                                                    _groupHover={{
                                                        transform: 'scale(1.05)',
                                                    }}
                                                />
                                            </Box>
                                        }
                                        <HStack>
                                            <Box fontSize="sm">
                                                <Text color="fg.muted"
                                                      fontWeight={'bold'}>{formatDate(post.sys.firstPublishedAt)}</Text>
                                            </Box>
                                        </HStack>
                                        <Stack spacing="3">
                                            <Heading size="md" as={'h3'} noOfLines={2}>{post.title}</Heading>
                                            <Text color="fg.muted" noOfLines={3}>{post.excerpt}</Text>
                                            {/* eslint-disable-next-line react/prop-types */}
                                        </Stack>
                                    </Stack>
                                </Link>
                            )
                        })}
                    </SimpleGrid>
                    <Box mx={'auto'} mt={6}>
                        <Button size="lg" color={'white'} as={'a'} href={'/blog'} bg={brandColor?.value} rightIcon={<FaArrowRight/>}
                                _hover={{
                                    bg: `#${LightenDarkenColor(brandColor?.value.replace("#", ''), 40)}`
                                }}>{cta || 'See all blog posts'}</Button>
                    </Box>
                </Stack>

            </Container>
        </Box>
    )
}

export default BlogSection