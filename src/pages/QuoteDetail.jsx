import { useParams, Route } from "react-router-dom/cjs/react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const DUMMY_DATA = [
  {
    id: "q1",
    character: "Luffy",
    quote: "Kaizoku ou ni Ore wa naru!",
  },
  {
    id: "q2",
    character: "Master Roshi",
    quote:
      "Move well, study well, play well, eat well, rest well - That is the turtle master way!",
  },
];

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.quote) {
    return <p className="centered">No quotes found!</p>;
  }

  return (
    <main>
      <HighlightedQuote
        text={loadedQuote.quote}
        author={loadedQuote.character}
      />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            View Comments
          </Link>
        </div>
      </Route>
      <Route path="/quotes/:quoteId/comments">
        <Comments />
      </Route>
    </main>
  );
};

export default QuoteDetail;
