import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Approver from "@/components/Dashboard/approver";

export const metadata: Metadata = {
  title:
    "Approvalize",
  description: "This is the approvalize dashboard.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Approver />
      </DefaultLayout>
    </>
  );
}