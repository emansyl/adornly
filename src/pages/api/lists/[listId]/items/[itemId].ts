// pages/api/lists/[listId]/items/[itemId].ts
// Handles updating and deleting a specific item in a list.

import type { NextApiRequest, NextApiResponse } from "next";
import { deleteItem, updateItem } from "../../../../../../prisma/scripts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId, itemId } = req.query;

  try {
    switch (req.method) {
      case "PUT":
        // Update a specific item
        const updatedItem = await updateItem({ listId, itemId, ...req.body });
        res.status(200).json(updatedItem);
        break;
      case "DELETE":
        // Delete a specific item
        await deleteItem(itemId as string);
        res.status(204).end();
        break;
      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
