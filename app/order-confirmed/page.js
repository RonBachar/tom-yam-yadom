import OrderConfirmedClient from "./OrderConfirmedClient";
import { DEFAULT_OG_IMAGE } from "../data/siteMeta";

const BASE_URL = "https://www.tomyamyadomherbals.com";

export const metadata = {
  title: "Order Confirmed | Tom Yam Yadom",
  description:
    "Your Tom Yam Yadom order is confirmed. Thank you for your purchase.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Order Confirmed | Tom Yam Yadom",
    description:
      "Your Tom Yam Yadom order is confirmed. Thank you for your purchase.",
    url: `${BASE_URL}/order-confirmed`,
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

export default function OrderConfirmedPage() {
  return <OrderConfirmedClient />;
}
