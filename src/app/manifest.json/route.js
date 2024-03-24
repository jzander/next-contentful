import {getGlobalData} from "@/app/page";

export async function GET() {
    const globalData = await getGlobalData()
    // Convert your JavaScript object to a JSON string.
    const jsonString = JSON.stringify({
        "short_name": globalData?.websiteTitle || "",
        "name": globalData?.websiteTitle || "",
        "icons": [
            {
                "src": globalData?.splashImage?.url || "",
                "type": "image/png",
                "sizes": "512x512"
            },
            {
                "src": globalData?.favicon?.url || "",
                "sizes": "16x16 48x48 72x72 96x96 128x128",
                "type": "image/x-icon"
            },
            {
                "src": globalData?.maskableIcon?.url || "",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "start_url": ".",
        "display": "standalone",
        "background_color": "#ffffff"
    });

    // Return the Response object with the JSON string as the body.
    return new Response(jsonString, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}