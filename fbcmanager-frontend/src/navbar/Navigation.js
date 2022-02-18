import { Navbar, Nav, Container } from "react-bootstrap";
import "./navigation.css";

function handleSelect(selectedKey) {
  // alert(`selected ${selectedKey}`);
  //this.setState({ activeKey: selectedKey });
}

function f(e) {
  e.preventDefault();

}

const Navigation = () => {
  return (
    <>
      <Container>
        <Navbar bg="dark" variant="dark" fixed="top">
          {/* <Navbar.Brand href="/">Forside</Navbar.Brand> */}
          <Nav variant="pills" defaultActiveKey={0} onSelect={handleSelect}>
            <Nav.Link eventKey={0} href="/" onSelect={handleSelect} onClick={f}>
              Forside
            </Nav.Link>

            <Nav.Link eventKey={1} href="/medlemmer" onSelect={handleSelect} onClick={f}>
              Medlemmer
            </Nav.Link>

            <Nav.Link eventKey={2} href="/betaling">
              Betaling
            </Nav.Link>

            <Nav.Link eventKey={3} href="/events">
              Events
            </Nav.Link>

            <Nav.Link eventKey={4} href="/traeninger">
              Træninger
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

// onSelect={(selectedKey) => alert(`You just selected ${selectedKey} !`)}

export default Navigation;
