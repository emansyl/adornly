import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { fetchWithBody } from "./util";
import { ListResponse } from "@/types/ListTypes";

export const useCreateList = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, title }: { userId: string; title: string }) =>
      fetchWithBody("/api/lists", "POST", { userId, title }).then((res) =>
        res.json()
      ),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          ["lists", variables.userId],
          (oldData: ListResponse[] | undefined) => {
            if (oldData) {
              return [...oldData, data];
            }

            return [data];
          }
        );
      },
    }
  );
};

export const useFetchLists = (userId: string) => {
  return useQuery(
    ["lists", userId],
    () => fetch(`/api/lists?userId=${userId}`).then((res) => res.json()),
    { enabled: !!userId }
  );
};

export const useListDetails = (listId: string) => {
  return useQuery(
    ["listDetails", listId],
    () => fetch(`/api/lists/${listId}`).then((res) => res.json()),
    { enabled: !!listId }
  );
};

export const useUpdateList = () => {
  return useMutation(({ listId, title }: { listId: string; title: string }) =>
    fetchWithBody(`/api/lists/${listId}`, "PUT", { title })
  );
};

export const useDeleteList = () => {
  return useMutation((listId) =>
    fetch(`/api/lists/${listId}`, { method: "DELETE" })
  );
};
