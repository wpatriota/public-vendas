import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/donation/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Donation</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
