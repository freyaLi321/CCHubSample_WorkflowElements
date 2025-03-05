import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import SimpleEditorBasic from "./samples/SimpleEditorBasic";
import HandyEditorBasic from "./samples/HandyEditorBasic";

function App() {

  return (
    <Router>
      <Header />
      <div className="body">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/SimpleEditorBasic" element={<SimpleEditorBasic />} />
          <Route path="/HandyEditorBasic" element={<HandyEditorBasic />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
