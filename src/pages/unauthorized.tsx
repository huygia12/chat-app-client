import { buttonVariants } from "@/utils/constants";
import { FC } from "react";
import { Link } from "react-router-dom";

const Unauthorized: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center w-[460px] leading-relaxed">
        <div className="h-[158px] leading-[153px]">
          <h1 className="font-sans text-[220px] text-gray-900 tracking-wider font-bold m-0 text-shadow-4xx">
            4<span className="text-shadow-4xx-blue">0</span>1
          </h1>
        </div>
        <p className="font-sans text-gray-400 text-lg my-4">
          You are not authorized to access this page.
        </p>
        <Link to={"/"} className={buttonVariants({ variant: "default" })}>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
