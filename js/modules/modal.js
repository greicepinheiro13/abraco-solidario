export function prepararModal(documento = document) {
    const modalModelo = document.querySelector("#modal-projeto")?.cloneNode(true);
    const modalOriginal = documento.querySelector("#modal-projeto") || modalModelo;
    if (!modalOriginal) return;

    const modalAtual = document.querySelector("#modal-projeto");
    if (modalOriginal === modalAtual) return;

    const modal = modalOriginal.cloneNode(true);
    modal.hidden = true;

    if (modalAtual) modalAtual.remove();
    document.body.appendChild(modal);
}

export function iniciarModal() {
    document.addEventListener("click", (evento) => {
        const botaoAbrir = evento.target.closest(".abrir-modal");
        const botaoFechar = evento.target.closest(".fechar-modal");
        const modal = document.querySelector("#modal-projeto");

        if (botaoAbrir && modal) {
            const titulo = modal.querySelector("#modal-titulo");
            const texto = modal.querySelector("#modal-texto");

            if (titulo) titulo.textContent = botaoAbrir.dataset.titulo || "";
            if (texto) texto.textContent = botaoAbrir.dataset.texto || "";

            modal.hidden = false;
            return;
        }

        if (botaoFechar && modal) {
            modal.hidden = true;
            return;
        }

        if (modal && evento.target === modal) modal.hidden = true;
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            const modal = document.querySelector("#modal-projeto");
            if (modal) modal.hidden = true;
        }
    });
}
