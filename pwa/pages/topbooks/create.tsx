import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/topbook/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create TopBook</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
