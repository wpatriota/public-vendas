import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { TopBook } from "../../types/TopBook";

interface Props {
  topbooks: TopBook[];
}

export const List: FunctionComponent<Props> = ({ topbooks }) => (
  <div>
    <h1>TopBook List</h1>
    <Link href="/topbooks/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>id</th>
          <th>title</th>
          <th>author</th>
          <th>part</th>
          <th>place</th>
          <th>borrowCount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {topbooks &&
          topbooks.length !== 0 &&
          topbooks.map(
            (topbook) =>
              topbook["@id"] && (
                <tr key={topbook["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(topbook["@id"], "/topbooks/[id]"),
                        name: topbook["@id"],
                      }}
                    />
                  </th>
                  <td>{topbook["id"]}</td>
                  <td>{topbook["title"]}</td>
                  <td>{topbook["author"]}</td>
                  <td>{topbook["part"]}</td>
                  <td>{topbook["place"]}</td>
                  <td>{topbook["borrowCount"]}</td>
                  <td>
                    <Link href={getPath(topbook["@id"], "/topbooks/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(topbook["@id"], "/topbooks/[id]/edit")}>
                      <a>
                        <i className="bi bi-pen" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </a>
                    </Link>
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);
