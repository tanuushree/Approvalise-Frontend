"use client";
import React from "react";
import { Container } from "@/components/landing-page/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }: { open: boolean }) => ( 
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "What types of applications can be submitted through Approvalize?",
    answer: "Approvalize is versatile and can handle a wide range of applications within an educational institution. This is not limited",
  },
  {
    question: "How does the Language Model (LLM) work?",
    answer: "Our LLM acts as your intelligent assistant.  Tell it what kind of application or letter you need, and it will generate a draft based on common templates and best practices. You can then customize the draft to your specific needs, saving you time and effort.",
  },
  {
    question: " Can I customize the approval workflow for different types of applications? ",
    answer:
      "Yes! Approvalize empowers you to create custom workflows for various applications.  This means you can define the specific approval chain for each application type, ensuring it reaches the right people.",
  },
  {
    question: "Can users access Approvalize from any device? ",
    answer:
      "Yes, Approvalize is a web-based platform accessible from any device with an internet connection.",
  },
  {
    question: "What are the benefits of using Approvalize for students?",
    answer: 
      "Effortless applications: Skip lengthy forms and get approvals faster.Real-time tracking: See exactly where your application is in the process.Faster decisions: Streamlined workflows mean less waiting.Clear communication: Stay informed and connected with reviewers.",
  }
  
];
