import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/donor/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Donor</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
