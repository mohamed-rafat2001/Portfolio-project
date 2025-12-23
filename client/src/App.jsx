import { RouterProvider } from "react-router-dom";
import router from "./routing/router";

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
