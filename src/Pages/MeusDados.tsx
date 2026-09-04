import React from 'react';
import { Link } from 'react-router-dom';
import {
    Buildings, Cake, CalendarBlank, Camera, CreditCard, Envelope, GenderIntersex, Hash, House,
    IdentificationCard, Lock, LockKey, MapPinLine, Pencil, Phone, Plus, ShieldCheck,
    Star, Trash, User, UserCircle, X
} from '@phosphor-icons/react';
import { useAuth } from '../utils/context/AuthProvider';
import { resizeImageToDataUrl } from '../utils/image/resizeImage';

type Tab = 'pessoais' | 'enderecos' | 'seguranca' | 'pagamento';

const TABS: { id: Tab; label: string; icon: React.ReactElement }[] = [
    { id: 'pessoais', label: 'Dados Pessoais', icon: <IdentificationCard size="1.1rem" /> },
    { id: 'enderecos', label: 'Endereços', icon: <House size="1.1rem" /> },
    { id: 'seguranca', label: 'Segurança', icon: <Lock size="1.1rem" /> },
    { id: 'pagamento', label: 'Pagamento', icon: <CreditCard size="1.1rem" /> },
];

interface EnderecoSalvo {
    id: string;
    apelido: string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    padrao: boolean;
}

interface CartaoSalvo {
    id: string;
    tipo: string;
    nomeCartao: string;
    final: string;
    validade: string;
    padrao: boolean;
}

const ENDERECOS_KEY = 'beeverage-enderecos';
const PAGAMENTOS_KEY = 'beeverage-pagamentos';

const getAllStored = <T,>(key: string): Record<string, T[]> => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const maskCPF = (value: string) => value.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskTelefone = (value: string) => value.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');

const maskCEP = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
};

const maskCartao = (value: string) => value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

const maskValidade = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const inputClass = 'flex items-center gap-2 rounded-xl border border-primary/30 bg-white p-3 text-secundary';
const saveButtonClass = 'px-6 py-3 rounded-lg text-white font-normal text-[0.9rem] bg-linear-to-r from-brand to-brand-dark transition-colors duration-200 hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed';
const cancelButtonClass = 'px-6 py-3 rounded-lg text-brand-dark font-normal text-[0.9rem] hover:underline';
const tabButtonClass = (active: boolean) => `flex items-center gap-2 rounded-lg px-4 py-2 text-[0.85rem] font-normal transition-colors duration-200 [&_svg]:shrink-0 ${active ? 'bg-linear-to-r from-brand to-brand-dark text-white' : 'bg-white text-brand-dark border border-primary/20 hover:bg-bg-secundary'}`;
const cardClass = 'flex flex-col gap-4 p-4 bg-white/40 rounded-[1rem] max-[750px]:p-3';

const MeusDados = () => {
    const { user, updateProfile, changePassword, updatePhoto } = useAuth();
    const fotoInputRef = React.useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = React.useState<Tab>('pessoais');
    const [fotoErro, setFotoErro] = React.useState('');

    const [nome, setNome] = React.useState(user?.nome ?? '');
    const [email, setEmail] = React.useState(user?.email ?? '');
    const [cpf, setCpf] = React.useState(user?.cpf ?? '');
    const [telefone, setTelefone] = React.useState(user?.telefone ?? '');
    const [dataNascimento, setDataNascimento] = React.useState(user?.dataNascimento ?? '');
    const [genero, setGenero] = React.useState(user?.genero ?? '');
    const [perfilErro, setPerfilErro] = React.useState('');
    const [perfilSucesso, setPerfilSucesso] = React.useState('');

    const [senhaAtual, setSenhaAtual] = React.useState('');
    const [novaSenha, setNovaSenha] = React.useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = React.useState('');
    const [senhaErro, setSenhaErro] = React.useState('');
    const [senhaSucesso, setSenhaSucesso] = React.useState('');

    const [enderecos, setEnderecos] = React.useState<EnderecoSalvo[]>([]);
    const [enderecoForm, setEnderecoForm] = React.useState<EnderecoSalvo | null>(null);

    const [cartoes, setCartoes] = React.useState<CartaoSalvo[]>([]);
    const [cartaoForm, setCartaoForm] = React.useState(false);
    const [novoCartao, setNovoCartao] = React.useState({ tipo: 'Crédito', nomeCartao: '', numero: '', validade: '' });
    const [pagamentoErro, setPagamentoErro] = React.useState('');

    React.useEffect(() => {
        if (!user) return;
        setEnderecos(getAllStored<EnderecoSalvo>(ENDERECOS_KEY)[user.email] ?? []);
        setCartoes(getAllStored<CartaoSalvo>(PAGAMENTOS_KEY)[user.email] ?? []);
    }, [user?.email]);

    if (!user) return (
        <div className="flex flex-col items-center justify-center gap-4 py-[4rem] text-center">
            <UserCircle size={64} weight="fill" color="var(--color-primary)" />
            <h1 className="text-[1.4rem] font-semibold text-secundary">Faça login para ver seus dados</h1>
            <p className="text-primary text-[0.9rem]">Entre na sua conta para visualizar e editar suas informações.</p>
            <Link to="/login" className="py-3 px-6 rounded-lg text-white font-normal bg-linear-to-r from-brand to-brand-dark transition-colors duration-200 hover:bg-brand-dark">Fazer Login</Link>
        </div>
    )

    const saveEnderecos = (lista: EnderecoSalvo[]) => {
        const all = getAllStored<EnderecoSalvo>(ENDERECOS_KEY);
        all[user.email] = lista;
        localStorage.setItem(ENDERECOS_KEY, JSON.stringify(all));
        setEnderecos(lista);
    };

    const saveCartoes = (lista: CartaoSalvo[]) => {
        const all = getAllStored<CartaoSalvo>(PAGAMENTOS_KEY);
        all[user.email] = lista;
        localStorage.setItem(PAGAMENTOS_KEY, JSON.stringify(all));
        setCartoes(lista);
    };

    const handleCancelarPerfil = () => {
        setNome(user.nome);
        setEmail(user.email);
        setCpf(user.cpf ?? '');
        setTelefone(user.telefone ?? '');
        setDataNascimento(user.dataNascimento ?? '');
        setGenero(user.genero ?? '');
        setPerfilErro('');
        setPerfilSucesso('');
    };

    const handleSalvarPerfil = (e: React.FormEvent) => {
        e.preventDefault();
        setPerfilErro('');
        setPerfilSucesso('');

        if (!updateProfile({ nome: nome.trim(), email: email.trim(), cpf, telefone, dataNascimento, genero })) {
            setPerfilErro('Este email já está em uso por outra conta');
            return;
        }

        setPerfilSucesso('Dados atualizados com sucesso');
    };

    const handleAlterarSenha = (e: React.FormEvent) => {
        e.preventDefault();
        setSenhaErro('');
        setSenhaSucesso('');

        if (novaSenha !== confirmarNovaSenha) {
            setSenhaErro('As senhas não coincidem');
            return;
        }

        if (!changePassword(senhaAtual, novaSenha)) {
            setSenhaErro('Senha atual incorreta');
            return;
        }

        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setSenhaSucesso('Senha alterada com sucesso');
    };

    const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;

        setFotoErro('');

        if (!file.type.startsWith('image/')) {
            setFotoErro('Selecione um arquivo de imagem');
            return;
        }

        try {
            const dataUrl = await resizeImageToDataUrl(file);
            updatePhoto(dataUrl);
        } catch {
            setFotoErro('Não foi possível carregar a imagem');
        }
    };

    const handleSalvarEndereco = (e: React.FormEvent) => {
        e.preventDefault();
        if (!enderecoForm) return;

        const existe = enderecos.some((item) => item.id === enderecoForm.id);
        const atualizado = existe
            ? enderecos.map((item) => item.id === enderecoForm.id ? enderecoForm : item)
            : [...enderecos, { ...enderecoForm, padrao: enderecos.length === 0 ? true : enderecoForm.padrao }];

        saveEnderecos(atualizado);
        setEnderecoForm(null);
    };

    const handleExcluirEndereco = (id: string) => {
        const removendoPadrao = enderecos.find((item) => item.id === id)?.padrao;
        let atualizado = enderecos.filter((item) => item.id !== id);
        if (removendoPadrao && atualizado.length) atualizado = atualizado.map((item, index) => ({ ...item, padrao: index === 0 }));
        saveEnderecos(atualizado);
    };

    const handleTornarPadraoEndereco = (id: string) => {
        saveEnderecos(enderecos.map((item) => ({ ...item, padrao: item.id === id })));
    };

    const handleSalvarCartao = (e: React.FormEvent) => {
        e.preventDefault();
        setPagamentoErro('');

        const digits = novoCartao.numero.replace(/\D/g, '');
        if (digits.length < 16) {
            setPagamentoErro('Número do cartão inválido');
            return;
        }

        const cartao: CartaoSalvo = {
            id: Date.now().toString(),
            tipo: novoCartao.tipo,
            nomeCartao: novoCartao.nomeCartao,
            final: digits.slice(-4),
            validade: novoCartao.validade,
            padrao: cartoes.length === 0,
        };

        saveCartoes([...cartoes, cartao]);
        setNovoCartao({ tipo: 'Crédito', nomeCartao: '', numero: '', validade: '' });
        setCartaoForm(false);
    };

    const handleExcluirCartao = (id: string) => {
        const removendoPadrao = cartoes.find((item) => item.id === id)?.padrao;
        let atualizado = cartoes.filter((item) => item.id !== id);
        if (removendoPadrao && atualizado.length) atualizado = atualizado.map((item, index) => ({ ...item, padrao: index === 0 }));
        saveCartoes(atualizado);
    };

    const handleTornarPadraoCartao = (id: string) => {
        saveCartoes(cartoes.map((item) => ({ ...item, padrao: item.id === id })));
    };

    const idade = dataNascimento ? Math.floor((Date.now() - new Date(dataNascimento).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className='bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent text-[1.4rem] font-semibold selection:text-white'>
                    Meus Dados
                </h1>
                <div className="flex gap-2 flex-wrap">
                    {TABS.map((tab) =>
                        <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={tabButtonClass(activeTab === tab.id)}>
                            {tab.icon}{tab.label}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-6 items-start max-[750px]:flex-col">
                <div className="w-[220px] shrink-0 flex flex-col items-center gap-2 max-[750px]:w-full max-[750px]:flex-row">
                    <div className="relative">
                        <div
                            style={user.foto ? { backgroundImage: `url(${user.foto})` } : undefined}
                            className={`h-[128px] w-[128px] flex items-center justify-center rounded-2xl bg-cover bg-center max-[750px]:h-[100px] max-[750px]:w-[100px] ${user.foto ? '' : 'bg-brand-dark'}`}
                        >
                            {!user.foto && <User size="3.5rem" weight="fill" className="text-white/70" />}
                        </div>
                        <button
                            type="button"
                            onClick={() => fotoInputRef.current?.click()}
                            title="Alterar foto"
                            className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-bg bg-brand text-white hover:bg-brand-dark"
                        >
                            <Camera size="1rem" weight="fill" />
                        </button>
                        <input ref={fotoInputRef} type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                    </div>
                    {user.foto &&
                        <button type="button" onClick={() => updatePhoto('')} className="flex items-center gap-1 text-primary text-[0.8rem] hover:text-red-500">
                            <Trash size="0.9rem" />Remover foto
                        </button>
                    }
                    {fotoErro && <p className="text-sm text-red-500 text-center">{fotoErro}</p>}
                </div>

                <div className="flex-1 w-full min-w-0">
                    {activeTab === 'pessoais' &&
                        <form onSubmit={handleSalvarPerfil} className={cardClass}>
                            <h2 className="font-semibold text-brand-dark text-[1.1rem]">Dados Pessoais</h2>

                            <label className={inputClass}>
                                <User size="1.25rem" className="text-primary shrink-0" />
                                <input type="text" required placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                            </label>

                            <label className={inputClass}>
                                <Hash size="1.25rem" className="text-primary shrink-0" />
                                <input type="text" inputMode="numeric" placeholder="CPF" maxLength={14} value={cpf} onChange={(e) => setCpf(maskCPF(e.target.value))} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                            </label>

                            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                                <label className={inputClass}>
                                    <Envelope size="1.25rem" className="text-primary shrink-0" />
                                    <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                </label>

                                <label className={inputClass}>
                                    <Phone size="1.25rem" className="text-primary shrink-0" />
                                    <input type="text" inputMode="numeric" placeholder="Telefone/Whatsapp" maxLength={15} value={telefone} onChange={(e) => setTelefone(maskTelefone(e.target.value))} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                                <label className={inputClass}>
                                    <Cake size="1.25rem" className="text-primary shrink-0" />
                                    <input type="date" placeholder="Data de nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full bg-transparent text-secundary placeholder:text-primary focus:outline-none" />
                                </label>

                                <label className={inputClass}>
                                    <GenderIntersex size="1.25rem" className="text-primary shrink-0" />
                                    <select value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full bg-transparent text-secundary focus:outline-none">
                                        <option value="">Gênero</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Outro">Outro</option>
                                        <option value="Prefiro não dizer">Prefiro não dizer</option>
                                    </select>
                                </label>
                            </div>

                            {idade !== null &&
                                <p className={`flex items-center gap-2 text-[0.8rem] ${idade >= 18 ? 'text-brand-dark' : 'text-red-500'}`}>
                                    <ShieldCheck size="1rem" weight="fill" />
                                    {idade >= 18 ? 'Idade verificada: maior de 18 anos' : 'É necessário ter 18 anos ou mais para comprar bebidas alcoólicas'}
                                </p>
                            }

                            {perfilErro && <p className="text-sm text-red-500">{perfilErro}</p>}
                            {perfilSucesso && <p className="text-sm text-green-600">{perfilSucesso}</p>}

                            <div className="flex items-center justify-end gap-2">
                                <button type="button" onClick={handleCancelarPerfil} className={cancelButtonClass}>Cancelar</button>
                                <button type="submit" className={saveButtonClass}>Salvar</button>
                            </div>
                        </form>
                    }

                    {activeTab === 'enderecos' &&
                        <div className={cardClass}>
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold text-brand-dark text-[1.1rem]">Endereços</h2>
                                {!enderecoForm &&
                                    <button type="button" onClick={() => setEnderecoForm({ id: Date.now().toString(), apelido: '', cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', padrao: enderecos.length === 0 })} className="flex items-center gap-1 text-brand-dark text-[0.85rem] hover:underline">
                                        <Plus size="1rem" weight="bold" />Adicionar Endereço
                                    </button>
                                }
                            </div>

                            {enderecoForm &&
                                <form onSubmit={handleSalvarEndereco} className="flex flex-col gap-3 rounded-lg bg-white p-3">
                                    <label className={inputClass}>
                                        <House size="1.25rem" className="text-primary shrink-0" />
                                        <input type="text" required placeholder="Apelido (Casa, Trabalho...)" value={enderecoForm.apelido} onChange={(e) => setEnderecoForm({ ...enderecoForm, apelido: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                                        <label className={inputClass}>
                                            <MapPinLine size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" inputMode="numeric" required placeholder="CEP" maxLength={9} value={enderecoForm.cep} onChange={(e) => setEnderecoForm({ ...enderecoForm, cep: maskCEP(e.target.value) })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                        <label className={inputClass}>
                                            <Buildings size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" required placeholder="Rua" value={enderecoForm.rua} onChange={(e) => setEnderecoForm({ ...enderecoForm, rua: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                                        <label className={inputClass}>
                                            <Hash size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" required placeholder="Número" value={enderecoForm.numero} onChange={(e) => setEnderecoForm({ ...enderecoForm, numero: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                        <label className={inputClass}>
                                            <Buildings size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" placeholder="Complemento" value={enderecoForm.complemento} onChange={(e) => setEnderecoForm({ ...enderecoForm, complemento: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-[1fr_1fr_80px] gap-3 max-[600px]:grid-cols-1">
                                        <label className={inputClass}>
                                            <MapPinLine size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" required placeholder="Bairro" value={enderecoForm.bairro} onChange={(e) => setEnderecoForm({ ...enderecoForm, bairro: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                        <label className={inputClass}>
                                            <MapPinLine size="1.25rem" className="text-primary shrink-0" />
                                            <input type="text" required placeholder="Cidade" value={enderecoForm.cidade} onChange={(e) => setEnderecoForm({ ...enderecoForm, cidade: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                        </label>
                                        <label className={inputClass}>
                                            <input type="text" required placeholder="UF" maxLength={2} value={enderecoForm.estado} onChange={(e) => setEnderecoForm({ ...enderecoForm, estado: e.target.value.toUpperCase() })} className="w-full bg-transparent placeholder:text-primary focus:outline-none uppercase" />
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                        <button type="button" onClick={() => setEnderecoForm(null)} className={cancelButtonClass}>Cancelar</button>
                                        <button type="submit" className={saveButtonClass}>Salvar Endereço</button>
                                    </div>
                                </form>
                            }

                            {!enderecos.length && !enderecoForm &&
                                <p className="text-primary text-[0.9rem]">Você ainda não tem endereços salvos.</p>
                            }

                            {enderecos.map((endereco) =>
                                <div key={endereco.id} className="flex items-start justify-between gap-3 rounded-lg bg-white p-3">
                                    <div className="flex items-start gap-3">
                                        <House size="1.3rem" className="text-brand-dark shrink-0 mt-1" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-brand-dark">{endereco.apelido}</h4>
                                                {endereco.padrao && <span className="flex items-center gap-1 text-brand text-[0.75rem]"><Star size="0.9rem" weight="fill" />Padrão</span>}
                                            </div>
                                            <p className="text-secundary text-[0.85rem]">{endereco.rua}, {endereco.numero}{endereco.complemento && ` - ${endereco.complemento}`}</p>
                                            <p className="text-primary text-[0.8rem]">{endereco.bairro} - {endereco.cidade}/{endereco.estado} | {endereco.cep}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {!endereco.padrao && <button type="button" onClick={() => handleTornarPadraoEndereco(endereco.id)} title="Tornar padrão" className="text-primary hover:text-brand-dark"><Star size="1.1rem" /></button>}
                                        <button type="button" onClick={() => setEnderecoForm(endereco)} title="Editar" className="text-primary hover:text-brand-dark"><Pencil size="1.1rem" /></button>
                                        <button type="button" onClick={() => handleExcluirEndereco(endereco.id)} title="Excluir" className="text-primary hover:text-red-500"><Trash size="1.1rem" /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    }

                    {activeTab === 'seguranca' &&
                        <form onSubmit={handleAlterarSenha} className={cardClass}>
                            <h2 className="font-semibold text-brand-dark text-[1.1rem]">Alterar Senha</h2>

                            <label className={inputClass}>
                                <LockKey size="1.25rem" className="text-primary shrink-0" />
                                <input type="password" required placeholder="Senha atual" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                            </label>

                            <label className={inputClass}>
                                <LockKey size="1.25rem" className="text-primary shrink-0" />
                                <input type="password" required placeholder="Nova senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                            </label>

                            <label className={inputClass}>
                                <LockKey size="1.25rem" className="text-primary shrink-0" />
                                <input type="password" required placeholder="Confirmar nova senha" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                            </label>

                            {senhaErro && <p className="text-sm text-red-500">{senhaErro}</p>}
                            {senhaSucesso && <p className="text-sm text-green-600">{senhaSucesso}</p>}

                            <div className="flex items-center justify-end">
                                <button type="submit" className={saveButtonClass}>Alterar Senha</button>
                            </div>
                        </form>
                    }

                    {activeTab === 'pagamento' &&
                        <div className={cardClass}>
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold text-brand-dark text-[1.1rem]">Formas de Pagamento</h2>
                                {!cartaoForm &&
                                    <button type="button" onClick={() => setCartaoForm(true)} className="flex items-center gap-1 text-brand-dark text-[0.85rem] hover:underline">
                                        <Plus size="1rem" weight="bold" />Adicionar Cartão
                                    </button>
                                }
                            </div>

                            {cartaoForm &&
                                <form onSubmit={handleSalvarCartao} className="flex flex-col gap-3 rounded-lg bg-white p-3">
                                    <div className="flex items-center justify-between">
                                        <select value={novoCartao.tipo} onChange={(e) => setNovoCartao({ ...novoCartao, tipo: e.target.value })} className="rounded-lg border border-primary/30 bg-white p-2 text-secundary focus:outline-none">
                                            <option value="Crédito">Cartão de Crédito</option>
                                            <option value="Débito">Cartão de Débito</option>
                                        </select>
                                        <button type="button" onClick={() => setCartaoForm(false)} className="text-primary hover:text-red-500"><X size="1.2rem" /></button>
                                    </div>
                                    <label className={inputClass}>
                                        <User size="1.25rem" className="text-primary shrink-0" />
                                        <input type="text" required placeholder="Nome impresso no cartão" value={novoCartao.nomeCartao} onChange={(e) => setNovoCartao({ ...novoCartao, nomeCartao: e.target.value })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                    </label>
                                    <label className={inputClass}>
                                        <CreditCard size="1.25rem" className="text-primary shrink-0" />
                                        <input type="text" inputMode="numeric" required placeholder="Número do cartão" maxLength={19} value={novoCartao.numero} onChange={(e) => setNovoCartao({ ...novoCartao, numero: maskCartao(e.target.value) })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                    </label>
                                    <label className={inputClass}>
                                        <CalendarBlank size="1.25rem" className="text-primary shrink-0" />
                                        <input type="text" inputMode="numeric" required placeholder="Validade (MM/AA)" maxLength={5} value={novoCartao.validade} onChange={(e) => setNovoCartao({ ...novoCartao, validade: maskValidade(e.target.value) })} className="w-full bg-transparent placeholder:text-primary focus:outline-none" />
                                    </label>

                                    {pagamentoErro && <p className="text-sm text-red-500">{pagamentoErro}</p>}

                                    <div className="flex items-center justify-end gap-2">
                                        <button type="button" onClick={() => setCartaoForm(false)} className={cancelButtonClass}>Cancelar</button>
                                        <button type="submit" className={saveButtonClass}>Salvar Cartão</button>
                                    </div>
                                </form>
                            }

                            {!cartoes.length && !cartaoForm &&
                                <p className="text-primary text-[0.9rem]">Você ainda não tem formas de pagamento salvas.</p>
                            }

                            {cartoes.map((cartao) =>
                                <div key={cartao.id} className="flex items-center justify-between gap-3 rounded-lg bg-white p-3">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size="1.5rem" weight="fill" className="text-brand-dark shrink-0" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-brand-dark">{cartao.tipo} •••• {cartao.final}</h4>
                                                {cartao.padrao && <span className="flex items-center gap-1 text-brand text-[0.75rem]"><Star size="0.9rem" weight="fill" />Padrão</span>}
                                            </div>
                                            <p className="text-primary text-[0.8rem]">{cartao.nomeCartao} | Validade {cartao.validade}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {!cartao.padrao && <button type="button" onClick={() => handleTornarPadraoCartao(cartao.id)} title="Tornar padrão" className="text-primary hover:text-brand-dark"><Star size="1.1rem" /></button>}
                                        <button type="button" onClick={() => handleExcluirCartao(cartao.id)} title="Excluir" className="text-primary hover:text-red-500"><Trash size="1.1rem" /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MeusDados;
