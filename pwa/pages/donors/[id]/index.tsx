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

import { Show } from "../../../components/donor/Show";
import { PagedCollection } from "../../../types/collection";
import { Donor } from "../../../types/Donor";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getDonor = async (id: string | string[] | undefined) =>
  id ? await fetch<Donor>(`/donors/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: donor, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Donor> | undefined>(["donor", id], () =>
      getDonor(id)
    );
  const donorData = useMercure(donor, hubURL);

  if (!donorData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Donor ${donorData["@id"]}`}</title>
        </Head>
      </div>
      <Show donor={donorData} text={text} />
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
  const paths = await getPaths(response, "donors", "/donors/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
