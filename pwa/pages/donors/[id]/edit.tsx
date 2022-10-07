import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Form } from "../../../components/donor/Form";
import { PagedCollection } from "../../../types/collection";
import { Donor } from "../../../types/Donor";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getDonor = async (id: string | string[] | undefined) =>
  id ? await fetch<Donor>(`/donors/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: donor } = {} } = useQuery<
    FetchResponse<Donor> | undefined
  >(["donor", id], () => getDonor(id));

  if (!donor) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{donor && `Edit Donor ${donor["@id"]}`}</title>
        </Head>
      </div>
      <Form donor={donor} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["donor", id], () => getDonor(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Donor>>("/donors");
  const paths = await getPaths(response, "donors", "/donors/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
