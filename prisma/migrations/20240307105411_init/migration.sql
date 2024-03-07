-- CreateTable
CREATE TABLE "Analytics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL,
    "visitors" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "PageView_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Referrer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "Referrer_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Browser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "Browser_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "OS_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "Country_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "analyticsId" INTEGER NOT NULL,
    CONSTRAINT "Device_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
