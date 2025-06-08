import type { MouseEventHandler, PropsWithChildren } from "react";

type TableRowProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
};

export const TableHeaderRow: React.FC<PropsWithChildren<TableRowProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <tr className={`bg-green-400/50 ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
};

export const TableBodyRow: React.FC<PropsWithChildren<TableRowProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <tr
      className={`bg-transparent hover:bg-black/20 overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};
