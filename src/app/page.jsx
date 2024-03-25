import {renderComponentSection} from "@/utils/renderComponentSection";
import {client} from "../../lib/api";
import {Box} from "@chakra-ui/react";

export async function getGlobalData() {
    const global = await client.fetchContentfulGlobalDataGraphQL()
    const {globalData} = global
    return globalData;
}

export async function getPageData() {
    const response = await client.fetchContentfulDataGraphQL('Homepage')
    if (!response?.pageData) {
        return {
            pageData: {},
            components: [],
            blogPosts: [],
            website: process.env.WEBSITE_URL,
            googleApiKey: process.env.GOOGLE_API_KEY
        }
    }
    const {
        components,
        blogPosts,
        pageData,
        servicePages,
        website = process.env.WEBSITE_URL,
        googleApiKey = process.env.GOOGLE_API_KEY
    } = response
    return {
        components,
        blogPosts,
        pageData,
        servicePages,
        website,
        googleApiKey
    }
}

export async function generateMetadata() {
    const globalData = await getGlobalData()
    const {
        pageData,
    } = await getPageData()
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: pageData?.metaTitle || globalData?.websiteTitle,
        description: pageData?.metaDescription,
        openGraph: {
            images: pageData?.metaImage?.url,
        },
        'theme-color': themeColor
    }
}


export default async function Home() {
    const globalData = await getGlobalData()
    const {
        components,
        blogPosts,
        servicePages,
        website = process.env.WEBSITE_URL,
        googleApiKey = process.env.GOOGLE_API_KEY
    } = await getPageData()
    if (!components.length) {
        return null;
    }
    return (
        <Box>
            {components?.map((component, idx) => {
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
