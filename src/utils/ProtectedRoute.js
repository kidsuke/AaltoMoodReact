import {Redirect, Route} from "react-router";
import React from "react";
import connect from "react-redux/es/connect/connect";

class ProtectedRoute extends React.Component {

    render() {
        const { component: Component, authenticated, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props =>
                    authenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticationState.authenticated
    }
};

export default connect(mapStateToProps)(ProtectedRoute)