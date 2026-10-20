import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

async function HomeContent() {
  await getMe();
  return (
    <div>
      Hello Next JS

      <Button>Click Me</Button>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<p className="p-4 text-muted-foreground">Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}
