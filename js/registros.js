
const documentos = [
    {
        imagem: "assets/documentos/doc-convite.png",
        nome: "Convite."
    },
    {
        imagem: "assets/documentos/doc-reza-anti-demonio.png",
        nome: "Proteção contra o mal."
    }
];

let atual = 0;
let animando = false;

const anterior = document.getElementById("doc-anterior");
const central = document.getElementById("doc-atual");
const proximo = document.getElementById("doc-proximo");

const contador = document.getElementById("contador");
const nome = document.getElementById("nome-documento");

function indiceCircular(indice) {
    return (indice + documentos.length) % documentos.length;
}

function preencher(elemento, indice) {
    const documento = documentos[indice];

    elemento.replaceChildren();

    const imagem = document.createElement("img");
    imagem.src = documento.imagem;
    imagem.alt = documento.nome;

    elemento.appendChild(imagem);
}


function atualizar() {
    const total = documentos.length;

    preencher(central, atual);

    if (total > 1) {
        preencher(anterior, indiceCircular(atual - 1));
        preencher(proximo, indiceCircular(atual + 1));

        anterior.style.display = "";
        proximo.style.display = "";

        document.getElementById("anterior").style.display = "";
        document.getElementById("proximo").style.display = "";
    } else {
        anterior.replaceChildren();
        proximo.replaceChildren();

        anterior.style.display = "none";
        proximo.style.display = "none";

        document.getElementById("anterior").style.display = "none";
        document.getElementById("proximo").style.display = "none";
    }

    contador.textContent =
        `${String(atual + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

    nome.textContent = documentos[atual].nome;
}


function navegar(direcao) {
    if (animando || documentos.length < 2) return;

    animando = true;

    const saindo = direcao === 1 ? anterior : proximo;
    const entrando = direcao === 1 ? proximo : anterior;

    // Anima os documentos para suas novas posições
    anterior.style.transition = "transform .45s ease, opacity .45s ease";
    central.style.transition = "transform .45s ease, opacity .45s ease";
    proximo.style.transition = "transform .45s ease, opacity .45s ease";

    anterior.style.transform = direcao === 1
        ? "translate(calc(-50% - 500px), -50%)"
        : "translate(calc(-50% - 260px), -50%)";

    proximo.style.transform = direcao === 1
        ? "translate(calc(-50% + 260px), -50%)"
        : "translate(calc(-50% + 500px), -50%)";

    central.style.opacity = ".4";

    setTimeout(() => {
        atual = indiceCircular(atual + direcao);

        // Remove as transições antes de reorganizar os documentos
        [anterior, central, proximo].forEach(elemento => {
            elemento.style.transition = "none";
            elemento.style.transform = "";
            elemento.style.opacity = "";
        });

        atualizar();

        // Força a atualização visual antes de reativar as transições
        void central.offsetWidth;

        [anterior, central, proximo].forEach(elemento => {
            elemento.style.transition = "";
        });

        animando = false;
    }, 450);
}

document.getElementById("anterior").addEventListener("click", () => navegar(-1));
document.getElementById("proximo").addEventListener("click", () => navegar(1));

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") navegar(-1);
    if (event.key === "ArrowRight") navegar(1);
});

atualizar();
