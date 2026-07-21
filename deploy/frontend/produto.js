import API from "./app.js";

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

let idEdicao = null;

listarProdutos();

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const produto = {

        nome: document.getElementById("nome").value,
        preco: document.getElementById("preco").value,
        quantidade: document.getElementById("quantidade").value

    };

    if(idEdicao == null){

        await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(produto)

        });

    }else{

        await fetch(API + "/" + idEdicao,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(produto)

        });

        idEdicao = null;

    }

    form.reset();

    listarProdutos();

});

async function listarProdutos(){

    const resposta = await fetch(API);

    const produtos = await resposta.json();

    lista.innerHTML="";

    produtos.forEach(produto=>{

        lista.innerHTML += `

        <tr>

            <td>${produto.id}</td>

            <td>${produto.nome}</td>

            <td>${produto.preco}</td>

            <td>${produto.quantidade}</td>

            <td>

                <button
                    class="editar"
                    onclick="editar(${produto.id},
                    '${produto.nome}',
                    ${produto.preco},
                    ${produto.quantidade})">

                    Editar

                </button>

                <button
                    class="excluir"
                    onclick="excluir(${produto.id})">

                    Excluir

                </button>

            </td>

        </tr>

        `;

    });

}

window.editar = function(id,nome,preco,quantidade){

    idEdicao = id;

    document.getElementById("nome").value = nome;
    document.getElementById("preco").value = preco;
    document.getElementById("quantidade").value = quantidade;

}

window.excluir = async function(id){

    if(confirm("Deseja excluir o produto?")){

        await fetch(API+"/"+id,{

            method:"DELETE"

        });

        listarProdutos();

    }

}