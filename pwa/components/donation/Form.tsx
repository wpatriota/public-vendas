import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Donation } from "../../types/Donation";

interface Props {
  donation?: Donation;
}

interface SaveParams {
  values: Donation;
}

interface DeleteParams {
  id: string;
}

const saveDonation = async ({ values }: SaveParams) =>
  await fetch<Donation>(!values["@id"] ? "/donations" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteDonation = async (id: string) =>
  await fetch<Donation>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ donation }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Donation> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveDonation(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Donation> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteDonation(id), {
    onSuccess: () => {
      router.push("/donations");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!donation || !donation["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: donation["@id"] });
  };

  return (
    <div>
      <h1>
        {donation ? `Edit Donation ${donation["@id"]}` : `Create Donation`}
      </h1>
      <Formik
        initialValues={
          donation
            ? {
                ...donation,
              }
            : new Donation()
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
                router.push("/donations");
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
              <label className="form-control-label" htmlFor="donation_amount">
                amount
              </label>
              <input
                name="amount"
                id="donation_amount"
                value={values.amount ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`form-control${
                  errors.amount && touched.amount ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.amount && touched.amount ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="amount"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="donation_paymethod"
              >
                paymethod
              </label>
              <input
                name="paymethod"
                id="donation_paymethod"
                value={values.paymethod ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.paymethod && touched.paymethod ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.paymethod && touched.paymethod ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="paymethod"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="donation_donor">
                donor
              </label>
              <input
                name="donor"
                id="donation_donor"
                value={values.donor ?? ""}
                type="text"
                placeholder="Doador."
                required={true}
                className={`form-control${
                  errors.donor && touched.donor ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.donor && touched.donor ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="donor"
              />
            </div>
            <div className="form-group">
              <div className="form-control-label">installmentsDonations</div>
              <FieldArray
                name="installmentsDonations"
                render={(arrayHelpers) => (
                  <div id="donation_installmentsDonations">
                    {values.installmentsDonations &&
                    values.installmentsDonations.length > 0 ? (
                      values.installmentsDonations.map(
                        (item: any, index: number) => (
                          <div key={index}>
                            <Field name={`installmentsDonations.${index}`} />
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
                        )
                      )
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
      <Link href="/donations">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {donation && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
