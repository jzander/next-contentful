import {Providers} from './providers'
import "./globals.css";
import {fonts} from "@/app/fonts";
import {TopBar} from "@/components/TopBar/TopBar";
import {NavBar} from "@/components/NavbarWithPopover/NavbarWithPopover";
import {Footer} from "@/components/FooterWithFourColumnsOnAccent/Footer";
import {injectGTM} from "@/utils/gtm";
import {headers} from "next/headers";
import {client} from "../../lib/api";

export async function generateMetadata() {
    const global = await client.fetchContentfulGlobalDataGraphQL()
    const {globalData} = global
    const themeColor = globalData?.themeColor?.value || '#000'
    return {
        title: globalData?.websiteTitle,
        'theme-color': themeColor,
        alternates: {
            canonical: process.env.WEBSITE_URL,
        },
        icons: {
            icon: [
                {
                    url: globalData?.favicon?.url,
                    href: globalData?.favicon?.url,
                },
            ],
        },
    }
}


export default async function RootLayout({children}) {
    const global = await client.fetchContentfulGlobalDataGraphQL()
    const {globalData} = global
    const gtmScript = globalData?.googleTagManagerId ? injectGTM(globalData.googleTagManagerId) : null;
    const data = {
        globalData: globalData,
        navigation: global.navigation,
        footerNavigation: global.footerNavigation,
        gtmScript,
        logo: globalData.logo,
        phoneNumber: globalData.phoneNumber
    };
    return (
        <html lang='en'>
        <body className={fonts.rubik.variable} style={{background: "#fff"}}>
        <Providers>
            <TopBar {...data}/>
            <NavBar {...data}/>
            {children}
            <Footer {...data}/>
        </Providers>
        </body>
        </html>
    )
}