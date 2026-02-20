import { useEffect, useRef, useState } from "react";
import "../styles/Formulario.css";

function Formulario() {
  const formRef = useRef();
  const sendingRef = useRef(false);
  const infoRef = useRef();
  const [formHeight, setFormHeight] = useState("auto");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adjustHeight = () => {
      if (infoRef.current) {
        setFormHeight(infoRef.current.offsetHeight + "px");
      }
    };
    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  useEffect(() => {
    const faders = document.querySelectorAll(".fade-on-scroll");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    faders.forEach(el => observer.observe(el));
  }, []);

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)$/, "($1");
    }

    setTelefone(value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (sendingRef.current || loading || enviado) return;

  if (localStorage.getItem("formEnviado")) {
    alert("Você já enviou este formulário.");
    return;
  }

  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!regex.test(telefone)) {
    alert("Digite um telefone válido, ex: (11) 91234-5678");
    return;
  }

  sendingRef.current = true;
  setLoading(true);

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const formData = new FormData(e.target);

    const response = await fetch("https://formspree.io/f/SEU_ENDPOINT", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Erro ao enviar");
    }

    localStorage.setItem("formEnviado", "true");

    setEnviado(true);
    e.target.reset();
    setTelefone("");

  } catch (error) {


    if (error.name === "AbortError") {
      alert("A requisição demorou muito. Tente novamente.");
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }

  } finally {
    clearTimeout(timeout);
    setLoading(false);
    sendingRef.current = false;
  }
};

  return (
    <section className="landing-form">
      <div className="form-container">

        <div className="form-info fade-on-scroll" ref={infoRef}>
          <span className="small-text">AVISO</span>
          <h2>Complete o formulário</h2>
          <p>Forneça suas informações no formulário ao lado. Garantimos a segurança total de seus dados. Serão usados apenas para contato comercial.</p>

          <div className="process-cards">
            <div className="process-card fade-on-scroll">
              <span className="process-step">1</span>
              <h3>Complete o formulário</h3>
              <p>Forneça suas informações no formulário ao lado. Garantimos a segurança total de seus dados. Serão usados apenas para contato comercial.</p>
            </div>
            <div className="process-card fade-on-scroll">
              <span className="process-step">2</span>
              <h3>Receba uma ligação personalizada</h3>
              <p>Em um prazo de tempo em horário comercial, um dos nossos especialistas entrará em contato diretamente para agendar uma reunião.</p>
            </div>
          </div>
        </div>

        <div className="form-wrapper fade-on-scroll" style={{ height: formHeight }} id="formulario">

          {!enviado ? (
            <>
              <form className="form-box" onSubmit={handleSubmit} ref={formRef}>

                <div className="form-field">
                  <label htmlFor="nome">Nome completo</label>
                  <input id="nome" type="text" name="nome" placeholder="Nome completo" autoComplete="name" required />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" placeholder="Email" autoComplete="email" required />
                </div>

                <div className="form-field">
                  <label htmlFor="telefone">Telefone com DDD</label>
                  <input
                    id="telefone"
                    type="tel"
                    name="telefone"
                    placeholder="Telefone com DDD"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={telefone}
                    onChange={handleTelefoneChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="segmento">Qual o segmento da sua empresa?</label>
                  <select id="segmento" name="segmento" defaultValue="" required>
                    <option value="" disabled>Selecione</option>

                    <option value="estetica">Estética</option>
                    <option value="imobiliarioconstrutora">Imobiliário / Construtoras</option>
                    <option value="franquias">Franquias</option>
                    <option value="clinica">Clínica</option>
                    <option value="contabilidade">Contabilidade</option>
                    <option value="alimenticio">Restaurante ou Lanchonete</option>
                    <option value="mercado">Mercado</option>
                    <option value="posto">Posto de Gasolina</option>
                    <option value="comercio">Comércio</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="faturamento">Faturamento mensal</label>
                  <select id="faturamento" name="faturamento" defaultValue="" required>
                    <option value="" disabled>Selecione</option>
                    <option value="ate-50mil">Até R$50 mil</option>
                    <option value="50-100mil">R$50 mil a R$100 mil</option>
                    <option value="100-250mil">R$100 mil a R$250 mil</option>
                    <option value="250-500mil">R$250 mil a R$500 mil</option>
                    <option value="500-1m">R$500 mil a R$1 milhão</option>
                    <option value="1m+">Acima de R$1 milhão</option>
                  </select>
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Quero crescer meu negócio"}
                </button>

              </form>

              <a href="https://wa.me/5599999999999" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                Falar via WhatsApp
              </a>
            </>
          ) : (
            <div className="form-success">
              <h2>Formulário enviado com sucesso 🚀</h2>
              <p>Nosso time entrará em contato em breve.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default Formulario;
