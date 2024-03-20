import {Box, Heading, HStack, Image, Link, Stack, Text} from "@chakra-ui/react";
import {formatDate} from "@/utils/formatDate";
import {FaArrowRight} from "react-icons/fa";

export const BlogPost = (props) => {
    const {post, isHero, brandColor} = props
    return (
        <Link _hover={{textDecor: 'none'}} role="group" boxShadow="xl" href={`/blog/${post.slug}`}>
            <Stack spacing="8">
                <Box overflow="hidden">
                    <Image
                        src={post.image.url}
                        alt={post?.imageAltText || post?.image?.title || post?.title}
                        width="full"
                        height={{base: '15rem', md: isHero ? 'sm' : '15rem'}}
                        objectFit="cover"
                        transition="all 0.2s"
                        _groupHover={{transform: 'scale(1.05)'}}
                    />
                </Box>
                <Stack spacing="6" pb={5} px={5}>
                    <Stack spacing="3">
                        <HStack spacing="1" fontSize="sm" fontWeight="semibold" color={brandColor}>
                            <Text>{formatDate(post.sys.firstPublishedAt)}</Text>
                        </HStack>
                        <Heading size="md" noOfLines={2}>{post.title}</Heading>
                        <Text color="fg.muted" noOfLines={5}>{post.excerpt}</Text>
                        <Text fontWeight={'bold'} color={brandColor}
                              _hover={{textDecoration: 'underline'}}>Read article <FaArrowRight/></Text>
                    </Stack>
                </Stack>
            </Stack>
        </Link>
    )
}