import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useUser } from "@supabase/auth-helpers-react";
import { Menu, Search, Mountain } from "lucide-react";

export default function NavBar() {
  const user = useUser();
  return (
    <div className="flex items-center justify-between p-4 lg:p-6">
      <Link className="flex items-center" href="/">
        <Mountain className="w-6 h-6" />
        <span className="sr-only">Brand Name</span>
      </Link>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-2 py-6">
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/"
              >
                Home
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="/"
              >
                {user ? "Log out" : "Log in"}
              </Link>
              {/* <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                About Us
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Products
              </Link>
              <Link
                className="flex w-full items-center py-2 text-lg font-semibold"
                href="#"
              >
                Contact
              </Link> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        <Link className="text-lg font-semibold" href="/">
          Home
        </Link>
        <Link className="text-lg font-semibold" href="#">
          {user ? "Log out" : "Log in"}
        </Link>
        {/* <Link className="text-lg font-semibold" href="#">
          About Us
        </Link>
        <Link className="text-lg font-semibold" href="#">
          Products
        </Link>
        <Link className="text-lg font-semibold" href="#">
          Contact
        </Link> */}
        <div className="relative ml-6">
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-500" />
          <Input
            className="pl-12 rounded-lg border-2 focus:border-blue-500 transition-colors"
            placeholder="Search..."
            type="search"
          />
        </div>
      </div>
    </div>
  );
}
