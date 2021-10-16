import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserIsLoggedIn = localStorage.getItem('isLoggedin');

		if (storedUserIsLoggedIn === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	//debugger;
	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedin');
		setIsLoggedIn(false);

	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler
			}}
		>
			<React.Fragment>
				<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
				<main>
					{!isLoggedIn && <Login onLogin={loginHandler} />}
					{isLoggedIn && <Home onLogout={logoutHandler} />}
				</main>
			</React.Fragment>
		</AuthContext.Provider>
	);
}

export default App;
