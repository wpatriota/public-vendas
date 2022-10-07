import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { Donation } from "../../types/Donation";

interface Props {
  donations: Donation[];
}

export const List: FunctionComponent<Props> = ({ donations }) => (
  <div>
    <h1>Donation List</h1>
    <Link href="/donations/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>amount</th>
          <th>paymethod</th>
          <th>donor</th>
          <th>installmentsDonations</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {donations &&
          donations.length !== 0 &&
          donations.map(
            (donation) =>
              donation["@id"] && (
                <tr key={donation["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(donation["@id"], "/donations/[id]"),
                        name: donation["@id"],
                      }}
                    />
                  </th>
                  <td>{donation["amount"]}</td>
                  <td>{donation["paymethod"]}</td>
                  <td>
                    <ReferenceLinks
                      items={{
                        href: getPath(donation["donor"], "/donors/[id]"),
                        name: donation["donor"],
                      }}
                    />
                  </td>
                  <td>
                    <ReferenceLinks
                      items={donation["installmentsDonations"].map(
                        (ref: any) => ({
                          href: getPath(ref, "/installmentsdonations/[id]"),
                          name: ref,
                        })
                      )}
                    />
                  </td>
                  <td>
                    <Link href={getPath(donation["@id"], "/donations/[id]")}>
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={getPath(donation["@id"], "/donations/[id]/edit")}
                    >
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
