import ScrollToTop from "@/components/effect/scroll-to-top";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AdminLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <main className="flex min-h-[80vh] h-max w-full flex-col">
        <div className="w-adminLayout mx-auto pb-10">
          <Outlet />
        </div>
      </main>
      <Toaster richColors />
    </>
  );
};

export default AdminLayout;
