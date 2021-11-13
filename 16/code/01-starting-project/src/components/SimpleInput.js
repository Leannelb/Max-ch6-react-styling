
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameInputReset
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset
  } = useInput(value => value.includes('@'));

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    nameInputReset();
    emailInputReset();
  }

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Please enter a name, name cannot blank!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='text'
          id='email'
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p>Please enter a valid email address.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
