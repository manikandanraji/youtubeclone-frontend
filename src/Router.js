import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import Channel from "./pages/Channel";

const AppRouter = () => (
	<Router>
		<Navbar />
		<Sidebar />
		<Container>
			<Switch>
				<Route path="/channel/:channelId" component={Channel} />
				<Route path="/feed/trending" component={Trending} />
				<Route path="/feed/subscriptions" component={Subscriptions} />
				<Route path="/" component={Home} />
				<Home />
			</Switch>
		</Container>
	</Router>
);

export default AppRouter;
