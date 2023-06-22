import { Image, LinkButton } from "features/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "primereact/card";
import Panda from "./images/panda.png";

export const Homepage = () => {
  const { data } = useSession();

  return (
    <div className="mt-8 px-4">
      <Card className=" border-1 surface-border w-full sm:w-10 md:w-9 lg:w-6 mx-auto bg-blue-50">
        <h2 className=" text-green-400 text-center">
          Welcome to NextJs Boilerplate
        </h2>

        <div className="text-center ">
          <p className="text-xs">
            <Link href="/showcase">Click </Link> to see showcase page
          </p>
        </div>

        <div className="mt-4 flex flex-row gap-6">
          <div className="w-12rem h-16rem relative">
            <Image src={Panda} alt="panda" fill sizes="100%" />
          </div>

          <div className="flex flex-column align-items-center justify-content-center ">
            <p>
              Have you read the README.md yet? <br />
            </p>
            <span className=" text-sm text-orange-600 underline">
              If not then what are you doing here?
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-content-center ">
          {!data && <LinkButton href="/auth/login">Login</LinkButton>}
        </div>

        <br />
        <div className=" mt-4 ">
          {data && (
            <div className="flex flex-row gap-4">
              <div>
                <div className="w-10rem h-10rem border-1 border-round relative">
                  <Image
                    src={data.user?.avatar || ""}
                    alt="user-image"
                    fill
                    sizes="100%"
                  />
                </div>
              </div>
              <div className="flex flex-column  gap-2 ">
                <div>
                  <h6 className=" text-sm">Username : {data.user?.name}</h6>
                </div>
                <div>
                  <h6 className=" text-sm">Email : {data.user?.email}</h6>
                </div>

                <div>
                  <LinkButton href="/auth/logout">Logout</LinkButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
