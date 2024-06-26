import {Providers} from './providers'
import "./globals.css";
import {fonts} from "@/app/fonts";
import {TopBar} from "@/components/TopBar/TopBar";
import {NavBar} from "@/components/NavbarWithPopover/NavbarWithPopover";
import {Footer} from "@/components/FooterWithFourColumnsOnAccent/Footer";
import {client} from "../../lib/api";
import {GoogleTagManager} from '@next/third-parties/google'
import Head from "next/head";
import Script from "next/script";

export default async function RootLayout({children}) {
    const global = await client.fetchContentfulGlobalDataGraphQL()
    const {globalData} = global
    const data = {
        globalData: globalData,
        navigation: global.navigation,
        footerNavigation: global.footerNavigation,
        logo: globalData.logo,
        phoneNumber: globalData.phoneNumber
    };
    return (
        <html lang='en'>
        <Script src="https://assets.usestyle.ai/seonajsplugin" defer id="seona-js-plugin"/>
        {globalData?.localBusinessMarkup &&
            <Script id="localBusinessMarkup" type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(globalData.localBusinessMarkup)}}/>
        }
        {globalData?.googleTagManagerId &&
            <GoogleTagManager gtmId={globalData?.googleTagManagerId}/>
        }
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