// pages/api/lists/[listId]/items/index.ts
// Manages adding an item to a list and getting all items in a list.

import type { NextApiRequest, NextApiResponse } from "next";
import {
  addItemToList,
  getItemsByListId,
} from "../../../../../../prisma/scripts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query;

  try {
    switch (req.method) {
      case "POST":
        // Add an item to a list
        const newItem = await addItemToList({ listId, ...req.body });
        res.status(201).json(newItem);
        break;
      case "GET":
        // Get all items in a list
        const items = await getItemsByListId(listId as string);
        res.status(200).json(items);
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
