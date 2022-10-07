import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { fetch, getPath } from "../../utils/dataAccess";
import { TopBook } from "../../types/TopBook";

interface Props {
  topbook: TopBook;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ topbook, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!topbook["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(topbook["@id"], { method: "DELETE" });
      router.push("/topbooks");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Show TopBook ${topbook["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <h1>{`Show TopBook ${topbook["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">id</th>
            <td>{topbook["id"]}</td>
          </tr>
          <tr>
            <th scope="row">title</th>
            <td>{topbook["title"]}</td>
          </tr>
          <tr>
            <th scope="row">author</th>
            <td>{topbook["author"]}</td>
          </tr>
          <tr>
            <th scope="row">part</th>
            <td>{topbook["part"]}</td>
          </tr>
          <tr>
            <th scope="row">place</th>
            <td>{topbook["place"]}</td>
          </tr>
          <tr>
            <th scope="row">borrowCount</th>
            <td>{topbook["borrowCount"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/topbooks">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={getPath(topbook["@id"], "/topbooks/[id]/edit")}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
