import type {Metadata} from 'next'
import '@/styles/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: '블로그',
    description: '블로그',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body className="mx-auto">
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
