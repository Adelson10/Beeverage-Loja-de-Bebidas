import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Envelope, LockKey, User } from '@phosphor-icons/react';
import Button from '../components/utils/Button';
import LogoImg from '../assets/Logo/Logo.png';
import { Apple, Google } from '@mui/icons-material';
import { useAuth } from '../utils/context/AuthProvider';

type Mode = 'login' | 'cadastro';
type Step = 'email' | 'detalhes';

const Login = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [mode, setMode] = React.useState<Mode>('login');
  const [step, setStep] = React.useState<Step>('email');
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const [erro, setErro] = React.useState('');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'cadastro' : 'login');
    setStep('email');
    setErro('');
  };

  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('detalhes');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (mode === 'cadastro') {
      if (senha !== confirmarSenha) {
        setErro('As senhas não coincidem');
        return;
      }

      if (!register(email, nome, senha)) {
        setErro('Este email já está cadastrado');
        return;
      }
    } else {
      if (!login(email, senha)) {
        setErro('Email ou senha inválidos');
        return;
      }
    }

    navigate('/');
  };

  const inputClass = 'flex items-center gap-2 rounded-xl border border-primary/30 bg-white p-4 text-secundary';

  return (
    <div className="mx-auto flex w-full max-w-[380px] flex-col items-center gap-6 py-16">
      <Link to={'/'}>
        <img src={LogoImg} alt="Beeverage" className="h-[8rem] w-[8rem] object-contain" />
      </Link>

      {step === 'email' ? (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent text-[2rem] font-semibold selection:text-white">{mode === 'login' ? 'Olá' : 'Crie sua conta'}</h1>
            <p className="text-[1rem] font-light text-primary">
              {mode === 'login' ? (
                <>Entre no Beeverage ou <button type="button" onClick={toggleMode} className="text-brand underline">crie uma conta</button></>
              ) : (
                <>Já tem uma conta? <button type="button" onClick={toggleMode} className="text-brand underline">entrar</button></>
              )}
            </p>
          </div>

          <form onSubmit={handleContinuar} className="flex w-full flex-col gap-4">
            <label className={inputClass}>
              <Envelope size="1.25rem" className="text-primary" />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent placeholder:text-primary focus:outline-none"
              />
            </label>

            <button className='p-4 font-medium rounded-lg flex justify-center items-center font-light text-white bg-linear-[-68deg] from-brand-dark to-brand [&_svg]:min-w-6'>Continuar</button>
          </form>

          <div className="w-full border-t border-primary/30" />

          <div className="flex w-full flex-col gap-4">
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white p-4 font-medium text-secundary">
              <Google x={{fontSize: '1.25rem'}} />
              Continuar com Google
            </button>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white p-4 font-medium text-secundary">
              <Apple sx={{fontSize: '1.6rem'}} />
              Continuar com Apple
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <button type="button" onClick={() => setStep('email')} className="self-start text-primary hover:text-brand-dark">
              <ArrowLeft size="1.5rem" />
            </button>
            <h1 className="bg-linear-to-l from-brand-dark to-brand bg-clip-text text-transparent text-[2rem] font-semibold selection:text-white">{mode === 'login' ? 'Bem-vindo' : 'Quase lá'}</h1>
            <p className="text-sm text-primary">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            {mode === 'cadastro' && (
              <label className={inputClass}>
                <User size="1.25rem" className="text-primary" />
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-transparent placeholder:text-primary focus:outline-none"
                />
              </label>
            )}

            <label className={inputClass}>
              <LockKey size="1.25rem" className="text-primary" />
              <input
                type="password"
                required
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent placeholder:text-primary focus:outline-none"
              />
            </label>

            {mode === 'cadastro' && (
              <label className={inputClass}>
                <LockKey size="1.25rem" className="text-primary" />
                <input
                  type="password"
                  required
                  placeholder="Confirmar senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full bg-transparent placeholder:text-primary focus:outline-none"
                />
              </label>
            )}

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <button className="p-4 font-medium rounded-lg flex justify-center items-center font-light text-white bg-linear-[-68deg] from-brand-dark to-brand [&_svg]:min-w-6" type="submit">{mode === 'login' ? 'Entrar' : 'Criar conta'}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
