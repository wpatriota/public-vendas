import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { TopBook } from "../../types/TopBook";

interface Props {
  topbook?: TopBook;
}

interface SaveParams {
  values: TopBook;
}

interface DeleteParams {
  id: string;
}

const saveTopBook = async ({ values }: SaveParams) =>
  await fetch<TopBook>(!values["@id"] ? "/top_books" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteTopBook = async (id: string) =>
  await fetch<TopBook>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ topbook }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<TopBook> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveTopBook(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<TopBook> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteTopBook(id), {
    onSuccess: () => {
      router.push("/topbooks");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!topbook || !topbook["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: topbook["@id"] });
  };

  return (
    <div>
      <h1>{topbook ? `Edit TopBook ${topbook["@id"]}` : `Create TopBook`}</h1>
      <Formik
        initialValues={
          topbook
            ? {
                ...topbook,
              }
            : new TopBook()
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
                router.push("/top_books");
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
              <label className="form-control-label" htmlFor="topbook_id">
                id
              </label>
              <input
                name="id"
                id="topbook_id"
                value={values.id ?? ""}
                type="number"
                placeholder=""
                className={`form-control${
                  errors.id && touched.id ? " is-invalid" : ""
                }`}
                aria-invalid={errors.id && touched.id ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="id"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="topbook_title">
                title
              </label>
              <input
                name="title"
                id="topbook_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.title && touched.title ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.title && touched.title ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="title"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="topbook_author">
                author
              </label>
              <input
                name="author"
                id="topbook_author"
                value={values.author ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.author && touched.author ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.author && touched.author ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="author"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="topbook_part">
                part
              </label>
              <input
                name="part"
                id="topbook_part"
                value={values.part ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.part && touched.part ? " is-invalid" : ""
                }`}
                aria-invalid={errors.part && touched.part ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="part"
              />
            </div>
            <div className="form-group">
              <label className="form-control-label" htmlFor="topbook_place">
                place
              </label>
              <input
                name="place"
                id="topbook_place"
                value={values.place ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.place && touched.place ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.place && touched.place ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="place"
              />
            </div>
            <div className="form-group">
              <label
                className="form-control-label"
                htmlFor="topbook_borrowCount"
              >
                borrowCount
              </label>
              <input
                name="borrowCount"
                id="topbook_borrowCount"
                value={values.borrowCount ?? ""}
                type="number"
                placeholder=""
                className={`form-control${
                  errors.borrowCount && touched.borrowCount ? " is-invalid" : ""
                }`}
                aria-invalid={
                  errors.borrowCount && touched.borrowCount ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="invalid-feedback"
                component="div"
                name="borrowCount"
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
      <Link href="/topbooks">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {topbook && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
