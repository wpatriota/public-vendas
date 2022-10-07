import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/topbook/List";
import { PagedCollection } from "../../types/collection";
import { TopBook } from "../../types/TopBook";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getTopBooks = async () =>
  await fetch<PagedCollection<TopBook>>("/top_books");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: topbooks, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<TopBook>> | undefined
  >("top_books", getTopBooks);
  const collection = useMercure(topbooks, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>TopBook List</title>
        </Head>
      </div>
      <List topbooks={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("top_books", getTopBooks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
