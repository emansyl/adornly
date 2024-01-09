import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@supabase/auth-helpers-react";
import AuthForm from "@/components/AuthForm";
import { ListItem } from "@/components/ListItem";
import { useAddItem, useFetchItems } from "@/hooks/useItems";
import { useRouter } from "next/router";
import { useState } from "react";
import { Item } from "@/types/ItemType";
import { useListDetails } from "@/hooks/useLists";
import { Share } from "lucide-react";
import { list } from "postcss";
import { getURL, removeLeadingSlash } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Home() {
  const router = useRouter();
  const listId = router.query.list as string;
  const pathname = usePathname();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <AddItemForm listId={listId} />
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Saved Links:</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={async () => {
                  const shareUrl = getURL() + removeLeadingSlash(pathname);
                  await navigator.clipboard.writeText(shareUrl);
                  // alert(shareUrl);
                }}
                size="sm"
                variant="outline"
              >
                <Share className="w-4 h-4" />
                Share List
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy share link</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ItemList listId={listId} />
      </section>
    </main>
  );
}

function AddItemForm({ listId }: { listId: string }) {
  const addListItem = useAddItem();
  const { data, isLoading, isError, isFetching } = useListDetails(listId);
  // console.log(data);

  const [item, setItem] = useState({ url: "", description: "" });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addListItem.mutate({
      itemData: { url: item.url, description: item.description },
      listId,
    });
    // console.log("Item:", item);
    setItem({ url: "", description: "" });
  };

  const user = useUser();
  if (isLoading || isError || isFetching) {
    return;
  }

  if (user?.id !== data?.userId) {
    return;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>{data?.title}</CardTitle>
          <CardDescription>
            Enter your shopping links below to share with friends.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col max-w-sm  space-y-2"
        >
          <Input
            type="text"
            name="url"
            placeholder="URL"
            value={item.url}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleChange}
          />
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ItemList({ listId }: { listId: string }) {
  const { isLoading, isError, data } = useFetchItems(listId);
  console.log(isLoading, isError, data);

  if (isLoading || isError) {
    return <></>;
  }
  if (!data || data.length === 0) {
    return <div>No Items</div>;
  }

  return (
    <ul className="space-y-4">
      {data
        .slice()
        .reverse()
        .map((item: Item) => {
          return (
            <ListItem
              id={item.id}
              listId={listId}
              key={item.id}
              url={item.url}
              imageLink={""}
              description={item.description as string}
            />
          );
        })}
    </ul>
  );
}
