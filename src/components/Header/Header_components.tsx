import React from 'react'
import { Button, Container, Nav, NavDropdown, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import logo from '../../components/Header/shopify.png';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { IoIosPerson } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi'
import { Padding } from '@mui/icons-material';
import { useAppSelector } from '../../hooks';
import CartIcon from '../../modules/@CartModule/CartIcon/CartIcon';





const Header = (props: any) => {
    const token = sessionStorage.getItem("token");
    const { isUserLoggedIn } = useAppSelector(state => state.userData);

    const navigate = useNavigate();

    const signOutAction = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                <ul className="popover-ul">
                <li key="1"><Link className="popover-link" to="/">My Profile</Link></li>
                <li key="2"><Link className="popover-link" to="/">My Orders</Link></li>
                <li key="3"><a className="popover-link" onClick={() =>{signOutAction()}}>Sign out</a></li>
                </ul>
            </Popover.Body>
        </Popover>
    );


    return (
        <div>
            <Navbar style={{ backgroundColor: "rgb(255 255 255)", padding: "0", boxShadow: "2px 2px 3px lightgreen", }} expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="eshop"
                        />

                        <span className="logoName">Shop</span><span style={{ color: "green", fontSize: "30px", fontWeight: "900", position: "relative", bottom: "10px" }}>&infin;</span>
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/">Home</Link>
                            <NavDropdown title="Category" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/products/smartphones">Mobiles</Link>
                                <Link className='dropdown-item' to="/products/laptops">Laptops</Link>
                                <Link className='dropdown-item' to="/products/fashion">Fashion</Link>
                                <Link className='dropdown-item' to="/products/skincare">Cosmetics</Link>
                                <Link className='dropdown-item' to="/products/footware">Footware</Link>
                                <Link className='dropdown-item' to="/products/kids">Kids</Link>
                            </NavDropdown>
                            <Link to="/blog">Blog</Link>
                            <Link to="/aboutus">About Us</Link>
                        </Nav>
                        <Nav>
                            {
                                token || isUserLoggedIn ?
                                    (
                                        <>
                                            <OverlayTrigger
                                                trigger="click"
                                                key="bottom"
                                                placement="bottom"
                                                overlay={popover}
                                            >
                                                <Button variant="secondary" id = "user-icon-btn">
                                                    <span style={{ display: "flex", flexDirection: "column", padding: "5px 25px 0 0" }}>
                                                        <IoIosPerson className="user-icon"></IoIosPerson>
                                                        <span style={{ fontSize: "smaller" }}>profile</span>
                                                    </span>
                                                </Button>
                                            </OverlayTrigger>


                                           <CartIcon />
                                        </>

                                    ) :


                                    (
                                        <>
                                            <Link to='/sign-In'>Sign-In</Link>
                                            <Link to='/sign-Up'>Sign-Up</Link>
                                        </>
                                    )
                            }

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
