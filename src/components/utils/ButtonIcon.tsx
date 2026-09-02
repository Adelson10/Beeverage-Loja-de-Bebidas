import React from 'react';

type buttonProps = React.ComponentProps<'button'> & React.PropsWithChildren;

const ButtonIcon = ({children, className, ...props}: buttonProps) => {
  return (
    <button className={`border-none bg-transparent inline-flex cursor-pointer ${className ?? ''}`} {...props}>{children}</button>
  )
}

export default ButtonIcon;