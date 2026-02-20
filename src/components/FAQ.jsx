import { useEffect } from "react";
import "../styles/FAQ.css";

function FAQ() {
  const perguntas = [
    {
      pergunta: "Para quem é a assessoria?",
      resposta: "Empresas que desejam escalar com estrutura e previsibilidade."
    },
    {
      pergunta: "Quanto custa?",
      resposta: "O valor depende do diagnóstico inicial e das necessidades do negócio."
    },
    {
      pergunta: "Como funciona o método?",
      resposta: "Passamos pelo diagnóstico, planejamento, execução assistida e escala."
    },
    {
      pergunta: "Quais resultados posso esperar?",
      resposta: "Crescimento estruturado, previsível e consistente."
    }
  ];

  useEffect(() => {
    const items = document.querySelectorAll(".faq details");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-in");
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="faq-info">
          <h2>Perguntas Frequentes</h2>
          <p>Ficou com alguma dúvida sobre a Empresa? Talvez a resposta esteja aqui.</p>
        </div>


        <div className="faq-grid">
          {perguntas.map((item, index) => (
            <details key={index}>
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;