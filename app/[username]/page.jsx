import React from "react";
import PaymentPage from "@/components/paymentPage";
import { notFound } from "next/navigation";

const Username = async ({ params }) => {
  const allparams = await params;
  if (!allparams.username) {
    return notFound();
  }
  return (
    <> 
      <PaymentPage username={allparams.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  const allparams = await params;
  return {
    title: `Support ${allparams.username} - Buy me a Chai`,
  }
}
