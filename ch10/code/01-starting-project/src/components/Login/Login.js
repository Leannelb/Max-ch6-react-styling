import React, { useState, useReducer, useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

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
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailReduceState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
	const [passReduceState, dispatchPass] = useReducer(passReducer, { value: '', isValid: null });

	const { isValid: emailIsValid } = emailReduceState;
	const { isValid: passwordIsValid } = passReduceState;

	const authContext = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity');
			setFormIsValid(
				emailIsValid && passwordIsValid
			);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);


	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

		// setFormIsValid(
		// 	event.target.value.includes('@') && passReduceState.isValid
		// );
	};

	const passwordChangeHandler = (event) => {
		dispatchPass({ type: 'USER_PASS_INPUT', val: event.target.value })

		// setFormIsValid(
		// 	emailReduceState.value.includes('@') && event.target.value.trim().length > 4
		// );
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
	};

	const validatePasswordHandler = () => {
		dispatchPass({ type: 'INPUT_BLUR' })
	};

	const submitHandler = (event) => {
		event.preventDefault();
		authContext.onLogin(emailReduceState.value, passReduceState.value);
		if (formIsValid) {
			authContext.onLogin(emailReduceState.value, passReduceState.value)
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-mail"
					type="email"
					isValid={emailIsValid}
					value={emailReduceState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler} />
				<Input
					ref={passwordInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={passReduceState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler} />
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
