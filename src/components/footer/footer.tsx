const Footer = () => {
  return (
    <>
      <div className="bg-(--color-brand-dark) w-full">

      </div>
      <div className="mx-[100px] py-[1.3rem] flex flex-row">
        <div className="px-2 flex-1">
          <p className="text-[0.8rem] font-semibold">
          © 2025 Todos os direitos reservados
          </p>
          <p className="text-[0.8rem] font-semibold">
            Beba com moderação. Não compartilhe este conteúdo com menores de idade.
          </p>
        </div>
        <div className="flex flex-row items-center flex-1 justify-around underline">
          <a href="" className="text-[0.7rem] font-semibold text-center">Consumo<br/>Responsável</a>
          <a href="" className="text-[0.7rem] font-semibold text-center">Política de<br/>Privacidade</a>
          <a href="" className="text-[0.7rem] font-semibold text-center">SAC</a>
          <a href="" className="text-[0.7rem] font-semibold text-center">Seja um<br/>revendedor</a>
          <a href="" className="text-[0.7rem] font-semibold text-center">Termos de<br/>uso</a>
        </div>
      </div>
    </>
  )
}

export default Footer
