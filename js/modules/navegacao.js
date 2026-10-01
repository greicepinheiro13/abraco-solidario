export function identificarPagina() {
    const caminho = window.location.pathname.toLowerCase();

    if (caminho.includes("projetos")) return "projetos";
    if (caminho.includes("cadastro")) return "cadastro";

    return "inicio";
}

export function iniciarNavegacao({
    app,
    conteudoInicio,
    prepararModal,
    renderizarProjetos,
    restaurarFormulario
}) {
    async function navegar(pagina, atualizarHistorico = true) {
        let arquivo = "";
        let titulo = "Abraço Solidário";

        if (pagina === "projetos") {
            arquivo = "projetos.html";
            titulo = "Projetos | Abraço Solidário";
        } else if (pagina === "cadastro") {
            arquivo = "cadastro.html";
            titulo = "Cadastro | Abraço Solidário";
        } else {
            pagina = "inicio";
        }

        if (pagina === "inicio") {
            app.innerHTML = conteudoInicio;
            prepararModal();
        } else {
            try {
                const resposta = await fetch(arquivo);
                if (!resposta.ok) throw new Error("Erro ao carregar a página.");

                const html = await resposta.text();
                const documento = new DOMParser().parseFromString(html, "text/html");
                const conteudo = documento.querySelector("main");

                if (!conteudo) throw new Error("Elemento main não encontrado.");

                app.innerHTML = conteudo.innerHTML;
                prepararModal(documento);

                if (pagina === "projetos") renderizarProjetos();
                if (pagina === "cadastro") restaurarFormulario();
            } catch (erro) {
                console.error(erro);
                app.innerHTML = `
                    <section class="secao">
                        <div class="conteudo">
                            <h1>Não foi possível carregar a página.</h1>
                            <p>Confira se o Live Server está funcionando.</p>
                        </div>
                    </section>
                `;
            }
        }

        document.title = titulo;

        if (atualizarHistorico) {
            const caminhos = {
                inicio: "index.html",
                projetos: "projetos.html",
                cadastro: "cadastro.html"
            };
            history.pushState({ pagina }, "", caminhos[pagina]);
        }

        const menu = document.querySelector("#menu-toggle");
        if (menu) menu.checked = false;

        window.scrollTo(0, 0);
    }

    document.addEventListener("click", (evento) => {
        const link = evento.target.closest("a");
        if (!link) return;

        const destino = link.getAttribute("href");
        if (!destino) return;

        const rotas = {
            "index.html": "inicio",
            "projetos.html": "projetos",
            "cadastro.html": "cadastro"
        };

        const pagina = rotas[destino.toLowerCase()];
        if (pagina) {
            evento.preventDefault();
            navegar(pagina);
        }
    });

    window.addEventListener("popstate", (evento) => {
        const pagina = evento.state?.pagina || identificarPagina();
        navegar(pagina, false);
    });

    const paginaInicial = identificarPagina();
    if (paginaInicial !== "inicio") navegar(paginaInicial, false);
}
