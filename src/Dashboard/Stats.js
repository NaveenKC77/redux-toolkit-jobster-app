import { useEffect } from "react";
import { StatsContainer, ChartsContainer, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../features/allJobs/allJobsSlice";
export const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
