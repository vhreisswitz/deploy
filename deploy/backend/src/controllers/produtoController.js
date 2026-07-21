const { produto } = require("../models");

class produtoController {

    async store(req, res) {

        const { nome, preco, quantidade } = req.body;

        const createdProduto = await produto.create({
            nome,
            preco,
            quantidade
        });

        return res.status(200).json(createdProduto);
    }

    async index(req, res) {

        const produtos = await produto.findAll();

        return res.status(200).json(produtos);
    }

    async update(req, res) {

        const { id } = req.params;

        const { nome, preco, quantidade } = req.body;

        await produto.update(
            {
                nome,
                preco,
                quantidade
            },
            {
                where: { id: id }
            }
        );

        return res.status(200).json({
            mensagem: "Produto atualizado com sucesso"
        });
    }

    async destroy(req, res) {

        const { id } = req.params;

        await produto.destroy({
            where: { id: id }
        });

        return res.status(200).json({
            mensagem: "Produto excluído com sucesso"
        });
    }

}

module.exports = new produtoController();
