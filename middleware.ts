// app/middleware.ts
import { NextRequest, NextResponse, userAgent } from "next/server";
import { geolocation, ipAddress } from "@vercel/edge";

type Analytics = {
    views: number;
    visitors: Set<string>;
    pageViews: Record<string, number>;
    referrers: Record<string, number>;
    browsers: Record<string, number>;
    os: Record<string, number>;
    countries: Record<string, number>;
    devices: Record<string, number>;
};

const analytics: Analytics = {
    views: 0,
    visitors: new Set(),
    pageViews: {},
    referrers: {},
    browsers: {},
    os: {},
    countries: {},
    devices: {},
};

export async function middleware(request: NextRequest) {
    const ip = ipAddress(request) || "127.0.0.1";
    const ua = userAgent(request);
    const referrer = request.headers.get("referer");

    const { country: edgeCountry } = geolocation(request);
    const pathname = request.nextUrl.pathname;

    const country = edgeCountry || "local";

    analytics.views++;
    analytics.visitors.add(ip);
    analytics.pageViews[pathname] = (analytics.pageViews[pathname] || 0) + 1;

    if (referrer) {
        const referrerDomain = new URL(referrer).hostname;
        analytics.referrers[referrerDomain] = (analytics.referrers[referrerDomain] || 0) + 1;
    }

    analytics.countries[country] = (analytics.countries[country] || 0) + 1;

    const browserName = ua.browser.name || "local_browser";
    const osName = ua.os.name || "local_os";

    analytics.browsers[browserName] = (analytics.browsers[browserName] || 0) + 1;
    analytics.os[osName] = (analytics.os[osName] || 0) + 1;

    if (ua.device.type) {
        analytics.devices[ua.device.type] = (analytics.devices[ua.device.type] || 0) + 1;
    }

    console.log(analytics); // Log the analytics data

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|vercel.svg|next.svg).*)"],
};
