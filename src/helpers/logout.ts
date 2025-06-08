let clearUserFunction: React.Dispatch<React.SetStateAction<boolean>> | null;

export const registerClearUserFunction = (
  fn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  clearUserFunction = fn;
};

export const clearUser = () => {
  if (clearUserFunction) {
    clearUserFunction(true);
  }
};
