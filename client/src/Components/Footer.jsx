import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import React from "react";

const FooterCom = () => {
  return (
    <Footer container className=" border border-t-8 border-teal-500">
      <div className="">
        <div className="">
          <div className="">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg 
      sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Gaurav's
              </span>
              App
            </Link>
          </div>
        </div>
        <Footer.Divider />
        <div className="">
          <Footer.Copyright
            href="#"
            by="Gaurav's Blog"
            year={new Date().getFullYear()}
          ></Footer.Copyright>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
