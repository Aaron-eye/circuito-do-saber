import "./globals.scss";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className={"content"}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
