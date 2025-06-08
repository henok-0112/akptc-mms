import { forwardRef, type ReactNode } from "react";

type TextFieldProps = {
  value?: string;
  placeholder?: string;
  name?: string;
  id: string;
  label?: string;
  type: string;
  suffixIcon?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type TextAreaProps = {
  value?: string;
  placeholder?: string;
  name?: string;
  id: string;
  label?: string;
  suffixIcon?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};
const PrimaryTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { name, value, placeholder, label, id, type, suffixIcon, onChange, onBlur },
    ref
  ) => {
    return (
      <div>
        {label ? (
          <label htmlFor={id} className=" font-bold text-xl m-5 text-white">
            {label}
          </label>
        ) : (
          ""
        )}

        <div className="flex items-center gap-3">
          <input
            className="outline-none bg-white/20 block backdrop-blur-xl shadow-lg border border-white/30 w-full rounded-4xl relative z-50 py-3 px-5 text-black placeholder:text-xl placeholder:text-gray-200/10 text-shadow-2xs text-xl"
            value={value}
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            placeholder={placeholder}
          />
          {suffixIcon ? suffixIcon : ""}
        </div>
      </div>
    );
  }
);

const PrimaryTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { name, value, placeholder, label, id, suffixIcon, onChange, onBlur },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id} className=" font-bold text-xl m-5 text-white">
          {label}
        </label>

        <div className="flex items-center gap-3">
          <textarea
            className="outline-none bg-white/20 block backdrop-blur-xl shadow-lg border border-white/30 w-full rounded-4xl relative z-50 py-3 px-5 text-black placeholder:text-xl placeholder:text-gray-200/10 text-shadow-2xs text-xl"
            name={name}
            id={id}
            placeholder={placeholder}
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={5}
          >
            {value}
          </textarea>
          {suffixIcon ? suffixIcon : ""}
        </div>
      </div>
    );
  }
);

export { PrimaryTextField, PrimaryTextArea };
