import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    
    const filePath = path.join(__dirname, "../../../../public", "financial-data.json");
    if (!fs.existsSync(filePath)) {
      return res.status(500).json([]);
    }

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!Array.isArray(jsonData)) {
      console.error("Error: Expected an array but got:", jsonData);
      return res.status(500).json([]);
    }

    res.status(200).json(jsonData);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json([]);
  }
}

