import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface AppFooterProps extends HTMLAttributes<HTMLElement> {}

const AppFooter: React.FC<AppFooterProps> = ({ className }) => {
  return (
    <footer
      id="footer"
      className={cn(
        "w-full flex justify-evenly shadow-inner mt-auto dark:bg-bkg-2-dark",
        className
      )}
    >
      <div className="grid grid-cols-3 w-3/4 py-20 ">
        <div className="flex flex-col space-y-2 text-[0.8rem]">
          <span>© 2024 Công ty Cổ phần đầu tư công nghệ</span>
          <span>
            Địa chỉ: số 124 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà
            Nội
          </span>
          <span>GPĐKKD số ********** Sở KHĐT Tp.Hà Nội cấp ngày --/-/2---</span>
          <span>
            Email: info@dungtl2003.@gmail.com. Điện thoại: 0388 725 ***{" "}
          </span>
        </div>
        <div className="flex flex-col space-y-2 text-[0.8rem]">
          <span>© 2024 Công ty Cổ phần đầu tư công nghệ</span>
          <span>
            Địa chỉ: số 124 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà
            Nội
          </span>
          <span>GPĐKKD số ********** Sở KHĐT Tp.Hà Nội cấp ngày --/-/2---</span>
          <span>
            Email: info@dungtl2003.@gmail.com. Điện thoại: 0388 725 ***{" "}
          </span>
        </div>
        <div className="flex flex-col space-y-2 text-[0.8rem]">
          <span>© 2024 Công ty Cổ phần đầu tư công nghệ</span>
          <span>
            Địa chỉ: số 124 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà
            Nội
          </span>
          <span>GPĐKKD số ********** Sở KHĐT Tp.Hà Nội cấp ngày --/-/2---</span>
          <span>
            Email: info@dungtl2003.@gmail.com. Điện thoại: 0388 725 ***{" "}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
