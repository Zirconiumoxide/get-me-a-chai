import React from "react";
import PaymentPage from "@/components/paymentPage";

const Username = async ({ params }) => {
  const allparams = await params;
  return (
    <> 
      <PaymentPage username={allparams.username} />
    </>
  );
};

export default Username;
