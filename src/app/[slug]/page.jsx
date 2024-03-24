import {Box} from "@chakra-ui/react";
import {renderComponentSection} from '@/utils/renderComponentSection';
import {client} from "../../../lib/api";
import {getGlobalData} from "@/app/page";
import {isEmpty} from "lodash";

export async function getPageDataBySlug({params}) {
    const {components, blogPosts, pageData, servicePages} = await client.fetchContentfulPageBySlugDataGql(params.slug)
    if (isEmpty(pageData)) {
        return {
            pageData: {},
            servicePages: [],
            components: [],
            blogPosts: [],
            website: process.env.WEBSITE_URL,
            googleApiKey: process.env.GOOGLE_API_KEY
        }
    }

    return {
        pageData,
        servicePages,
        components,
        blogPosts,
        website: process.env.WEBSITE_URL,
        googleApiKey: process.env.GOOGLE_API_KEY
    }
}

export async function generateMetadata({params}) {
    const globalData = await getGlobalData()
    const {
        pageData,
    } = await getPageDataBySlug({params})
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: pageData?.metaTitle || globalData?.websiteTitle,
        description: pageData?.metaDescription,
        alternates: {
            canonical: `${process.env.WEBSITE_URL}/${params.slug}`,
        },
        openGraph: {
            images: pageData?.metaImage?.url,
        },
        'theme-color': themeColor
    }
}

export default async function Page({params}) {
    const globalData = await getGlobalData()
    const {
        servicePages,
        components,
        blogPosts,
        website,
        googleApiKey
    } = await getPageDataBySlug({params})
    if (!components.length) {
        return null;
    }

    return (
        <Box>
            {components?.length > 0 && components?.map((component, idx) => {
                return (
                    <Box key={`${component['__typename']}-${idx}`}>
                        {renderComponentSection(
                            component,
                            blogPosts,
                            globalData,
                            website,
                            servicePages,
                            googleApiKey
                        )}
                    </Box>
                )
            })}
        </Box>
    );
}
