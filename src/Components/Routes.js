import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search/index";
import Profile from "../Routes/Profile/index";
import Messages from "../Routes/Messages";
import Notifications from "../Routes/Notifications";

const LoggedInRoutes = () => (
    // Switch: renders only ONE route
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/messages" component={Messages} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/search" component={Search} />
        <Route path="/:username" component={Profile} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
);

const AppRouter = ({ isLoggedIn }) => (isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
