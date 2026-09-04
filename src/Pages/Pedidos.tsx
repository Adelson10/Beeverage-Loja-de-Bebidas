import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowsClockwise, CaretDown, CaretUp, Chat, House, Motorcycle, Package, Storefront } from '@phosphor-icons/react';
import { useCart } from '../utils/context/CartProvider';
import { ProdutoMockup } from '../utils/Mockup/ProductPromo';
import { PedidosMockup } from '../utils/Mockup/PedidosMockup';
import PhotoProduct from '../components/utils/PhotoProduct';
import discountIcon from '../assets/imagens/Product/discount.svg';
import './Pedidos.css';
import useMedia from '../hooks/useMedia';

const STATUS_STEP: Record<PedidoStatus, number> = {
    Processando: 0,
    Enviado: 1,
    Entregue: 2,
    Cancelado: -1
};

const Pedidos = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const mobile = useMedia(750);

    const toggleExpand = (id: number) => {
        setExpandedIds((prev) => prev.includes(id) ? prev.filter((expandedId) => expandedId !== id) : [...prev, id]);
    };

    const pedidosProdutos = PedidosMockup
        .map((pedido) => {
            const produtos = pedido.items
                .map((item) => {
                    const product = ProdutoMockup.find((produto) => produto.id === item.productId);
                    return product ? { product, quantity: item.quantity } : null;
                })
                .filter((entry): entry is { product: productModal; quantity: number } => entry !== null);

            return produtos.length ? { pedido, produtos } : null;
        })
        .filter((entry): entry is { pedido: Pedido; produtos: { product: productModal; quantity: number }[] } => entry !== null);

    if (!pedidosProdutos.length) return (
        <div className="flex flex-col items-center justify-center gap-4 py-[4rem] text-center">
            <Package size={64} weight="fill" color="var(--color-primary)" />
            <h1 className="text-[1.4rem] font-semibold text-secundary">Você ainda não fez nenhum pedido</h1>
            <p className="text-primary text-[0.9rem]">Seus pedidos aparecerão por aqui assim que forem realizados.</p>
            <a href="/" className="py-3 px-6 rounded-lg text-white font-normal bg-linear-to-r from-brand to-brand-dark transition-colors duration-200 hover:bg-brand-dark">Ver Catálogo</a>
        </div>
    )

    const handleBuyAgain = (produtos: { product: productModal; quantity: number }[]) => {
        produtos.forEach(({ product, quantity }) => addToCart(product.id, quantity));
        navigate('/carrinho');
    };

    return (
        <div className="flex gap-4 items-start flex-col">
            <h1 className='bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent text-[1.4rem] font-semibold selection:text-white w-full text-center'>
                Meus Pedidos
                <span className="text-primary text-[0.9rem] font-normal"> ( {pedidosProdutos.length} {pedidosProdutos.length === 1 ? 'Item' : 'Itens'} )</span>
            </h1>
            <div className="flex flex-col gap-4 w-full">
                { pedidosProdutos.map(({ pedido, produtos }) => {
                    const totalQuantidade = produtos.reduce((total, { quantity }) => total + quantity, 0);
                    const subtotal = produtos.reduce((total, { product, quantity }) => total + product.priceNow * quantity, 0);
                    const total = subtotal + pedido.frete;
                    const isExpanded = expandedIds.includes(pedido.id);
                    const step = STATUS_STEP[pedido.status];
                    const primary = produtos[0].product;

                    return (
                    <div>
                        <div key={pedido.id} className={`flex flex-col gap-4 p-4 bg-white/40 max-[750px]:p-3 ${ isExpanded ? 'rounded-t-[1rem]' : 'rounded-[1rem]'}`}>
                            <div className="flex items-center gap-4 max-[600px]:gap-2">
                                <div className="shrink-0 hidden min-[601px]:flex items-center justify-center">
                                    <div className="relative">
                                        <PhotoProduct noAnimation color1="#FFFFFF" color2="#CECECE" shadowImage={primary.thumbnail.shadowWidth} srcImg={primary.thumbnail.src} />
                                        {primary.price !== 0 && <div style={{ backgroundImage: `url(${discountIcon})` }} className='absolute bottom-0 h-[35px] w-[35px] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((primary.priceNow * 100) / primary.price) - 100).toFixed(0)}%</div>}
                                    </div>
                                </div>
                                <div className="shrink-0 flex min-[601px]:hidden items-center justify-center">
                                    <div className="relative">
                                        <PhotoProduct noAnimation type="Carrinho" color1="#FFFFFF" color2="#CECECE" shadowImage={primary.thumbnail.shadowWidth} srcImg={primary.thumbnail.src} />
                                        {primary.price !== 0 && <div style={{ backgroundImage: `url(${discountIcon})` }} className='absolute bottom-0 h-[35px] w-[35px] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((primary.priceNow * 100) / primary.price) - 100).toFixed(0)}%</div>}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 self-stretch justify-between  max-[750px]:gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 flex flex-col gap-[0.5rem]">
                                            <h3 className="text-[1.2rem] font-semibold text-brand-dark overflow-hidden text-ellipsis line-clamp-2 max-[600px]:text-[1rem] max-[600px]:font-bold max-[600px]:leading-tight">{primary.name}</h3>
                                            <p className="text-primary text-[0.8rem]"><strong className="font-medium">Volume:</strong> {primary.volume}</p>
                                            <p className="text-primary text-[0.8rem]">Comprado em {pedido.data} | {totalQuantidade} Unidades | <strong className="text-brand-dark font-medium">{subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong></p>
                                        </div>
                                        {!mobile && (
                                            <button type="button" className="flex items-center justify-center p-[12px] rounded-[12px] bg-brand text-white shrink-0 hover:bg-brand-select">
                                                <Chat size={22} weight="fill" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between gap-4 max-[600px]:gap-2">
                                        <button onClick={() => handleBuyAgain(produtos)} className="flex items-center gap-[0.5rem] w-fit px-[20px] py-[12px] max-[750px]:p-3 rounded-lg text-white font-normal text-[0.9rem] bg-linear-to-r from-brand to-brand-dark transition-colors duration-200 hover:bg-brand-dark">
                                            <ArrowsClockwise size={mobile ? 20 : 16} weight="bold" />{!mobile && "Comprar Novamente"}
                                        </button>
                                        {mobile && (
                                            <button type="button" className="flex items-center justify-center p-[12px] rounded-[12px] bg-brand text-white shrink-0 hover:bg-brand-select">
                                                <Chat size={22} weight="fill" />
                                            </button>
                                        )}
                                        <button type="button" onClick={() => toggleExpand(pedido.id)} className="flex items-center gap-1 self-end max-[750px]:self-center text-brand-dark text-[1rem] border-none bg-transparent cursor-pointer hover:text-brand-select">
                                            {!mobile && "Ver Informações"}
                                            {isExpanded ? <CaretUp size={26} className="text-secundary"/> : <CaretDown size={26} className="text-secundary" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { isExpanded &&
                                <div className="flex flex-col gap-[1rem] p-[1rem] bg-[#E1DBD2] rounded-b-[1rem] ">
                                    <div className="grid grid-cols-3 gap-4 max-[750px]:grid-cols-1 text-[0.85rem]">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-semibold text-brand-dark mb-1">Resumo do Pedido</h4>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Pedido Nº:</strong> {pedido.numero}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Pedido Realizado:</strong> {pedido.data} às {pedido.hora}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Forma de Pagamento:</strong> {pedido.formaPagamento}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Status:</strong> {pedido.status}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Data de Entrega:</strong> {pedido.dataEntregaTexto}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-semibold text-brand-dark mb-1">Informações de Envio</h4>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Endereço:</strong> {pedido.endereco.rua}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Bairro:</strong> {pedido.endereco.bairro}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">Cidade:</strong> {pedido.endereco.cidade}</p>
                                            <p className="text-secundary"><strong className="text-brand-dark font-medium">CEP:</strong> {pedido.endereco.cep}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-semibold text-brand-dark mb-1">Resumo do Pedido</h4>
                                            <p className="flex items-center justify-between text-brand-dark font-medium"><span>Valor Unitário:</span><span className="text-secundary">{primary.priceNow.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                            <p className="flex items-center justify-between text-brand-dark font-medium"><span>Quantidade:</span><span className="text-secundary">{totalQuantidade}</span></p>
                                            <p className="flex items-center justify-between text-brand-dark font-semibold"><span>Subtotal:</span><span className="font-semibold text-secundary">{subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                            <p className="flex items-center justify-between text-brand-dark font-medium"><span>Frete:</span><span className="text-secundary">{pedido.frete.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                            <p className="flex items-center justify-between border-t border-brand-dark font-semibold pt-1"><span className="font-semibold text-brand-dark">Total:</span><span className="text-brand-dark text-[1.1rem]">{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></p>
                                        </div>
                                    </div>

                                    { step >= 0 &&
                                        <div className="flex items-center gap-2 px-2">
                                            <div className={`flex items-center justify-center h-8 w-8 rounded-lg shrink-0 ${step >= 0 ? 'bg-brand text-white' : 'bg-white text-primary'}`}>
                                                <Storefront size={16} weight="fill" />
                                            </div>
                                            <div className={`flex-1 h-1.5 rounded-l-full ${step >= 1 ? 'bg-brand' : step === 0 ? 'bg-primary/30 pedido-step-loading' : 'bg-primary/30'}`}></div>
                                            <div className={`flex items-center justify-center h-8 w-8 rounded-lg shrink-0 ${step >= 1 ? 'bg-brand text-white' : 'bg-white/40 text-primary'}`}>
                                                <Motorcycle size={16} weight="fill" />
                                            </div>
                                            <div className={`flex-1 h-1.5 rounded-r-full ${step >= 2 ? 'bg-brand' : step === 1 ? 'bg-primary/30 pedido-step-loading' : 'bg-primary/30'}`}></div>
                                            <div className={`flex items-center justify-center h-8 w-8 rounded-lg shrink-0 ${step >= 2 ? 'bg-brand text-white' : 'bg-white/40 text-primary'}`}>
                                                <House size={16} weight="fill" />
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                    </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default Pedidos;
