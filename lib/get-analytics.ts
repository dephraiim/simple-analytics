import { prisma } from "./prisma";

export const getAnalytics = async () => {
    return await prisma.$transaction(async (prisma) => {
        const pageViews = await prisma.pageView.groupBy({
            by: ["url"],
            _count: {
                url: true,
            },
        });

        const referrers = await prisma.referrer.groupBy({
            by: ["domain"],
            _count: {
                domain: true,
            },
        });

        const browsers = await prisma.browser.groupBy({
            by: ["name"],
            _count: {
                name: true,
            },
        });

        const os = await prisma.oS.groupBy({
            by: ["name"],
            _count: {
                name: true,
            },
        });

        const countries = await prisma.country.groupBy({
            by: ["name"],
            _count: {
                name: true,
            },
        });

        const devices = await prisma.device.groupBy({
            by: ["type"],
            _count: {
                type: true,
            },
        });

        const totalViews = await prisma.analytics.count();
        const totalVisitors = await prisma.analytics.aggregate({
            _sum: {
                visitors: true,
            },
        });

        return {
            pageViews,
            referrers,
            browsers,
            os,
            countries,
            devices,
            totalViews,
            totalVisitors: totalVisitors._sum.visitors,
        };
    });
};
