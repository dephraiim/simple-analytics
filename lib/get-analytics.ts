import { prisma } from "./prisma";

export const getAnalytics = async () => {
    return await prisma.analytics.findMany({
        orderBy: {
            timestamp: "desc",
        },
        include: {
            PageView: true,
            Referrer: true,
            Browser: true,
            OS: true,
            Country: true,
            Device: true,
        },
    });
};
