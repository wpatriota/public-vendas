import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { InstallmentsDonation } from "../../types/InstallmentsDonation";

interface Props {
  installmentsdonation: InstallmentsDonation;
  text: string;
}

export const Show: FunctionComponent<Props> = ({
  installmentsdonation,
  text,
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!installmentsdonation["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(installmentsdonation["@id"], { method: "DELETE" });
      router.push("/installmentsdonations");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show InstallmentsDonation ${installmentsdonation["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show InstallmentsDonation ${installmentsdonation["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">amount</th>
            <td>{installmentsdonation["amount"]}</td>
          </tr>
          <tr>
            <th scope="row">paymethod</th>
            <td>{installmentsdonation["paymethod"]}</td>
          </tr>
          <tr>
            <th scope="row">status</th>
            <td>{installmentsdonation["status"]}</td>
          </tr>
          <tr>
            <th scope="row">donation</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(
                    installmentsdonation["donation"],
                    "/donations/[id]"
                  ),
                  name: installmentsdonation["donation"],
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/installmentsdonations">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link
        href={getPath(
          installmentsdonation["@id"],
          "/installmentsdonations/[id]/edit"
        )}
      >
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
