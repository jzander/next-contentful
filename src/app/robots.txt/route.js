const WEBSITE_URL = process.env.WEBSITE_URL;

export async function GET() {
    const robotsTxtContent = `
# Sitemap is also available on /sitemap.xml
Sitemap: ${WEBSITE_URL}/sitemap.xml
User-agent: *
`.trim();

    return new Response(robotsTxtContent, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}