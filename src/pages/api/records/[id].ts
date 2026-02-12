import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    const record = await prisma.financialRecord.findUnique({ where: { id } });
    if (!record) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(record);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "PUT") {
    try {
      const body = req.body;
      const date = new Date(body.date);

      const record = await prisma.financialRecord.update({
        where: { id },
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

      return res.status(200).json(record);
    } catch (error) {
      console.error("Update error:", error);
      return res.status(400).json({ error: "Invalid data or record not found" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.financialRecord.delete({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(404).json({ error: "Record not found" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
