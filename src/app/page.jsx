import {renderComponentSection} from "@/utils/renderComponentSection";
import {client} from "../../lib/api";
import {Box} from "@chakra-ui/react";

export default async function Home() {
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
    const globalData = {}
    const {
        components,
        blogPosts,
        pageData,
        servicePages,
        website = process.env.WEBSITE_URL,
        googleApiKey = process.env.GOOGLE_API_KEY
    } = response
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
