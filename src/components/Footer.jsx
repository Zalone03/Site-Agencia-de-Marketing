import "../styles/Footer.css";
import logo from "../assets/images/logoc.webp";
import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiHome,
  FiLayers,
  FiGrid,
  FiSend
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

function Footer() {

  const handleLinkClick = (e) => {
    e.preventDefault();

    const targetId = e.currentTarget
      .getAttribute("href")
      .replace("#", "");

    const target = document.getElementById(targetId);
    if (!target) return;

    const headerOffset = 90; 
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <footer className="aw-footer">

      <div className="noise-layer"></div>
      <div className="light-sweep"></div>

      <div className="footer-grid">

        <div className="footer-brand">
          <img src={logo} alt="Empresa" />
          <p>
            Criamos experiências digitais que não pedem atenção. Elas dominam.
          </p>
        </div>

        <div className="footer-column">
          <span className="footer-label">Contato</span>

          <a
            href="https://wa.me/554792296551"
            target="_blank" aria-label="WhatsApp"
          >
            <FaWhatsapp /> WhatsApp <FiArrowUpRight />
          </a>

          <a href="mailto:guilhermevinidesouza@gmail.com">
            <FiMail /> Email <FiArrowUpRight />
          </a>

          <div className="footer-muted">
            <FiMapPin />
            <span>
              Avenida Prefeito Frederico Heyse,<br />
              R. Gov. Jorge Lacerda, 1134<br />
              SC — Brasil
            </span>
          </div>
        </div>

        <div className="footer-column">
          <span className="footer-label">Navegação</span>

          <a href="#hero" onClick={handleLinkClick}>
            <FiHome /> Home
          </a>

          <a href="#metodo" onClick={handleLinkClick}>
            <FiLayers /> Método
          </a>

          <a href="#servicos" onClick={handleLinkClick}>
            <FiGrid /> Serviços
          </a>

          <a href="#formulario" onClick={handleLinkClick}>
            <FiSend /> Contato
          </a>
        </div>

        <div className="footer-column footer-social">
          <span className="footer-label">Social</span>

          <a
            href="https://www.instagram.com/"
            target="_blank"
          >
            <FaInstagram /> Instagram <FiArrowUpRight />
          </a>

          <a href="https://www.linkedin.com/company/" target="_blank">
            <FaLinkedinIn /> LinkedIn <FiArrowUpRight />
          </a>

        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2025 Guilherme Vinícius de Souza</span>
        <span>CNPJ 00.000.000/0000-00</span>
      </div>

    </footer>
  );
}

export default Footer;