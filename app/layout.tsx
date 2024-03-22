import type {Metadata} from 'next'
import '@/styles/global.css'
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
            <div className="layout"> {/* Flex 컨테이너로 설정 */}
                <Header />
                <main className="content"> {/* 콘텐츠를 위한 주 영역 */}
                    {children}
                </main>
                <Footer />
            </div>
            </body>
        </html>
    )
}
