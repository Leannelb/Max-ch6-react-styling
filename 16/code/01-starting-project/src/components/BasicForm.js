import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset
  } = useInput(value => value.trim() !== '');

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset
  } = useInput(value => value.trim() !== '')

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset
  } = useInput(value => value.includes('@'))

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!firstNameIsValid) {
      return;
    }

    firstNameReset('');
    lastNameReset('');
    emailReset('');
  }

  let isFormValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    isFormValid = true;
  }

  const firstNameInputClasses = firstNameHasError 
  ? 'form-control invalid' 
  : 'form-control';

  const lastNameInputClasses = lastNameHasError 
  ? 'form-control invalid' 
  : 'form-control';

  const emailInputClasses = emailHasError 
  ? 'form-control invalid' 
  : 'form-control';

  return (
    <form onSubmit={submitFormHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameValue} />
          {firstNameHasError && <p>Please enter a first name</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameValue} />
          {lastNameHasError && <p>Please enter a valid last name</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailValue} />
        {emailHasError && <p>Please enter a valid email address.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
