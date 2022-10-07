import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Donor } from "../../types/Donor";

interface Props {
  donors: Donor[];
}

export const List: FunctionComponent<Props> = ({ donors }) => (
  <div>
    <h1>Doadores</h1>
    <Link href="/donors/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Doações</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {donors &&
          donors.length !== 0 &&
          donors.map(
            (donor) =>
              donor["@id"] && (
                <tr key={donor["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(donor["@id"], "/donors/[id]"),
                        name: donor["@id"],
                      }}
                    />
                  </th>
                  <td>{donor["name"]}</td>
                  <td>{donor["email"]}</td>
                  <td>
                    <ReferenceLinks
                      items={donor["donations"].map((ref: any) => ({
                        href: getPath(ref, "/donations/[id]"),
                        name: ref,
                      }))}
                    />
                  </td>
                  <td>
                    <Link href={getPath(donor["@id"], "/donors/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link href={getPath(donor["@id"], "/donors/[id]/edit")}>
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
