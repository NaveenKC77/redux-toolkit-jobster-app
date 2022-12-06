import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { page, numOfPages, totalJobs } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;

    if (newPage < 1) {
      newPage = numOfPages - 1;
    }
    dispatch(changePage(newPage));
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (page >= numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft></HiChevronDoubleLeft>Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`${
                pageNumber === page ? "pageBtn active" : "pageBtn"
              }`}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        Next<HiChevronDoubleRight></HiChevronDoubleRight>
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
