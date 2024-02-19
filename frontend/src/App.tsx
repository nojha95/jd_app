import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import CVMatch from "./pages/CVMatch/CVMatch";
import AiSearch from "./pages/aisearch/AiSearch";
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CVMatch />} />
          <Route path="aisearch" element={<AiSearch />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
