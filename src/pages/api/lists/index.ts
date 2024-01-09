import type { NextApiRequest, NextApiResponse } from "next";
import { createList, getLists } from "../../../../prisma/scripts";

// pages/api/lists/index.ts
// Handles creating a new list and fetching all lists for a user.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST":
        // Create a new list
        const { title, userId } = req.body;

        const newList = await createList({ title, userId });
        console.log("banana", newList);
        res.status(201).json(newList);
        break;
      case "GET":
        // Get all lists for a user

        const lists = await getLists(req.query.userId as string);
        console.log("banana", lists);
        res.status(200).json(lists);
        break;
      default:
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
