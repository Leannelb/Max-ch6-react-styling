import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') }
	}
	return { value: '', isValid: false }
};

const passReducer = (state, action) => {
	if (action.type === 'USER_PASS_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 3 }
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 3 }
	}
	return { value: '', isValid: false }
}





const Login = (props) => {

	const [emailSState, setEmailState] = useState();
	const [passwordSState, setPasswordState] = useState();

	const [formIsValid, setFormIsValid] = useState(false);

	const [emailReduceState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
	const [passReduceState, dispatchPass] = useReducer(passReducer, { value: '', isValid: null });

	const { isValid: emailIsValid } = emailReduceState;
	const { isValid: passwordIsValid } = passReduceState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity');
			setFormIsValid(
				emailReduceState.isValid && passReduceState.isValid
			);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);


	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

		setFormIsValid(
			event.target.value.includes('@') && passReduceState.isValid
		);
	};

	const passwordChangeHandler = (event) => {
		dispatchPass({ type: 'USER_PASS_INPUT', val: event.target.value })

		setFormIsValid(
			emailReduceState.value.includes('@') && event.target.value.trim().length > 4
		);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	};

	const validatePasswordHandler = () => {
		// dispatchPass({ type: 'INPUT_BLUR' })
	};

	const submitHandler = (event) => {
		console.log('event ', event);
		event.preventDefault();
		props.onLogin(emailReduceState.value, passReduceState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${emailReduceState.isValid === false ? classes.invalid : ''
						}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailReduceState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${passReduceState.isValid === false ? classes.invalid : ''
						}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passReduceState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
