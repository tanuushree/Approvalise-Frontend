import Image from "next/image";
import { Container } from "@/components/landing-page/Container";
import heroImg from "../../../public/img/hero.png";

export const Hero = () => {
  return (
    <>
      <Container className="flex pt-20 pb-20 flex-wrap">
        <div className="flex  p-18 items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              APPROVALIZE
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            A web-based platform designed to streamline and manage 
            approval workflows within educational institutions.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="/auth"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
              >
                User
              </a>
              <a
                href="/approver_auth"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
              >
                Approver
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="417"
              height="417"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      
      {/*<Container>
        <div className="flex flex-col justify-center">
          <div className="text-2xl text-center text-gray-700 dark:text-white">
          <strong> Tired of the paper chase?.</strong>  <br></br>
          </div>
          <div className="text-2xl text-center text-gray-700 dark:text-white">
          Approvalize streamlines application approvals in your educational institution with a user-friendly, web-based workflow.
          </div>
        </div>
      </Container>*/}
    </>
  );
}

