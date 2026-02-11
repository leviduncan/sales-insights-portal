import type { NextApiRequest, NextApiResponse } from "next";
import data from "@/financial-data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!Array.isArray(data)) {
      console.error("Error: Expected an array but got:", data);
      return res.status(500).json([]);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json([]);
  }
}
