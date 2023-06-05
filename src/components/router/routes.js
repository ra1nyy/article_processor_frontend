import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Fragment} from "react";
import {Home} from "../../screens/home/home";
import {Login} from "../../screens/auth/login";
import RoutePublic from "./routepublic";
import RouteGuard from "./routeguard";
import {ArticleForm} from "../../screens/form/form";
import {BaseLayout} from "../base/base";
import {Profile} from "../../screens/profile/profile";
import {Articles} from "../../screens/articles/articles";


const SiteRoutes = () => {


    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <BaseLayout>
                            <RouteGuard component={Home}/>
                        </BaseLayout>
                    }/>
                    <Route path="/login" element={<RoutePublic component={Login}/>}/>
                    <Route path="/form" element={
                        <BaseLayout>
                            <RouteGuard component={ArticleForm}/>
                        </BaseLayout>
                    }/>
                    <Route path="/profile" element={
                        <BaseLayout>
                            <RouteGuard component={Profile}/>
                        </BaseLayout>
                    }/>
                    <Route path="/article" element={
                        <BaseLayout>
                            <RouteGuard component={Articles}/>
                        </BaseLayout>
                    }/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default SiteRoutes;