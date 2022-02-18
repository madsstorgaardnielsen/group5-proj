import { Route, Routes } from "react-router-dom";
import Navigation from "./navbar/Navigation";
import Forside from "./pages/forside";
import Medlemmer from "./pages/medlemmer";
import Betaling from "./pages/betaling";
import Events from "./pages/events";
import Traening from "./pages/traening";
function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/medlemmer" element={<Medlemmer />} />
        <Route path="/betaling" element={<Betaling />} />
        <Route path="/events" element={<Events />} />
        <Route path="/traeninger" element={<Traening />} />

      </Routes>
    </div>
  );
}

export default App;
