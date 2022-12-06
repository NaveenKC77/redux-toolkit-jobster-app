import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import { useSelector, useDispatch } from "react-redux";
import { handleSearch, clearFilters } from "../features/allJobs/allJobsSlice";
import FormRowSelect from "./FormRowSelect";
import { useState, useMemo } from "react";

const SearchContainer = () => {
  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState("");

  const { search, searchStatus, searchType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const handleSearchForm = (e) => {
    dispatch(handleSearch({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("search");
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(handleSearch({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form" onSubmit={() => handleSubmit}>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            labelText="search"
            handleChange={optimizedDebounce}
          ></FormRow>
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearchForm}
            list={["all", ...statusOptions]}
          ></FormRowSelect>
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearchForm}
            list={["all", ...jobTypeOptions]}
          ></FormRowSelect>
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearchForm}
            list={["all", ...sortOptions]}
          ></FormRowSelect>
        </div>
        <button
          type="button"
          className="btn btn-block"
          disabled={isLoading}
          onClick={() => dispatch(clearFilters())}
        >
          {isLoading ? "Wait..." : "Clear Filters"}
        </button>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
