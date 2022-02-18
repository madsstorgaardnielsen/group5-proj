import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">Forside</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/medlemmer">Medlemmer</Nav.Link>
            <Nav.Link href="/betaling">Betaling</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>

            <Nav.Link href="/traeninger">Træninger</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
