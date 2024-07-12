import { Fragment, useRef, useState } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";

const QuoteForm = (props) => {
  const [isEntered, setIsEntering] = useState(false);
  const characterInputRef = useRef();
  const quoteInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredCharacter = characterInputRef.current.value;
    const enteredQuote = quoteInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ character: enteredCharacter, quote: enteredQuote });
  }

  function handleFormFocus() {
    setIsEntering("true");
  }

  function handleFormClick() {
    setIsEntering(false);
  }

  return (
    <Fragment>
      <Prompt
        when={isEntered}
        message={(location) =>
          "Are you sure you want to leave? All entered data will be lost"
        }
      />
      <Card>
        <form
          onFocus={handleFormFocus}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="character">Character</label>
            <input type="text" id="character" ref={characterInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="quote">Quote</label>
            <textarea id="quote" rows="5" ref={quoteInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={handleFormClick} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
