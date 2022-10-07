import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Donor } from "../../types/Donor";

interface Props {
  donor?: Donor;
}

interface SaveParams {
  values: Donor;
}

interface DeleteParams {
  id: string;
}

const saveDonor = async ({ values }: SaveParams) =>
  await fetch<Donor>(!values["@id"] ? "/donors" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteDonor = async (id: string) =>
  await fetch<Donor>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ donor }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Donor> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveDonor(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Donor> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteDonor(id), {
    onSuccess: () => {
      router.push("/donors");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!donor || !donor["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: donor["@id"] });
  };

  return (
    <div>
      <h1>{donor ? `Edit Donor ${donor["@id"]}` : `Create Donor`}</h1>
      <Formik
        initialValues={
          donor
            ? {
                ...donor,
              }
            : new Donor()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/donors");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="donor_name">
                name
              </label>
              <input
                name="name"
                id="donor_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="name"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="donor_email">
                email
              </label>
              <input
                name="email"
                id="donor_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.email && touched.email ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.email && touched.email ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="email"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">donations</div>
              <FieldArray
                name="donations"
                render={(arrayHelpers) => (
                  <div id="donor_donations">
                    {values.donations && values.donations.length > 0 ? (
                      values.donations.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`donations.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/donors">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {donor && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
