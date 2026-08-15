"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getCookieConsent } from "./CookieConsent";

export default function Clarity() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === "accepted") {
      setAllowed(true);
      return;
    }
    function onConsent(event) {
      if (event.detail === "accepted") setAllowed(true);
    }
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  if (!allowed) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xjk578owdx");
        `,
      }}
    />
  );
}
