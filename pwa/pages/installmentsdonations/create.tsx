import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/installmentsdonation/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create InstallmentsDonation</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
