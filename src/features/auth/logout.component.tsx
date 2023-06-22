import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export function Logout() {
  const { push } = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/");
    }
  }, [status]);

  const logout = () => {
    signOut({ redirect: false });
  };

  return (
    <div className="w-full flex justify-content-center mt-8">
      <Card className="w-2">
        <p>Are you sure you want to logout?</p>

        <div className="flex justify-content-center mt-4">
          <Button onClick={logout}>Logout</Button>
        </div>
      </Card>
    </div>
  );
}
