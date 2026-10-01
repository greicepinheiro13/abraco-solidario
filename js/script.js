import { projetos } from "./modules/dados-projetos.js";
import { prepararModal, iniciarModal } from "./modules/modal.js";
import { iniciarMascaras } from "./modules/mascaras.js";
import { restaurarFormulario, iniciarFormulario } from "./modules/formulario.js";
import { iniciarNavegacao } from "./modules/navegacao.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector("#app");

    if (!app) {
        console.error("Elemento #app não encontrado no HTML.");
        return;
    }

    const conteudoInicio = app.innerHTML;

    function renderizarProjetos() {
        const lista = app.querySelector("#lista-projetos");
        const template = app.querySelector("#template-projeto");

        if (!lista || !template) {
            console.error("Lista ou template de projetos não encontrado.");
            return;
        }

        lista.querySelectorAll(".projeto-card").forEach((card) => card.remove());

        projetos.forEach((projeto) => {
            const clone = template.content.cloneNode(true);
            const imagem = clone.querySelector("img");

            imagem.src = projeto.imagem;
            imagem.alt = projeto.alt;
            clone.querySelector(".icone").textContent = projeto.icone;
            clone.querySelector(".projeto-titulo").textContent = projeto.titulo;
            clone.querySelector(".projeto-descricao").textContent = projeto.descricao;

            const botao = clone.querySelector(".abrir-modal");
            botao.dataset.titulo = projeto.titulo;
            botao.dataset.texto = projeto.descricao;

            lista.appendChild(clone);
        });
    }

    iniciarModal();
    iniciarMascaras();
    iniciarFormulario();
    prepararModal();

    iniciarNavegacao({
        app,
        conteudoInicio,
        prepararModal,
        renderizarProjetos,
        restaurarFormulario: () => restaurarFormulario(app)
    });
});
