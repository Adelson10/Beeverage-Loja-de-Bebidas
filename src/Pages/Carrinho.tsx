import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Basket, Trash, TruckTrailer, Wallet } from '@phosphor-icons/react';
import { useCart } from '../utils/context/CartProvider';
import { ProdutoMockup } from '../utils/Mockup/ProductPromo';
import PhotoProduct from '../components/utils/PhotoProduct';
import Checkbox from '../components/utils/Checkbox';
import discountIcon from '../assets/imagens/Product/discount.svg';

const FREE_SHIPPING_THRESHOLD = 150;

const Carrinho = () => {
    const { items, removeFromCart, updateQuantity } = useCart();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [cep, setCep] = useState('');
    const [freight, setFreight] = useState<number | null>(null);
    const [freightLoading, setFreightLoading] = useState(false);
    const [freightError, setFreightError] = useState('');

    const cartProducts = items
        .map((item) => {
            const product = ProdutoMockup.find((produto) => produto.id === item.id);
            return product ? { product, quantity: item.quantity } : null;
        })
        .filter((entry): entry is { product: productModal; quantity: number } => entry !== null);

    useEffect(() => {
        const currentIds = cartProducts.map(({ product }) => product.id);
        setSelectedIds((prev) => {
            const kept = prev.filter((id) => currentIds.includes(id));
            const newIds = currentIds.filter((id) => !prev.includes(id));
            return [...kept, ...newIds];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const toggleSelected = (id: number) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]);
    };

    const allSelected = cartProducts.length > 0 && selectedIds.length === cartProducts.length;

    const toggleSelectAll = () => {
        setSelectedIds(allSelected ? [] : cartProducts.map(({ product }) => product.id));
    };

    const selectedProducts = cartProducts.filter(({ product }) => selectedIds.includes(product.id));

    const subtotal = selectedProducts.reduce((total, { product, quantity }) => total + product.priceNow * quantity, 0);
    const total = subtotal + (freight ?? 0);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
        const formatted = digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
        setCep(formatted);
        setFreight(null);
        setFreightError('');
    };

    const calculateFreight = () => {
        const digits = cep.replace(/\D/g, '');
        if (digits.length !== 8) {
            setFreightError('CEP inválido');
            setFreight(null);
            return;
        }
        setFreightError('');
        setFreightLoading(true);
        setTimeout(() => {
            if (subtotal >= FREE_SHIPPING_THRESHOLD) {
                setFreight(0);
            } else {
                const region = Number(digits[0]);
                const baseValue = 12.9 + region * 1.5;
                setFreight(Number(baseValue.toFixed(2)));
            }
            setFreightLoading(false);
        }, 800);
    };

    if (!cartProducts.length) return (
        <div className="flex flex-col items-center justify-center gap-4 py-[4rem] text-center">
            <Basket size={64} weight="fill" color="var(--color-primary)" />
            <h1 className="text-[1.4rem] font-semibold text-secundary">Seu carrinho está vazio</h1>
            <p className="text-primary text-[0.9rem]">Adicione produtos para vê-los por aqui.</p>
            <Link to="/" className="py-3 px-6 rounded-lg text-white font-normal bg-linear-to-r from-brand to-brand-dark transition-colors duration-200 hover:bg-brand-dark">Ver Catálogo</Link>
        </div>
    )

    return (
        <div className="flex gap-4 items-start flex-col">
            <h1 className='bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent text-[1.4rem] font-semibold selection:text-white w-full text-center'>
                Meu Carrinho 
                <span className="text-primary text-[0.9rem] font-normal"> ( {selectedProducts.length} {cartProducts.length === 1 ? 'item' : 'itens'} )</span>
            </h1>
            <div className="flex gap-8 max-[1000px]:flex-col w-full">
                <div className="flex-1 flex flex-col gap-3 w-full">
                    <label htmlFor="select-all" className="flex gap-[1.25rem] text-primary text-[1rem] cursor-pointer mb-2 items-end flex-row-reverse">
                        <Checkbox id="select-all" checked={allSelected} onChange={toggleSelectAll} />
                        Selecionar todos
                    </label>
                    { cartProducts.map(({ product, quantity }) =>
                        <div className="flex items-center gap-[1rem]" key={product.id}>
                            <Checkbox name="productId" value={product.id} checked={selectedIds.includes(product.id)} onChange={() => toggleSelected(product.id)} />
                            <div key={product.id} className="flex items-center gap-4 p-4 bg-white/40 rounded-[16px] max-[600px]:gap-2 max-[600px]:p-3 w-full">
                                <div className="shrink-0 hidden min-[601px]:flex items-center justify-center">
                                    <div className="relative">
                                        <PhotoProduct noAnimation color1="#FFFFFF" color2="#CECECE" shadowImage={product.thumbnail.shadowWidth} srcImg={product.thumbnail.src} />
                                        {product.price !== 0 && <div style={{ backgroundImage: `url(${discountIcon})` }} className='absolute bottom-0 h-[35px] w-[35px] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((product.priceNow * 100) / product.price) - 100).toFixed(0)}%</div>}
                                    </div>
                                </div>
                                <div className="shrink-0 flex min-[601px]:hidden items-center justify-center">
                                    <div className="relative">
                                        <PhotoProduct noAnimation type="Carrinho" color1="#FFFFFF" color2="#CECECE" shadowImage={product.thumbnail.shadowWidth} srcImg={product.thumbnail.src} />
                                        {product.price !== 0 && <div style={{ backgroundImage: `url(${discountIcon})` }} className='absolute bottom-0 h-[35px] w-[35px] bg-center flex items-center justify-center text-white text-[0.6rem]'>{(((product.priceNow * 100) / product.price) - 100).toFixed(0)}%</div>}
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col min-w-0 justify-between gap-2">
                                    <h3 className="text-[1.2rem] font-semibold text-brand-dark overflow-hidden text-ellipsis line-clamp-2 max-[600px]:text-[1rem] max-[600px]:font-bold max-[600px]:leading-tight">{product.name}</h3>
                                    <p className="text-primary text-[0.7rem]"><strong className="font-medium">Volume:</strong> {product.volume}</p>
                                    <div className="flex flex-wrap items-center gap-[0.4rem]">
                                        {product.price > 0 && <p className="text-primary text-[1rem] font-medium"><del>{(product.price * quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</del></p>}
                                        <p className="text-brand-dark text-[1.4rem] font-bold max-[600px]:text-[1rem]">{(product.priceNow * quantity).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="py-[0.2rem] px-2 flex gap-3 items-center border border-brand-dark text-brand-dark rounded-full leading-[1rem] w-fit max-[600px]:gap-2 max-[600px]:px-[0.6rem] max-[600px]:py-[0.2rem]">
                                            <button className="hover:text-brand-dark" onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
                                            <input
                                                type="number"
                                                min={1}
                                                value={quantity}
                                                onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                                className="w-8 bg-transparent text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <button className="hover:text-brand-dark" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                                        </div>
                                        <button className="hidden max-[600px]:block text-primary hover:text-brand-dark" onClick={() => removeFromCart(product.id)}>
                                            <Trash size={20} weight="fill" />
                                        </button>
                                    </div>
                                </div>
                                <button className="text-primary hover:text-brand-dark shrink-0 max-[600px]:hidden" onClick={() => removeFromCart(product.id)}>
                                    <Trash size={20} weight="fill" />
                                </button>
                            </div>
                        </div>
                    ) }
                </div>
                <div className="w-[300px] shrink-0 flex flex-col gap-4 max-[1000px]:w-full">
                    <div className="flex items-center justify-between text-primary text-[0.9rem] max-[750px]:order-3">
                        <p>Valor do Produtos:</p>
                        <p className="font-medium text-(--color-brand-dark) text-[1.1rem]">{subtotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div className="flex items-center justify-between text-primary text-[0.9rem] max-[750px]:order-4">
                        <p>Frete:</p>
                        <p className="font-medium text-(--color-brand-dark) text-[1.1rem]">
                            {freightLoading
                                ? 'Calculando...'
                                : freight === null
                                    ? 'A calcular'
                                    : freight === 0
                                        ? 'Grátis'
                                        : freight.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-(--color-brand) pt-2 max-[750px]:order-5">
                        <p className="font-medium text-secundary">Total</p>
                        <p className="text-[1.4rem] font-bold text-brand-dark">{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <label htmlFor="freight" className="flex items-center justify-between p-2 gap-2 rounded-lg border border-primary max-[750px]:order-1">
                        <input
                            className="border-none bg-transparent outline-none w-full text-[0.9rem] text-secundary"
                            type="text"
                            id="freight"
                            placeholder="Inserir CEP"
                            autoComplete="off"
                            inputMode="numeric"
                            maxLength={9}
                            value={cep}
                            onChange={handleCepChange}
                            onKeyDown={(e) => e.key === 'Enter' && calculateFreight()}
                        />
                        <button
                            type="button"
                            onClick={calculateFreight}
                            disabled={freightLoading}
                            className="flex items-center justify-center p-2 bg-linear-to-r from-brand to-brand-dark rounded-lg text-white transition-colors duration-200 hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <TruckTrailer size={16} weight="fill" />
                        </button>
                    </label>
                    {freightError && <p className="text-red-500 text-[0.8rem] max-[750px]:order-1">{freightError}</p>}
                    <label htmlFor="freight" className="flex items-center justify-between p-2 gap-2 rounded-lg border border-primary max-[750px]:order-2">
                        <input className="border-none bg-transparent outline-none w-full text-[0.9rem] text-secundary" type="text" id="freight" placeholder="Codigo de Promoção" autoComplete="off" />
                        <button className="flex items-center justify-center py-1 px-4 bg-linear-to-r from-brand to-brand-dark rounded-lg text-white transition-colors duration-200 hover:bg-brand-dark">Aplicar</button>
                    </label>
                    <button disabled={!selectedProducts.length} className="max-[750px]:order-6 w-full py-4 px-2 bg-linear-to-r from-brand to-brand-dark flex items-center justify-center gap-4 rounded-lg text-white font-normal text-base transition-colors duration-200 hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                        <Wallet size={20} weight="fill" />Ir para o Pagamento
                    </button>
                    <a href="/" className="text-brand-dark text-center hover:text-brand-dark/80 max-[750px]:order-7">
                        Continuar Comprando
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Carrinho;
