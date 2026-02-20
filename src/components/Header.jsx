import { useState, useEffect } from "react";
import "../styles/Header.css";
import logo from "../assets/images/logoc.webp";
import { FaWhatsapp } from "react-icons/fa";


function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleLinkClick = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
            <div className="header-inner">
                <img src={logo} alt="Empresa" className="logo" />

                <nav className="menu">
                    <div className="menu-links">
                        <a href="#hero" onClick={handleLinkClick}>Home</a>
                        <a href="#metodo" onClick={handleLinkClick}>Método</a>
                        <a href="#servicos" onClick={handleLinkClick}>Serviços</a>
                        <a href="#faq" onClick={handleLinkClick}>FAQ</a>
                    </div>
                    <a href="#formulario" className="btn" onClick={handleLinkClick}>Contato</a>
                </nav>
            </div>
            <a
                href="https://wa.me/554792296551"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float"
                aria-label="Falar com especialista no WhatsApp"
            >
                <FaWhatsapp />
            </a>

        </header>
    );
}

export default Header;