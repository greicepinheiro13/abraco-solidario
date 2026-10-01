export function salvarFormulario(formulario) {
    const dados = {};

    Array.from(formulario.elements).forEach((campo) => {
        if (!campo.name || campo.type === "submit" || campo.type === "button") return;

        if (campo.type === "checkbox") {
            if (campo.name === "interesse") {
                if (!dados[campo.name]) dados[campo.name] = [];
                if (campo.checked) dados[campo.name].push(campo.value);
            } else {
                dados[campo.name] = campo.checked;
            }
            return;
        }

        dados[campo.name] = campo.value;
    });

    localStorage.setItem("cadastroVoluntario", JSON.stringify(dados));
}

export function restaurarFormulario(app = document) {
    const formulario = app.querySelector("form");
    if (!formulario) return;

    const dadosSalvos = localStorage.getItem("cadastroVoluntario");
    if (!dadosSalvos) return;

    try {
        const dados = JSON.parse(dadosSalvos);

        Array.from(formulario.elements).forEach((campo) => {
            if (!campo.name || !(campo.name in dados)) return;

            if (campo.type === "checkbox") {
                if (campo.name === "interesse") {
                    campo.checked = Array.isArray(dados[campo.name]) &&
                        dados[campo.name].includes(campo.value);
                } else {
                    campo.checked = dados[campo.name] === true;
                }
                return;
            }

            campo.value = dados[campo.name];
        });
    } catch (erro) {
        console.error("Não foi possível recuperar os dados do formulário.", erro);
    }
}

export function iniciarFormulario() {
    document.addEventListener("submit", (evento) => {
        const formulario = evento.target;
        if (formulario.tagName !== "FORM") return;

        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        salvarFormulario(formulario);

        const alerta = document.querySelector("#alerta-sucesso");
        if (alerta) {
            alerta.hidden = false;
            alerta.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        formulario.reset();
    });
}
