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

import { Form } from "../../../components/installmentsdonation/Form";
import { PagedCollection } from "../../../types/collection";
import { InstallmentsDonation } from "../../../types/InstallmentsDonation";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getInstallmentsDonation = async (id: string | string[] | undefined) =>
  id
    ? await fetch<InstallmentsDonation>(`/installments_donations/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: installmentsdonation } = {} } = useQuery<
    FetchResponse<InstallmentsDonation> | undefined
  >(["installmentsdonation", id], () => getInstallmentsDonation(id));

  if (!installmentsdonation) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {installmentsdonation &&
              `Edit InstallmentsDonation ${installmentsdonation["@id"]}`}
          </title>
        </Head>
      </div>
      <Form installmentsdonation={installmentsdonation} />
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
    "/installmentsdonations/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
