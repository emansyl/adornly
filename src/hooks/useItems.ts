import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { fetchWithBody } from "./util";
import { Item } from "@/types/ItemType";

export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      listId,
      itemData,
    }: {
      listId: string;
      itemData: Omit<Item, "id">;
    }) => fetchWithBody(`/api/lists/${listId}/items`, "POST", itemData),
    onSuccess: (data, { listId }) => {
      // console.log("banana", listId);
      queryClient.invalidateQueries({ queryKey: ["items", listId] });
    },
  });
};

export const useFetchItems = (listId: string) => {
  return useQuery(["items", listId], () =>
    fetch(`/api/lists/${listId}/items`).then((res) => res.json())
  );
};

export const useUpdateItem = () => {
  return useMutation(
    ({
      listId,
      itemId,
      itemData,
    }: {
      listId: string;
      itemId: string;
      itemData: Partial<Item>;
    }) => fetchWithBody(`/api/lists/${listId}/items/${itemId}`, "PUT", itemData)
  );
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ listId, itemId }: { listId: string; itemId: string }) =>
      fetch(`/api/lists/${listId}/items/${itemId}`, { method: "DELETE" }),
    onSuccess: (data, { listId }) => {
      console.log("banana", listId);
      queryClient.invalidateQueries({ queryKey: ["items", listId] });
    },
  });
};
