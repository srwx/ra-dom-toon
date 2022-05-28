import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Nav from "components/Nav";
import Body from "components/Body";
import CampaignDetail from "components/CampaignDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path=":address" element={<CampaignDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
