import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useUser } from "@supabase/auth-helpers-react";
import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { useCreateList, useFetchLists } from "@/hooks/useLists";
import { list } from "postcss";

export default function Home() {
  const [listTitle, setListTitle] = useState("");
  const createList = useCreateList();
  const user = useUser();

  const { isError, isLoading, data } = useFetchLists(user?.id as string);
  console.log(data);
  if (!user) {
    return <AuthForm />;
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <Card className="space-y-4">
          <CardHeader>
            <h2 className="text-2xl font-bold">Create a New List</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="list-name">List Name</Label>
              <Input
                className="w-full"
                id="list-name"
                placeholder="Enter list name"
                value={listTitle}
                required
                onChange={(e) => {
                  setListTitle(e.target.value);
                }}
              />
            </div>
            <Button
              onClick={async () => {
                console.log(listTitle);
                if (listTitle) {
                  const { id } = await createList.mutateAsync({
                    userId: user.id,
                    title: listTitle,
                  });
                  // router.push(`/${encodeURIComponent(id)}`);
                }
                setListTitle("");
              }}
              className="w-full border-2 border-slate-900 drop-shadow-lg"
            >
              Create List
            </Button>
          </CardContent>
        </Card>

        <h1 className="text-lg md:text-2xl font-semibold mb-4">My Lists</h1>
        <Input
          className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950 mb-4"
          placeholder="Filter by category or tag..."
          type="search"
        />

        <ul className="space-y-4">
          {isLoading
            ? null
            : data
                .slice()
                .reverse()
                .map((list) => {
                  return (
                    <li key={list.id}>
                      <Link href={`/${list.id}`}>
                        <Card className="cursor-pointer">
                          <CardHeader>
                            <CardTitle>{list.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">
                              Created: Jan 2, 2024
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </li>
                  );
                })}
        </ul>
      </div>
    </main>
  );
}
