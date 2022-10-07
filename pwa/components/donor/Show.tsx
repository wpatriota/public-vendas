import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getPath } from "../../utils/dataAccess";
import { Donor } from "../../types/Donor";

interface Props {
  donor: Donor;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ donor, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!donor["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(donor["@id"], { method: "DELETE" });
      router.push("/donors");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show Donor ${donor["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show Donor ${donor["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">name</th>
            <td>{donor["name"]}</td>
          </tr>
          <tr>
            <th scope="row">email</th>
            <td>{donor["email"]}</td>
          </tr>
          <tr>
            <th scope="row">donations</th>
            <td>
              <ReferenceLinks
                items={donor["donations"].map((ref: any) => ({
                  href: getPath(ref, "/donations/[id]"),
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
      <Link href="/donors">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(donor["@id"], "/donors/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
