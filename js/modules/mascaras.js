export function iniciarMascaras() {
    document.addEventListener("input", (evento) => {
        const campo = evento.target;
        if (!["cpf", "telefone", "cep"].includes(campo.id)) return;

        let valor = campo.value.replace(/\D/g, "");

        if (campo.id === "cpf") {
            valor = valor.slice(0, 11);
            valor = valor
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            campo.value = valor;
        }

        if (campo.id === "telefone") {
            valor = valor.slice(0, 11);
            valor = valor
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
            campo.value = valor;
        }

        if (campo.id === "cep") {
            valor = valor.slice(0, 8);
            campo.value = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }
    });
}
