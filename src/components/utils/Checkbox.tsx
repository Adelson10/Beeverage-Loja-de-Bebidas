import { Check, CheckFat } from '@phosphor-icons/react';
import type { InputHTMLAttributes } from 'react';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> & {
    className?: string;
};

const Checkbox = ({ className = '', ...props }: CheckboxProps) => (
    <span className={`relative inline-flex items-center justify-center shrink-0 w-[1.6rem] h-[1.6rem] rounded-[0.4rem] transition-colors ${className}`}>
        <input type="checkbox" className="peer absolute inset-0 w-full h-full m-0 cursor-pointer opacity-0" {...props} />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[0.3rem] border-2 border-brand-dark transition-all duration-[120ms] ease-in-out peer-checked:border-none peer-checked:bg-linear-to-b peer-checked:from-brand peer-checked:to-brand-dark [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
            <CheckFat size={16} weight="fill" color="white" />
        </span>
    </span>
);

export default Checkbox;
