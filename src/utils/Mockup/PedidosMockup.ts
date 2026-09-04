export const PedidosMockup: Pedido[] = [
  {
    id: 1,
    numero: "75656569",
    data: "17 de Julho de 2024",
    hora: "17:08:06",
    formaPagamento: "Pix",
    status: "Entregue",
    dataEntregaTexto: "Entregue no dia 12 de Agosto",
    endereco: {
      rua: "Av Tiradentes, 1348",
      bairro: "Centro",
      cidade: "Colinas Do Tocantins, Tocantins",
      cep: "77760-000"
    },
    frete: 16.31,
    items: [
      { productId: 303040, quantity: 16 }
    ]
  },
  {
    id: 2,
    numero: "75658123",
    data: "2 de Agosto de 2024",
    hora: "09:42:20",
    formaPagamento: "Cartão de Crédito",
    status: "Enviado",
    dataEntregaTexto: "Previsão de entrega: 6 de Agosto",
    endereco: {
      rua: "Av Tiradentes, 1348",
      bairro: "Centro",
      cidade: "Colinas Do Tocantins, Tocantins",
      cep: "77760-000"
    },
    frete: 12.9,
    items: [
      { productId: 303040, quantity: 6 }
    ]
  },
  {
    id: 3,
    numero: "75660987",
    data: "20 de Agosto de 2024",
    hora: "14:15:52",
    formaPagamento: "Pix",
    status: "Processando",
    dataEntregaTexto: "Previsão de entrega: 26 de Agosto",
    endereco: {
      rua: "Av Tiradentes, 1348",
      bairro: "Centro",
      cidade: "Colinas Do Tocantins, Tocantins",
      cep: "77760-000"
    },
    frete: 14.4,
    items: [
      { productId: 303035, quantity: 12 }
    ]
  }
];
