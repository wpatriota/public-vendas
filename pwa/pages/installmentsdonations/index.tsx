import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/installmentsdonation/List";
import { PagedCollection } from "../../types/collection";
import { InstallmentsDonation } from "../../types/InstallmentsDonation";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getInstallmentsDonations = async () =>
  await fetch<PagedCollection<InstallmentsDonation>>("/installments_donations");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: installmentsdonations, hubURL } = { hubURL: null } } =
    useQuery<FetchResponse<PagedCollection<InstallmentsDonation>> | undefined>(
      "installments_donations",
      getInstallmentsDonations
    );
  const collection = useMercure(installmentsdonations, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>InstallmentsDonation List</title>
        </Head>
      </div>
      <List installmentsdonations={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "installments_donations",
    getInstallmentsDonations
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
