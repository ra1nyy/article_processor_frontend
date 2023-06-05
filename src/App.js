import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';

import SiteRoutes from "./components/router/routes";
import {AuthContextProvider} from "./auth";


function App() {
    return (
        <div className="App">
            <AuthContextProvider>
                <SiteRoutes/>
            </AuthContextProvider>
        </div>
    );
}

export default App;
