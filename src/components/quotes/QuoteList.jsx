import { Fragment } from "react";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const sortQuotes = (quotes, descending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (descending) {
      return quoteA.id < quoteB.id ? 1 : -1;
    } else {
      return quoteA.id > quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortingDescending = queryParams.get("sort") === "desc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingDescending);

  const handlerSortingChange = () => {
    history.push("/quotes?sort=" + (isSortingDescending ? "asc" : "desc"));
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={handlerSortingChange}>
          Sort {isSortingDescending ? "Ascending" : "Descending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.character}
            text={quote.quote}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
