import { RouterProvider } from "react-router-dom";
import { indexRouter } from "./routes/IndexRouter";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <RouterProvider router={indexRouter} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
