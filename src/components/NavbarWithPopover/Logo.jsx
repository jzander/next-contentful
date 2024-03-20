import {Image, Link} from "@chakra-ui/react";

export const Logo = ({logoSrc}) => {
    return (
        <Link href="/"><Image src={logoSrc} alt="logo" width={'120px'} minW={'120px'}/></Link>
    )
}
