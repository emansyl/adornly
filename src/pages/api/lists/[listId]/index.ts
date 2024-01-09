// pages/api/lists/[listId]/index.ts
// Handles fetching, updating, and deleting a specific list.

import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteList,
  getListById,
  updateList,
} from "../../../../../prisma/scripts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listId } = req.query;

  try {
    switch (req.method) {
      case "GET":
        // Get a specific list
        const list = await getListById(listId as string);
        res.status(200).json(list);
        break;
      case "PUT":
        // Update a specific list
        const updatedList = await updateList({ listId, ...req.body });
        res.status(200).json(updatedList);
        break;
      case "DELETE":
        // Delete a specific list
        await deleteList(listId as string);
        res.status(204).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}
