type ToastProps = {
  closeToast?: () => void;
  message: string;
};

const SuccessToast = ({ message }: ToastProps) => {
  return <p className="text-green-500/50 font-bold text-xl">{message}</p>;
};

const ErrorToast = ({ message }: ToastProps) => {
  return <p className="text-red-500/50 font-bold text-xl">{message}</p>;
};

export { SuccessToast, ErrorToast };
