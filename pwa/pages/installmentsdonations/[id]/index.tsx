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

import { Show } from "../../../components/installmentsdonation/Show";
import { PagedCollection } from "../../../types/collection";
import { InstallmentsDonation } from "../../../types/InstallmentsDonation";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getInstallmentsDonation = async (id: string | string[] | undefined) =>
  id
    ? await fetch<InstallmentsDonation>(`/installments_donations/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: installmentsdonation, hubURL, text } = {
      hubURL: null,
      text: "",
    },
  } = useQuery<FetchResponse<InstallmentsDonation> | undefined>(
    ["installmentsdonation", id],
    () => getInstallmentsDonation(id)
  );
  const installmentsdonationData = useMercure(installmentsdonation, hubURL);

  if (!installmentsdonationData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show InstallmentsDonation ${installmentsdonationData["@id"]}`}</title>
        </Head>
      </div>
      <Show installmentsdonation={installmentsdonationData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["installmentsdonation", id], () =>
    getInstallmentsDonation(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<InstallmentsDonation>>(
    "/installments_donations"
  );
  const paths = await getPaths(
    response,
    "installments_donations",
    "/installmentsdonations/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
