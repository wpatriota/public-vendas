import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/donation/List";
import { PagedCollection } from "../../types/collection";
import { Donation } from "../../types/Donation";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getDonations = async () =>
  await fetch<PagedCollection<Donation>>("/donations");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: donations, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Donation>> | undefined
  >("donations", getDonations);
  const collection = useMercure(donations, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Donation List</title>
        </Head>
      </div>
      <List donations={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("donations", getDonations);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
