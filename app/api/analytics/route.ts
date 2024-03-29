import { prisma } from "~/lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Analytics = {
    views: number;
    visitors: number;
    pageViews: Record<string, number>;
    referrers: Record<string, number>;
    browsers: Record<string, number>;
    os: Record<string, number>;
    countries: Record<string, number>;
    devices: Record<string, number>;
};

export async function POST(request: NextRequest) {
    const body: Analytics = await request.json();
    const analytics = body;

    const createdAnalytics = await prisma.analytics.create({
        data: {
            views: analytics.views,
            visitors: analytics.visitors,
            PageView: {
                create: Object.entries(analytics.pageViews).map(([url]) => ({
                    url,
                })),
            },
            Referrer: {
                create: Object.entries(analytics.referrers).map(([domain]) => ({
                    domain,
                })),
            },
            Browser: {
                create: Object.entries(analytics.browsers).map(([name]) => ({
                    name,
                })),
            },
            OS: {
                create: Object.entries(analytics.os).map(([name]) => ({
                    name,
                })),
            },
            Country: {
                create: Object.entries(analytics.countries).map(([name]) => ({
                    name,
                })),
            },
            Device: {
                create: Object.entries(analytics.devices).map(([type]) => ({
                    type,
                })),
            },
        },
        select: {
            id: true,
        },
    });

    return NextResponse.json({ data: createdAnalytics });
}
