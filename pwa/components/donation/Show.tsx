import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { Donation } from "../../types/Donation";

interface Props {
  donation: Donation;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ donation, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!donation["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(donation["@id"], { method: "DELETE" });
      router.push("/donations");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Donation ${donation["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Donation ${donation["@id"]}`}</h1>
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
            <td>{donation["amount"]}</td>
          </tr>
          <tr>
            <th scope="row">paymethod</th>
            <td>{donation["paymethod"]}</td>
          </tr>
          <tr>
            <th scope="row">donor</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getPath(donation["donor"], "/donors/[id]"),
                  name: donation["donor"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">installmentsDonations</th>
            <td>
              <ReferenceLinks
                items={donation["installmentsDonations"].map((ref: any) => ({
                  href: getPath(ref, "/installmentsdonations/[id]"),
                  name: ref,
                }))}
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
      <Link href="/donations">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(donation["@id"], "/donations/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
