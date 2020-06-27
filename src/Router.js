import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";

const AppRouter = () => (
	<Router>
		<Navbar />
		<Sidebar />
		<Container>
			<Switch>
				<Route path="/" component={Home} />
				<Home />
			</Switch>
		</Container>
	</Router>
);

export default AppRouter;
