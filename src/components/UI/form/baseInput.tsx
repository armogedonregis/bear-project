import { IFormStyle } from "@/types/form";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  pass?: boolean;
  formStyle?: IFormStyle;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  postLabel?: string;
}

export const BaseInput = React.forwardRef(
  ({ label, error, pass, className, formStyle = 'formAuth', iconLeft, iconRight, postLabel, ...props }: Props, ref: React.LegacyRef<HTMLInputElement>) => {

    const inputClassName = [
      'outline-none',
      'text-sm', 'w-full',
    ]

    const style: Record<IFormStyle, any> = {
      formAuth: `${inputClassName.join(' ')} ${iconLeft ? "px-10" : "px-6"} rounded-2xl h-10 text-black placeholder:text-textPlaceholder ${error ? 'border-tertiary border-2' : 'border-1 border-borderPrimary'}`,
    }

    return (
      <div className={`flex flex-col relative${className ? ' ' + className : ''}`}>
        {label && <label className="text-xs text-left text-textPlaceholder">{label}</label>}
        <div className="relative">
          {iconLeft && <div className="absolute top-1/2 -translate-y-1/2 left-4">{iconLeft}</div>}
          <input type={pass ? 'password' : 'text'} className={style[formStyle]} ref={ref} {...props} />
          {iconRight && <div className="absolute top-1/2 -translate-y-1/2 right-4">{iconRight}</div>}
        </div>
        {error &&
          <p className="text-xs text-tertiary">{error}</p>
        }
        {postLabel && <p className="text-xs text-textPlaceholder">{postLabel}</p>}
      </div>
    )
  }
);

BaseInput.displayName = "BaseInput";