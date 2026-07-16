import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Cart | Tom Yam Yadom",
  description: "Your Tom Yam Yadom cart.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Cart | Tom Yam Yadom",
    description: "Your Tom Yam Yadom cart.",
    url: `${BASE_URL}/cart`,
    siteName: "Tom Yam Yadom",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function CartLayout({ children }) {
  return children;
}
