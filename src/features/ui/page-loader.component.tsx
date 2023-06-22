import { FC, PropsWithChildren } from "react";
import { CgSpinner } from "react-icons/cg";

interface PageLoaderProps {
  fullHeight?: boolean;
  height?: number; // like 70 or 50 as in 70% or 50%
  loading?: boolean;
}

export const PageLoader: FC<PropsWithChildren<PageLoaderProps>> = ({
  fullHeight,
  height,
  loading,
  children,
}) => {
  return (
    <>
      {!loading && children}
      {loading && (
        <div
          className="w-full flex align-items-center justify-content-center"
          style={{
            minHeight: fullHeight ? "100vh" : height ? `${height}vh` : "75vh",
          }}
        >
          <CgSpinner className="icon-spin" />
        </div>
      )}
    </>
  );
};
