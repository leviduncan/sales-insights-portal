import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { toFinancialRecordWithId } from "@/lib/format-record";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      prisma.financialRecord.findMany({
        skip,
        take: limit,
        orderBy: { date: "desc" },
      }),
      prisma.financialRecord.count(),
    ]);

    return res.status(200).json({
      data: records.map(toFinancialRecordWithId),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const body = req.body;
      const date = new Date(body.date);

      const record = await prisma.financialRecord.create({
        data: {
          segment: body.segment,
          country: body.country,
          product: body.product,
          discountBand: body.discountBand,
          unitsSold: body.unitsSold,
          manufacturingPrice: body.manufacturingPrice,
          salePrice: body.salePrice,
          grossSales: body.grossSales,
          discounts: body.discounts,
          sales: body.sales,
          cogs: body.cogs,
          profit: body.profit,
          date,
          monthNumber: date.getUTCMonth() + 1,
          monthName: date.toLocaleString("en-US", { month: "long", timeZone: "UTC" }),
          year: date.getUTCFullYear(),
        },
      });

      return res.status(201).json(record);
    } catch (error) {
      console.error("Create error:", error);
      return res.status(400).json({ error: "Invalid data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
