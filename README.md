
# MyCommerce

Uma API pública orientada para sites ecommerce.


## Stack utilizada

**Node.js, Express.js**


## Funcionalidades

- Carrinho de Compras
- Preview em tempo real
- Modo tela cheia
- Multiplataforma


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.


## Autor

- [@aubaro01](https://github.com/aubaro01)

