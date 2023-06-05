import {Container, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../auth";
import {useContext} from "react";

export const Header = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    return <Navbar bg="dark" variant="dark" expand="md">
        <Container>
            <Link to={'/'}><Navbar.Brand>ArticleProcessor</Navbar.Brand></Link>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <NavItem><Link to={'/article'} >Статьи</Link></NavItem>
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title={user ? `${user.last_name} ${user.first_name} ${user.surname}` : null}>
                        <NavDropdown.Item onClick={() => navigate('/profile')}>
                            Профиль
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Выход
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}