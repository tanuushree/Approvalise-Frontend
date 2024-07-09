import React from "react";
import { Container } from "@/components/landing-page/Container";

export const Cta = () => {
  return (
    <Container className="pb-10">
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-xl font-medium lg:text-2xl">
          Ready to revolutionize the way approvals work in your school!!!
          </h2>
         
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
        </div>
      </div>
    </Container>
  );
};
