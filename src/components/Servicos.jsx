import { useState, useEffect } from "react";
import servico1 from "../assets/images/servico1.png";
import servico2 from "../assets/images/servico2.png";
import servico3 from "../assets/images/servico3.png";

import "../styles/Servicos.css";

function Servicos() {
  const [index, setIndex] = useState(0);

  const images = [servico1, servico2, servico3];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="servicos" id="servicos">
      <div className="servicos-header">
        <span>CONHEÇA NOSSOS SERVIÇOS</span>
        <h2>Transformamos sua marca em resultados reais</h2>
        <p>Descubra soluções criativas e estratégicas para crescer seu negócio.</p>
      </div>

      <div className="servicos-wrapper">
        <div className="servicos-viewport">
          <div
            className="servicos-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div className="servicos-slide" key={i}>
                <img src={img} alt={`Serviço ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <button className="arrow left" onClick={prev}>‹</button>
        <button className="arrow right" onClick={next}>›</button>

        <div className="servicos-arrows-mobile">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>
    </section>
  );
}

export default Servicos;