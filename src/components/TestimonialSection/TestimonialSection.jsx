import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Img,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import {ImQuotesLeft, ImQuotesRight} from 'react-icons/im'

const Testimonial = (props) => {
    const {children, image = '', author, location, accent, brand} = props
    const accentC = accent?.value || brand?.value || `blue.600`
    return (
        <Flex
            direction="column"
            rounded={{
                md: 'lg',
            }}
            bg={'white'}
            shadow="lg"
        >
            <Flex
                direction="column"
                position="relative"
                mb="4"
                textAlign="center"
                justify="center"
                align="center"
                pt="10"
                pb="6"
                px="10"
            >
                <Box maxW="340px" mx="auto" my="4">
                    <Box
                        position="absolute"
                        top="6"
                        left="5"
                        display={{
                            base: 'none',
                            md: 'inline',
                        }}
                        fontSize="3xl"
                        color={accentC}
                        opacity={0.2}
                    >
                        <ImQuotesLeft/>
                    </Box>
                    <Text fontSize="small" as={"blockquote"}>{children}</Text>
                    <Box
                        position="absolute"
                        bottom="-2"
                        right="5"
                        display={{
                            base: 'none',
                            md: 'inline',
                        }}
                        fontSize="3xl"
                        color={accentC}
                        opacity={0.2}
                    >
                        <ImQuotesRight/>
                    </Box>
                </Box>
            </Flex>
            <Flex
                direction="column"
                position="relative"
                align="center"
                justify="center"
                color="white"
                px="6"
                pb="8"
            >
                <Box
                    position="absolute"
                    left="0"
                    bottom="0"
                    w="full"
                    h="full"
                    roundedBottom={{
                        md: 'lg',
                    }}
                    overflow="hidden"
                    _before={{
                        content: `''`,
                        display: 'block',
                        position: 'absolute',
                        bottom: '0',
                        left: '-10%',
                        width: '120%',
                        height: '90%',
                        roundedTop: '120%',
                        bg: accentC,
                    }}
                />
                {image &&
                    <Img
                        src={image}
                        alt={author}
                        rounded="full"
                        border="6px solid"
                        borderColor={accentC}
                        position="relative"
                        mt="-5"
                        w="16"
                        h="16"
                        objectFit="cover"
                    />
                }
                <Box position="relative" fontSize="sm" mt="3" textAlign="center">
                    <Text fontWeight="bold" fontSize="md">
                        {author}
                    </Text>
                    <Text>{location}</Text>
                </Box>
            </Flex>
        </Flex>
    )
}


const TestimonialSection = (props) => {
    const {heading, subtitle, testimonialsCollection, accent, brand} = props
    return (
        <Box as="section" bg={'gray.100'} py={{base: '12', md: '24'}}>
            <Box
                maxW={{
                    base: 'xl',
                    md: '6xl',
                }}
                mx="auto"
                px={{
                    md: '8',
                }}
            >
                <VStack textAlign={'center'} pb={16}>
                    <Heading as={'h2'} size="2xl" fontWeight="bold">
                        {heading}
                    </Heading>
                    <Text
                        fontSize={{
                            md: 'xl',
                        }}
                        mt="4"
                        maxW={{base: '90%', md: "unset"}}
                        mx={'auto'}
                    >
                        {subtitle}
                    </Text>
                </VStack>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 3,
                    }}
                    spacing="10"
                    maxW={{base: '90%', md: 'unset'}}
                    mx={'auto'}
                >
                    {
                        testimonialsCollection?.items?.map((testimonial) =>
                            <Testimonial
                                key={testimonial?.name}
                                author={testimonial?.name}
                                location={testimonial?.location}
                                image={testimonial.avatar?.url}
                                accent={accent}
                                brand={brand}
                            >
                                {testimonial?.testimonial}
                            </Testimonial>
                        )}
                </SimpleGrid>
            </Box>
        </Box>
    )
}

export default TestimonialSection