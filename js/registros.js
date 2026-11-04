
/* ========================================
   DOCUMENTOS DO ACERVO
======================================== */

// Para adicionar um documento, basta copiar
// um dos objetos abaixo e alterar as informações.

const documentos = [

    {
        imagem: "assets/documentos/documento-01.jpg",
        nome: "Registro institucional"
    },

    {
        imagem: "assets/documentos/documento-02.jpg",
        nome: "Documento de fundação"
    },

    {
        imagem: "assets/documentos/documento-03.jpg",
        nome: "Registro de atividades"
    },

    {
        imagem: "assets/documentos/documento-04.jpg",
        nome: "Arquivo histórico"
    }

];


/* ========================================
   ELEMENTOS
======================================== */

const imagem = document.getElementById("documento-atual");
const contador = document.getElementById("contador");
const nome = document.getElementById("documento-nome");
const miniaturas = document.getElementById("miniaturas");

const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("imagem-ampliada");

let indiceAtual = 0;


/* ========================================
   EXIBIR DOCUMENTO
======================================== */

function mostrarDocumento(indice) {

    if (documentos.length === 0) return;

    indiceAtual = (indice + documentos.length) % documentos.length;

    const documento = documentos[indiceAtual];

    imagem.src = documento.imagem;
    imagem.alt = documento.nome;

    nome.textContent = documento.nome;

    contador.textContent =
        `${String(indiceAtual + 1).padStart(2, "0")} / ${String(documentos.length).padStart(2, "0")}`;

    atualizarMiniaturas();

}


/* ========================================
   MINIATURAS
======================================== */

function atualizarMiniaturas() {

    miniaturas.innerHTML = "";

    documentos.forEach((documento, indice) => {

        const miniatura = document.createElement("button");

        miniatura.className = "miniatura";

        if (indice === indiceAtual) {
            miniatura.classList.add("ativa");
        }

        const img = document.createElement("img");

        img.src = documento.imagem;
        img.alt = documento.nome;

        miniatura.appendChild(img);

        miniatura.addEventListener("click", () => {
            mostrarDocumento(indice);
        });

        miniaturas.appendChild(miniatura);

    });

}


/* ========================================
   NAVEGAÇÃO
======================================== */

document.getElementById("anterior").addEventListener("click", () => {
    mostrarDocumento(indiceAtual - 1);
});

document.getElementById("proximo").addEventListener("click", () => {
    mostrarDocumento(indiceAtual + 1);
});


/* ========================================
   LIGHTBOX
======================================== */

function abrirLightbox() {

    imagemAmpliada.src = documentos[indiceAtual].imagem;
    imagemAmpliada.alt = documentos[indiceAtual].nome;

    lightbox.classList.add("aberto");

}

function fecharLightbox() {
    lightbox.classList.remove("aberto");
}

imagem.addEventListener("click", abrirLightbox);

document.getElementById("fechar-lightbox")
    .addEventListener("click", fecharLightbox);

document.getElementById("lightbox-anterior")
    .addEventListener("click", () => {
        mostrarDocumento(indiceAtual - 1);
        abrirLightbox();
    });

document.getElementById("lightbox-proximo")
    .addEventListener("click", () => {
        mostrarDocumento(indiceAtual + 1);
        abrirLightbox();
    });

lightbox.addEventListener("click", (evento) => {
    if (evento.target === lightbox) {
        fecharLightbox();
    }
});

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {
        fecharLightbox();
    }

    if (evento.key === "ArrowLeft") {
        mostrarDocumento(indiceAtual - 1);
    }

    if (evento.key === "ArrowRight") {
        mostrarDocumento(indiceAtual + 1);
    }

});


/* ========================================
   INICIALIZAÇÃO
======================================== */

mostrarDocumento(0);
