import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Delete } from "lucide-react";
import Link from "next/link";
import { useDeleteItem } from "@/hooks/useItems";

export function ListItem({
  id,
  url,
  listId,
  imageLink,
  description,
}: {
  id: string;
  url: string;
  imageLink: string;
  description: string;
  listId: string;
}) {
  const deleteItem = useDeleteItem();
  return (
    <li className="flex items-start justify-between bg-gray-100 p-4 rounded-md">
      {/* <img
        alt="Link preview image"
        className="rounded-md mr-4"
        height="60"
        src={imageLink}
        style={{
          aspectRatio: "60/60",
          objectFit: "cover",
        }}
        width="60"
      /> */}
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between w-full">
          <a
            target="_blank"
            className="text-blue-700 hover:text-blue-800 visited:text-purple-700"
            href={url}
          >
            {url}
          </a>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => {
          deleteItem.mutate({ listId: listId, itemId: id });
        }}
      >
        <X size={15} />
      </button>
    </li>
  );
}
