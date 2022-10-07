import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getPath } from "../../utils/dataAccess";
import { InstallmentsDonation } from "../../types/InstallmentsDonation";

interface Props {
  installmentsdonations: InstallmentsDonation[];
}

export const List: FunctionComponent<Props> = ({ installmentsdonations }) => (
  <div>
    <h1>InstallmentsDonation List</h1>
    <Link href="/installmentsdonations/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>amount</th>
          <th>paymethod</th>
          <th>status</th>
          <th>donation</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {installmentsdonations &&
          installmentsdonations.length !== 0 &&
          installmentsdonations.map(
            (installmentsdonation) =>
              installmentsdonation["@id"] && (
                <tr key={installmentsdonation["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getPath(
                          installmentsdonation["@id"],
                          "/installmentsdonations/[id]"
                        ),
                        name: installmentsdonation["@id"],
                      }}
                    />
                  </th>
                  <td>{installmentsdonation["amount"]}</td>
                  <td>{installmentsdonation["paymethod"]}</td>
                  <td>{installmentsdonation["status"]}</td>
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
                  <td>
                    <Link
                      href={getPath(
                        installmentsdonation["@id"],
                        "/installmentsdonations/[id]"
                      )}
                    >
                      <a>
                        <i className="bi bi-search" aria-hidden="true"></i>
                        <span className="sr-only">Show</span>
                      </a>
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={getPath(
                        installmentsdonation["@id"],
                        "/installmentsdonations/[id]/edit"
                      )}
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
