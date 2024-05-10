import { usePage, Link } from "@lunoxjs/view-plugin-react";
import { useEffect, type FC, type PropsWithChildren } from "react";
import type { users } from "database/schema";
import { OnServer } from "@lunoxjs/core/contracts";
import { Toaster } from "$lib/components/ui/sonner";
import { toast } from "sonner";
import LightSwitch from "$lib/components/LightSwitch";
import { ThemeProvider } from "$lib/components/theme-provider";
export const onServer: OnServer = async (req) => {
  const user = (await req?.auth().user()) as
    | typeof users.$inferSelect
    | undefined;
  return {
    user,
  };
};
interface LayoutProps {
  version: Record<string, string>;
  user?: typeof users;
}
const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  version = { app: "", framework: "" },
  user,
}) => {
  const { sessions } = usePage();
  useEffect(() => {
    if (sessions?.message) {
      toast.error(sessions.message, {
        cancel: {
          label: "close",
          onClick: () => {
            //
          },
        },
      });
    }
  }, [sessions]);
  return (
    <ThemeProvider defaultTheme="system" storageKey="lunoxjs-theme">
      <div className="bg-secondary min-h-screen relative">
        <div className="fixed top-0 left-0 right-0 bg-primary-foreground z-10 backdrop-blur">
          <div className="mx-auto container flex items-center h-12 gap-4">
            <Link href="/" className="p-4 flex gap-2 item-center">
              <img src="/images/logo.svg" alt="Lunox" className="h-9" />
              <div className="my-auto">
                <span>Lu</span>
                <span className="text-yellow-600">nox</span>
              </div>
            </Link>

            <div className="ml-auto text-primary font-bold">
              {user ? (
                <Link href="/admin">Dashboard</Link>
              ) : (
                <Link href="/login">Login Now</Link>
              )}
            </div>
            <LightSwitch />
          </div>
        </div>
        <main className="mx-auto container py-20 xl:px-30 lg:px-10 px-4 font-sans justify-center flex flex-col min-h-screen">
          {children}
          <footer className="absolute bottom-0 mb-5 left-0 right-0 px-10 text-gray-500 flex flex-row justify-between text-sm font-sans">
            <a
              className="flex flex-row items-center text-gray-500"
              href="https://github.com/kodepandai/lunox"
            >
              <div className="icon-[ant-design--github-filled] text-xl mr-1" />
              <span>kodepandai/lunox</span>
            </a>
            <div>
              Lunox v.{version.app}(framework v.{version.framework})
            </div>
          </footer>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};
export default Layout;
