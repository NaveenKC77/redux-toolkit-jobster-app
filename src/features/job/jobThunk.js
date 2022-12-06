import { checkForUnauthorizedResponse, customFetch } from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
export const createJobThunk = (url, job, thunkAPI) => {
  try {
    const resp = customFetch.post(url, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteJobThunk = (url, jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = customFetch.delete(url);
    thunkAPI.dispatch(getAllJobs());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editJobThunk = (url, jobId, job, thunkAPI) => {
  try {
    const resp = customFetch.patch(url, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
