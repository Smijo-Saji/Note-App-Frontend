import { Container } from "react-bootstrap";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Container fluid>
        {" "}
        <Home />
      </Container>
    </div>
  );
}

export default App;
