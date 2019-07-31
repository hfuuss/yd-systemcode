import * as React from "react";
const { Suspense, lazy } = React;
import { Switch, RouterProps, Route } from "react-router-dom";
const Home = lazy(() => 
    import(/**webpackChunkName:"home" */ "../components/Home")
);
const Test = lazy(() => 
    import(/**webpackChunkName:"test" */ "../components/Test")
);
const routes: RouterProps[] = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/test",
        exact: true,
        component: Test
    }
]
const Routes = () => (
    <Suspense fallback={<i>loading....</i>}>
        <Switch>
            {
                routes.map(r => {
                    const { path, exact, component } = r;
                    const LazyCom = component;
                    return (
                        <Route key={path} exact={exact} path={path} render={() => <LazyCom />} />
                    )
                })
            }
        </Switch>
    </Suspense>
)
export default Routes;