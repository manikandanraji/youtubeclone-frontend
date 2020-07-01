import React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import Auth from "./components/Auth";

const App = ({ user }) => {
	const loggedIn = user.token;

	return (
		<ThemeProvider theme={darkTheme}>
			<GlobalStyle />
			{loggedIn ? <Router /> : <Auth />}
		</ThemeProvider>
	);
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(App);
