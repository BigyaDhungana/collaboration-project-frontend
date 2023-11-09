import { Inter } from "next/font/google";
import { Providers } from "./providers";
import StyledJsxRegistry from "../../registry";
import Usercontextcmp from "../context/userContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="gs">
      <body className={inter.className}>
        <Usercontextcmp>
          <Providers>
            <StyledJsxRegistry>{children}</StyledJsxRegistry>
          </Providers>
        </Usercontextcmp>
      </body>
    </html>
  );
}
