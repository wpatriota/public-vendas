import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/donor/List";
import { PagedCollection } from "../../types/collection";
import { Donor } from "../../types/Donor";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getDonors = async () => await fetch<PagedCollection<Donor>>("/donors");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: donors, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Donor>> | undefined
  >("donors", getDonors);
  const collection = useMercure(donors, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Doadores</title>
        </Head>
      </div>
      <List donors={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("donors", getDonors);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
