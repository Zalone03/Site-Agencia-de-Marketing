import { useEffect, useRef } from "react";
import "../styles/Metodo.css";
import logo from "../assets/images/logo.webp";

function Metodo() {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);
  const rafId = useRef(null);

useEffect(() => {
const isMobile = window.innerWidth < 900;

const intensity = isMobile ? 1.15 : 1;
const lerpFactor = isMobile ? 0.085 : 0.07;
const rotation = isMobile ? 18 : 14;

  const updatePosition = (x, y) => {
    mouse.current.x = (x / window.innerWidth - 0.5) * 2 * intensity;
    mouse.current.y = (y / window.innerHeight - 0.5) * 2 * intensity;
  };

  const onMouseMove = (e) => {
    updatePosition(e.clientX, e.clientY);
  };

  const onTouchMove = (e) => {
    
    if (!e.touches[0]) return;
      updatePosition(
       e.touches[0].clientX * 1.5,
       e.touches[0].clientY * 1.5
    );
  };

  const animate = () => {
    if (!isVisible.current) return;

    smooth.current.x += (mouse.current.x - smooth.current.x) * lerpFactor;
    smooth.current.y += (mouse.current.y - smooth.current.y) * lerpFactor;

    if (globeRef.current) {
      globeRef.current.style.transform = `
        rotateX(${smooth.current.y * -rotation}deg)
        rotateY(${smooth.current.x * rotation}deg)
      `;
    }

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      const depth = i % 2 === 0 ? 1 : -1;
      dot.style.translate = `
        ${smooth.current.x * 6 * depth}px
        ${smooth.current.y * 6 * depth}px
      `;
    });

    rafId.current = requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.current = entry.isIntersecting;

      if (entry.isIntersecting) {
        containerRef.current.classList.add("visible");
        animate();
      } else {
        cancelAnimationFrame(rafId.current);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(containerRef.current);

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  return () => {
    observer.disconnect();
    cancelAnimationFrame(rafId.current);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
  };
}, []);



  const cards = [
    {
      step: "01",
      title: "Diagnóstico Estratégico",
      desc: "Auditamos sua conta e mercado para identificar gargalos e oportunidades escondidas.",
    },
    {
      step: "02",
      title: "Planejamento Direcionado",
      desc: "Desenhamos o funil de vendas e a estratégia de criativos focada em conversão.",
    },
    {
      step: "03",
      title: "Execução & Otimização",
      desc: "Lançamos as campanhas e realizamos otimizações diárias baseadas em dados reais.",
    },
    {
      step: "04",
      title: "Escala e Consolidação",
      desc: "Após validar o ROI, aumentamos o investimento para maximizar o lucro líquido.",
      destaque: true,
    },
  ];

  return (
    <section className="metodo" id="metodo">
      <div className="metodo-container">
        <div className="metodo-top">
          <div className="metodo-header">
            <span className="metodo-eyebrow">NOSSO PROCESSO</span>
            <h2>O Método da empresa de Crescimento</h2>
            <p>
              Um método validado para estruturar, organizar e escalar empresas
              com previsibilidade e controle.
            </p>
          </div>

          <div className="metodo-image" ref={containerRef}>
            <div className="globe-wrapper">
              <div className="globe" ref={globeRef}>
                <div className="globe-center">
                  <img src={logo} alt="Empresa" />
                </div>

                {Array.from({ length: 160 }).map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => (dotsRef.current[i] = el)}
                    className="globe-dot"
                    style={{
                      transform: `
                        rotateY(${Math.random() * 360}deg)
                        rotateX(${Math.random() * 180 - 90}deg)
                        translateZ(120px)
                      `,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="metodo-cards">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`metodo-card ${c.destaque ? "destaque" : ""}`}
            >
              <span className="metodo-step">{c.step}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Metodo;
