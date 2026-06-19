/* ============================================================
   VIDA ATIVA ALUGUÉIS — SCRIPT PRINCIPAL
   - Simulador de preços
   - Accordion FAQ
   - Menu mobile
   - Carousel do hero
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. NÚMERO DO WHATSAPP
     --------------------------------------------------------- */
  const WHATSAPP_NUMBER = "5500000000000";

  /* ---------------------------------------------------------
     2. DADOS DOS PRODUTOS
     --------------------------------------------------------- */
  const products = [
    {
      id: "muletas-axilares",
      name: "Muletas Axilares",
      prices: { 1: 10, 7: 35, 15: 55, 30: 80, 60: 130, 90: 170, 180: 280 }
    },
    {
      id: "muletas-canadenses",
      name: "Muletas Canadenses",
      prices: { 1: 12, 7: 40, 15: 65, 30: 95, 60: 150, 90: 195, 180: 320 }
    },
    {
      id: "cadeira-de-rodas",
      name: "Cadeira de Rodas",
      prices: { 1: 20, 7: 70, 15: 110, 30: 160, 60: 260, 90: 340, 180: 560 }
    },
    {
      id: "bota-ortopedica",
      name: "Bota Ortopédica",
      prices: { 1: 15, 7: 55, 15: 85, 30: 125, 60: 200, 90: 260, 180: 430 }
    },
    {
      id: "cadeira-de-banho",
      name: "Cadeira de Banho",
      prices: { 1: 12, 7: 45, 15: 70, 30: 100, 60: 165, 90: 215, 180: 350 }
    },
    {
      id: "andador",
      name: "Andador",
      prices: { 1: 12, 7: 42, 15: 65, 30: 95, 60: 155, 90: 200, 180: 330 }
    },
    {
      id: "sandalia-baruk",
      name: "Sandália Baruk",
      prices: { 1: 10, 7: 35, 15: 55, 30: 80, 60: 130, 90: 170, 180: 280 }
    },
    {
      id: "bengala-4-pontas",
      name: "Bengala 4 Pontas",
      prices: { 1: 8, 7: 28, 15: 45, 30: 65, 60: 105, 90: 135, 180: 225 }
    },
    {
      id: "bengala",
      name: "Bengala",
      prices: { 1: 6, 7: 22, 15: 35, 30: 50, 60: 80, 90: 105, 180: 175 }
    },
    {
      id: "imobilizador-de-joelho",
      name: "Imobilizador de Joelho",
      prices: { 1: 10, 7: 35, 15: 55, 30: 80, 60: 130, 90: 170, 180: 280 }
    },
    {
      id: "almofada-triangular",
      name: "Almofada Triangular",
      prices: { 1: 8, 7: 28, 15: 45, 30: 65, 60: 105, 90: 135, 180: 225 }
    },
    {
      id: "colete-jewett",
      name: "Colete Jewett",
      prices: { 1: 18, 7: 65, 15: 100, 30: 145, 60: 235, 90: 305, 180: 500 }
    }
  ];

  /* ---------------------------------------------------------
     3. FUNÇÕES AUXILIARES
     --------------------------------------------------------- */
  function formatBRL(value) {
    return "R$ " + value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function whatsappLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function calcPrice(priceTable, days) {
    const points = Object.keys(priceTable).map(Number).sort((a, b) => a - b);

    if (days <= points[0]) return priceTable[points[0]];

    const last = points[points.length - 1];
    if (days >= last) return priceTable[last];

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (days >= a && days <= b) {
        const ratio = (days - a) / (b - a);
        return priceTable[a] + (priceTable[b] - priceTable[a]) * ratio;
      }
    }

    return priceTable[points[0]];
  }

  /* ---------------------------------------------------------
     4. SIMULADOR DE PREÇOS
     --------------------------------------------------------- */
  const equipamentoSelect = document.getElementById("equipamento");
  const diasInput         = document.getElementById("dias");
  const diasLabel         = document.getElementById("diasLabel");
  const resultPrice       = document.getElementById("resultPrice");
  const resultSub         = document.getElementById("resultSub");
  const resultWhatsapp    = document.getElementById("resultWhatsapp");

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    equipamentoSelect.appendChild(option);
  });

  function updateSimulator() {
    const selectedProduct = products.find((p) => p.id === equipamentoSelect.value);
    const days = Number(diasInput.value);

    diasLabel.textContent = `${days} ${days === 1 ? "dia" : "dias"}`;

    const price = calcPrice(selectedProduct.prices, days);
    const formattedPrice = formatBRL(price);

    resultPrice.textContent = formattedPrice;
    resultSub.textContent = `para ${days} ${days === 1 ? "dia" : "dias"} de aluguel`;

    resultWhatsapp.href = whatsappLink(
      `Olá! Gostaria de solicitar o aluguel de: *${selectedProduct.name}* por *${days} ${days === 1 ? "dia" : "dias"}*. ` +
      `O simulador indicou ${formattedPrice}. Podem confirmar disponibilidade?`
    );
  }

  equipamentoSelect.addEventListener("change", updateSimulator);
  diasInput.addEventListener("input", updateSimulator);
  updateSimulator();

  /* ---------------------------------------------------------
     5. ACCORDION (FAQ)
     --------------------------------------------------------- */
  const accordionItems = document.querySelectorAll(".accordion__item");

  function setPanelHeight(item, isOpen) {
    const panel = item.querySelector(".accordion__panel");
    panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : 0;
  }

  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    setPanelHeight(item, item.classList.contains("is-open"));

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      accordionItems.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".accordion__trigger").setAttribute("aria-expanded", "false");
        setPanelHeight(other, false);
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        setPanelHeight(item, true);
      }
    });
  });

  window.addEventListener("resize", () => {
    accordionItems.forEach((item) => {
      if (item.classList.contains("is-open")) setPanelHeight(item, true);
    });
  });

  /* ---------------------------------------------------------
     6. MENU MOBILE
     --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const nav       = document.getElementById("nav");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     7. ANO ATUAL NO RODAPÉ
     --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     8. CAROUSEL DO HERO
     --------------------------------------------------------- */
  const slidesTrack  = document.querySelector(".hero__slides");
  const heroDots     = document.querySelectorAll(".hero__dot");
  const totalSlides  = document.querySelectorAll(".hero__slide").length;
  let currentSlide   = 0;
  let autoplayTimer  = null;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    slidesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    heroDots.forEach((d, i) => d.classList.toggle("is-active", i === currentSlide));
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  document.getElementById("carouselNext").addEventListener("click", () => {
    nextSlide();
    startAutoplay();
  });

  document.getElementById("carouselPrev").addEventListener("click", () => {
    prevSlide();
    startAutoplay();
  });

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(Number(dot.dataset.index));
      startAutoplay();
    });
  });

  const heroCarousel = document.getElementById("heroCarousel");
  heroCarousel.addEventListener("mouseenter", stopAutoplay);
  heroCarousel.addEventListener("mouseleave", startAutoplay);

  // Suporte a swipe mobile
  let touchStartX = 0;
  heroCarousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  heroCarousel.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? nextSlide() : prevSlide();
      startAutoplay();
    }
  }, { passive: true });

  startAutoplay();

});