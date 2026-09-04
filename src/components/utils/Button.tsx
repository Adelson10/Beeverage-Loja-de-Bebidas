import React from 'react';

type buttonProps = React.ComponentProps<'button'> & React.PropsWithChildren;

const Button = ({children, ...props}: buttonProps) => {
  return (
    <button className='p-4 rounded-lg flex justify-center items-center font-light text-[0.8rem] text-white bg-linear-[-68deg] from-brand-dark to-brand [&_svg]:min-w-6 transition-[filter] duration-200 hover:brightness-90 active:brightness-95' {...props}>{children}</button>
  )
}

export default Button;
