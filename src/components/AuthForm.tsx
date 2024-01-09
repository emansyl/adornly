import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <Card className="mx-auto max-w-md p-6 bg-white rounded-xl shadow-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          showLinks={false}
          providers={["google"]}
          redirectTo="http://localhost:3000/api/auth/callback"
        />
      </CardContent>
    </Card>
  );
}
