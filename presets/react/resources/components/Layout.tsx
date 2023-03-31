import type { ObjectOf } from "@lunoxjs/core";
import type { FC, PropsWithChildren } from "react";
interface LayoutProps {
  version: ObjectOf<string>;
}
const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  version = { app: "", framework: "" },
  children = null,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen relative">
      <main className="mx-auto container py-10 xl:px-30 lg:px-10 px-4 font-sans pb-15 justify-center flex flex-col min-h-screen">
        {children}
        <footer className="absolute bottom-0 mb-5 left-0 right-0 px-10 text-gray-500 flex flex-row justify-between text-sm font-sans">
          <a
            className="flex flex-row items-center text-gray-500"
            href="https://github.com/kodepandai/lunox"
          >
            <div className="i-ant-design-github-filled text-xl mr-1" />
            <span>kodepandai/lunox</span>
          </a>
          <div>
            {`Lunox v.${version.app}(framework v.${version.framework})`}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
