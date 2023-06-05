import {Fragment} from "react";
import {Header} from "../navbar/navbar";

export const BaseLayout = ({children}) => {
    return <Fragment>
        <Header/>
        <main>
            {children}
        </main>
    </Fragment>
}