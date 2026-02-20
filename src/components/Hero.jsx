import { useEffect, useRef } from "react";
import "../styles/Hero.css";

import bg from "../assets/images/background.webp";
import shape1 from "../assets/images/shape1.webp";
import shape2 from "../assets/images/shape2.webp";

function Hero() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const isMobile = window.innerWidth < 900;

    // 🔒 Mobile = estático
    if (isMobile) {
      scene.style.setProperty("--mx", 0);
      scene.style.setProperty("--my", 0);
      return;
    }

    const move = (x, y) => {
      const cx = (x / window.innerWidth - 0.5) * 2;
      const cy = (y / window.innerHeight - 0.5) * 2;

      scene.style.setProperty("--mx", cx);
      scene.style.setProperty("--my", cy);
    };

    const onMouse = (e) => move(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMouse);

    return () => {
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-scene" ref={sceneRef} id="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <img src={shape1} className="shape s1" alt="" />
      <img src={shape2} className="shape s2" alt="" />

      <div className="hero-content">
        <h2>Transformamos marcas em referências digitais</h2>

        <h1>
          EM <em>presa.</em>
        </h1>

        <p>
          Estratégia, design e marketing focados em crescimento,
          autoridade e posicionamento premium.
        </p>

        <div className="hero-actions">
          <button
            className="btn-main"
            onClick={() => handleScroll("#formulario")}
          >
            Falar com especialista
          </button>
          <button
            className="btn-ghost"
            onClick={() => handleScroll("#servicos")}
          >
            Conheça nossos serviços
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
