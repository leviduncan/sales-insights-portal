import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { toFinancialRecord } from "@/lib/format-record";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const records = await prisma.financialRecord.findMany({
      orderBy: { date: "asc" },
    });

    const formatted = records.map(toFinancialRecord);
    return res.status(200).json(formatted);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json([]);
  }
}
