import {Box} from "@chakra-ui/react";
import { renderComponentSection } from '@/utils/renderComponentSection';
import { client } from "../../../lib/api";

export default async function Page({ params }) {
    const response = await client.fetchContentfulPageBySlugDataGql(params.slug)
    if (!response?.pageData) {
        return {
            pageData: {},
            components: [],
            blogPosts: [],
            website: process.env.WEBSITE_URL,
            googleApiKey: process.env.GOOGLE_API_KEY
        }
    }

    const data = await client.fetchContentfulGlobalDataGraphQL()
    const {globalData} = data

    const {
        pageData,
        servicePages,
        components,
        blogPosts,
        website= process.env.WEBSITE_URL,
        googleApiKey= process.env.GOOGLE_API_KEY
    } = response
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
