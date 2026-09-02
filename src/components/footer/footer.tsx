import { Facebook, Instagram, X } from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <div className="bg-(--color-brand-dark) w-full py-[.5rem] flex flex-row px-[100px] mt-[4rem]">
        <div
          className="w-[100px] h-[100px] bg-(--color-bg)"
          style={{
            WebkitMaskImage: "url('/src/assets/Logo/Logo.png')",
            maskImage: "url('/src/assets/Logo/Logo.png')",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <div className="flex gap-8 items-center ml-auto">
          <a href=""><Instagram sx={{ color: "var(--color-bg)" , fontSize: "1.5rem" }}/></a>
          <a href=""><X sx={{ color: "var(--color-bg)" , fontSize: "1.5rem" }}/></a>
          <a href=""><Facebook sx={{ color: "var(--color-bg)" , fontSize: "1.5rem" }}/></a>
        </div>
      </div>
      <div className="mx-[100px] py-[1.3rem] flex flex-row text-(--color-brand-dark)">
        <div className="px-2 flex-1">
          <p className="text-[0.8rem] font-semibold">
          © 2025 Todos os direitos reservados
          </p>
          <p className="text-[0.8rem] font-semibold">
            Beba com moderação. Não compartilhe este conteúdo com menores de idade.
          </p>
        </div>
        <div className="flex flex-row items-center flex-1 justify-around">
          <a href="" className="text-[0.8rem] font-semibold text-center hover:underline">Consumo Responsável</a>
          <a href="" className="text-[0.8rem] font-semibold text-center hover:underline">Política de Privacidade</a>
          <a href="" className="text-[0.8rem] font-semibold text-center hover:underline">SAC</a>
          <a href="" className="text-[0.8rem] font-semibold text-center hover:underline">Seja um revendedor</a>
          <a href="" className="text-[0.8rem] font-semibold text-center hover:underline">Termos de uso</a>
        </div>
      </div>
    </>
  )
}

export default Footer
