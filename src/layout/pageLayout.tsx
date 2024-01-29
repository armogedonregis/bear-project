import { Ubuntu, Balsamiq_Sans, Work_Sans } from "next/font/google"
import { Wrapper } from "./wrapper"
import { Header } from "@/components/header"


type LayoutProps = {
    children: React.ReactNode
}

const ubuntuFont = Ubuntu({
    weight: ["400", "700"],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: "--font-ubuntu",
    fallback: ['Arial', 'sans-serif']
})

const balsamiqFont = Balsamiq_Sans({
    weight: ["400", "700"],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: "--font-balsamiq",
    fallback: ['Arial', 'sans-serif']
})


const worksansFont = Work_Sans({
    weight: ["400", "700"],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-worksans",
    fallback: ['Arial', 'sans-serif']
})

export default function PageLayout({ children }: LayoutProps) {
    const pageContainer = [
        'flex',
        'flex-col',
        'items-center',
        'w-screen',
        'min-h-screen',
        'h-full',
        'overflow-x-hidden',
        ubuntuFont.variable,
        balsamiqFont.variable,
        worksansFont.variable,
        "font-worksans",
        'bg-white'
    ]

    const componentPageContainer = pageContainer.join(' ')

    return (
        <div className={componentPageContainer}>
            <Wrapper>
                <Header />
                <main>
                    {children}
                </main>
            </Wrapper>
        </div>
    );
}