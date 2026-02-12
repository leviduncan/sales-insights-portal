import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import rawData from "../src/financial-data.json";

const prisma = new PrismaClient();

function normalizeRecord(raw: Record<string, string>): Record<string, string> {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    normalized[key.trim()] = value;
  }
  return normalized;
}

function parseMoney(val: string | undefined): number {
  if (!val) return 0;
  return parseFloat(val.replace(/[$,]/g, "")) || 0;
}

function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

async function main() {
  console.log("Clearing existing records...");
  await prisma.financialRecord.deleteMany();

  console.log(`Seeding ${rawData.length} financial records...`);

  const batchSize = 100;
  for (let i = 0; i < rawData.length; i += batchSize) {
    const batch = rawData.slice(i, i + batchSize);
    await prisma.financialRecord.createMany({
      data: batch.map((raw) => {
        const r = normalizeRecord(raw as Record<string, string>);
        const date = parseDate(r["Date"]);
        return {
          segment: r["Segment"] || "",
          country: r["Country"] || "",
          product: r["Product"] || "",
          discountBand: r["Discount Band"] || "None",
          unitsSold: parseMoney(r["Units Sold"]),
          manufacturingPrice: parseMoney(r["Manufacturing Price"]),
          salePrice: parseMoney(r["Sale Price"]),
          grossSales: parseMoney(r["Gross Sales"]),
          discounts: parseMoney(r["Discounts"]),
          sales: parseMoney(r["Sales"]),
          cogs: parseMoney(r["COGS"]),
          profit: parseMoney(r["Profit"]),
          date,
          monthNumber: parseInt(r["Month Number"] || "1", 10),
          monthName: r["Month Name"] || "",
          year: parseInt(r["Year"] || "2014", 10),
        };
      }),
    });
    console.log(
      `  Seeded records ${i + 1} to ${Math.min(i + batchSize, rawData.length)}`
    );
  }

  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: { hashedPassword },
    create: {
      username: "admin",
      hashedPassword,
    },
  });
  console.log("Admin user created/updated.");

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
