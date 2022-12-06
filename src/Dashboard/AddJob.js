import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, FormRowSelect } from "../components";
import { toast } from "react-toastify";
import { addUserToLocalStorage } from "../utils/localStorage";
import { handleChange, clearValues } from "../features/job/jobSlice";
import { createJob, editJob } from "../features/job/jobSlice";
import { useEffect } from "react";
export const AddJob = () => {
  const dispatch = useDispatch();

  const {
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user, isLoading } = useSelector((store) => store.user);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }

    if (!company || !position || !jobLocation) {
      toast.error("Please input all the fields..");
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Job" : "Add Job"}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            labelText="position"
            handleChange={handleJobInput}
          ></FormRow>

          <FormRow
            type="text"
            name="company"
            value={company}
            labelText="company"
            handleChange={handleJobInput}
          ></FormRow>

          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            labelText="jobLocation"
            handleChange={handleJobInput}
          ></FormRow>
        </div>

        {/* status */}

        <FormRowSelect
          name="status"
          value={status}
          labelText="status"
          handleChange={handleJobInput}
          list={statusOptions}
        ></FormRowSelect>

        {/* type */}
        <FormRowSelect
          name="jobType"
          labelText="Job Type"
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
        ></FormRowSelect>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearValues())}
          >
            Clear
          </button>
          <button
            className="btn btn-block submit-btn"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
