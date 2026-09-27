/* =========================================================
   WATCH ME
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   SAÍDA RÁPIDA
========================================================= */

const quickExit = document.getElementById("quickExit");

if (quickExit) {
  quickExit.addEventListener("click", function () {
    window.location.replace("https://www.google.com/");
  });
}


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {

  menuButton.addEventListener("click", function () {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu"
        : "Abrir menu"
    );

  });


  /* Fecha o menu quando um link é selecionado */

  mainNav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      mainNav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Abrir menu"
      );

    });

  });

}


/* =========================================================
   FLUXO "DO QUE VOCÊ PRECISA?"
========================================================= */

const needCards = document.querySelectorAll(".need-card");
const guidanceBox = document.getElementById("guidanceBox");


const guidanceData = {

  danger: {
    label: "PERIGO IMEDIATO",
    title: "Se você está em perigo agora",
    text:
      "Em uma situação de emergência ou violência acontecendo neste momento, procure um local seguro e acione o serviço de emergência.",
    actions: [
      {
        text: "Ligar para 190",
        href: "tel:190"
      },
      {
        text: "Ligue 180",
        href: "tel:180",
        secondary: true
      }
    ]
  },


  orientation: {
    label: "ORIENTAÇÃO",
    title: "Você pode buscar informação e apoio",
    text:
      "O Ligue 180 oferece orientação, informações sobre direitos e encaminhamento para serviços da rede de atendimento.",
    actions: [
      {
        text: "Ligar 180",
        href: "tel:180"
      },
      {
        text: "Ver rede de apoio",
        href: "#rede",
        secondary: true
      }
    ]
  },


  bo: {
    label: "BOLETIM DE OCORRÊNCIA",
    title: "Você pode registrar a ocorrência",
    text:
      "O boletim de ocorrência formaliza a comunicação de um fato à Polícia Civil. Se for seguro, reúna as informações necessárias e utilize o canal oficial.",
    actions: [
      {
        text: "Abrir Delegacia Eletrônica ↗",
        href: "https://www.delegaciaeletronica.ce.gov.br/",
        external: true
      },
      {
        text: "Ver orientações",
        href: "#bo",
        secondary: true
      }
    ]
  },


  protection: {
    label: "PROTEÇÃO",
    title: "Existem caminhos para pedir proteção",
    text:
      "A medida protetiva é uma decisão judicial destinada a proteger mulheres em situação de risco ou violência. A solicitação pode ser orientada pelos canais oficiais.",
    actions: [
      {
        text: "Solicitar orientação ↗",
        href: "https://mulher.policiacivil.ce.gov.br/",
        external: true
      },
      {
        text: "Ver proteção",
        href: "#protecao",
        secondary: true
      }
    ]
  }

};


function showGuidance(target) {

  if (!guidanceBox || !guidanceData[target]) {
    return;
  }


  const data = guidanceData[target];


  const actionsHTML = data.actions
    .map(function (action) {

      const targetAttr = action.external
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      const secondaryClass = action.secondary
        ? "secondary"
        : "";

      return `
        <a
          href="${action.href}"
          class="${secondaryClass}"
          ${targetAttr}
        >
          ${action.text}
        </a>
      `;

    })
    .join("");


  guidanceBox.innerHTML = `
    <div class="guidance-content">

      <span class="guidance-label">
        ${data.label}
      </span>

      <h3>
        ${data.title}
      </h3>

      <p>
        ${data.text}
      </p>

      <div class="guidance-actions">
        ${actionsHTML}
      </div>

    </div>
  `;


  needCards.forEach(function (card) {

    card.classList.toggle(
      "active",
      card.dataset.target === target
    );

  });

}


needCards.forEach(function (card) {

  card.addEventListener("click", function () {

    showGuidance(
      card.dataset.target
    );

  });

});


/* =========================================================
   FAQ
========================================================= */

const faqQuestions = document.querySelectorAll(
  ".faq-question"
);


faqQuestions.forEach(function (question) {

  question.addEventListener("click", function () {

    const item = question.closest(".faq-item");

    if (!item) {
      return;
    }


    const isOpen =
      item.classList.contains("open");


    /* Fecha todos */

    document
      .querySelectorAll(".faq-item.open")
      .forEach(function (openItem) {

        openItem.classList.remove("open");

        const openButton =
          openItem.querySelector(".faq-question");

        if (openButton) {
          openButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });


    /* Abre o selecionado */

    if (!isOpen) {

      item.classList.add("open");

      question.setAttribute(
        "aria-expanded",
        "true"
      );

    }

  });

});


/* =========================================================
   VOLTAR AO TOPO
========================================================= */

const backTop = document.getElementById("backTop");


if (backTop) {

  window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

      backTop.classList.add("visible");

    } else {

      backTop.classList.remove("visible");

    }

  });


  backTop.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}