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

import { Form } from "../../../components/topbook/Form";
import { PagedCollection } from "../../../types/collection";
import { TopBook } from "../../../types/TopBook";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getTopBook = async (id: string | string[] | undefined) =>
  id ? await fetch<TopBook>(`/top_books/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: topbook } = {} } = useQuery<
    FetchResponse<TopBook> | undefined
  >(["topbook", id], () => getTopBook(id));

  if (!topbook) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{topbook && `Edit TopBook ${topbook["@id"]}`}</title>
        </Head>
      </div>
      <Form topbook={topbook} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["topbook", id], () => getTopBook(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<TopBook>>("/top_books");
  const paths = await getPaths(response, "top_books", "/topbooks/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
