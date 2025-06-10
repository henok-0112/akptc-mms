import { forwardRef, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Container from "./Container";

type TextFieldProps = {
  id?: string;
  label: string;
  value: string;
  name: string;
  setValue: Function;
  choices: Array<string>;
  onBlur: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLButtonElement>) => void;
};
const PrimaryDropDown = forwardRef<HTMLButtonElement, TextFieldProps>(
  ({ label, id, value, setValue, name, choices, onChange, onBlur }, ref) => {
    const [open, setOpen] = useState(false);
    const [displayText, setDisplayText] = useState("");

    const handleOpen = () => {
      setOpen(!open);
    };

    useEffect(() => {
      if (value && value !== "") {
        setDisplayText(value);
      }
    }, [value]);

    return (
      <div>
        <label htmlFor={id} className=" font-bold text-xl m-5 text-white">
          {label}
        </label>

        <div className="relative">
          <button
            className="cursor-pointer outline-none bg-white/20 backdrop-blur-xl shadow-lg border border-white/30 w-full rounded-4xl relative z-50 py-3 px-5 text-black placeholder:text-xl placeholder:text-white/80 text-shadow-2xs text-xl flex items-center"
            onClick={handleOpen}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            type="button"
            value={value!}
          >
            <span className="block w-11/12">
              {displayText == "" ? `Select ${label}` : displayText}
            </span>
            <FaChevronDown
              className={
                "transition-all" + " " + (open ? "rotate-180" : "rotate-0")
              }
            />
          </button>
          <div
            className={`grid ${
              open ? "mt-4 grid-rows-[1fr]" : " mt-0 grid-rows-[0fr]"
            } transition-all duration-1000`}
          >
            <Container
              className={` overflow-hidden ${
                open
                  ? "mt-0 opacity-100 pointer-events-auto"
                  : "mt-0 opacity-0 pointer-events-none"
              } transition-all duration-500 p-0`}
            >
              <ul>
                {choices.map((choice, index) => {
                  return (
                    <li
                      key={index}
                      className="text-center block text-xl p-2 text-black hover:text-white font-bold cursor-pointer my-1 hover:bg-green-500/50 rounded-lg"
                      onClick={() => {
                        setValue(choice);
                        setDisplayText(choice);
                        setOpen(false);
                      }}
                    >
                      {choice}
                    </li>
                  );
                })}
              </ul>
            </Container>
          </div>
        </div>
      </div>
    );
  }
);

export default PrimaryDropDown;
