import { RouterProvider } from "react-router-dom";
import router from "./router";
const App = () => {
  return (
    <main>
      <h1>Todos</h1>
      <RouterProvider router={router} />
    </main>
  );
};
export default App;