import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// components
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import Channel from "./pages/Channel";
import WatchVideo from "./pages/WatchVideo";
import SearchResults from "./pages/SearchResults";
import Library from "./pages/Library";
import History from "./pages/History";
import YourVideos from "./pages/YourVideos";
import LikedVideos from "./pages/LikedVideos";

const AppRouter = () => (
  <Router>
    <ScrollToTop />
    <Navbar />
    <Sidebar />
    <BottomBar />
    <Container>
      <Switch>
        <Route path="/watch/:videoId" component={WatchVideo} />
        <Route path="/channel/:userId" component={Channel} />
        <Route path="/results/:searchterm" component={SearchResults} />
        <Route path="/feed/trending" component={Trending} />
        <Route path="/feed/subscriptions" component={Subscriptions} />
        <Route path="/feed/library" component={Library} />
        <Route path="/feed/history" component={History} />
        <Route path="/feed/my_videos" component={YourVideos} />
        <Route path="/feed/liked_videos" component={LikedVideos} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
