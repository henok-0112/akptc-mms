import type { MouseEventHandler, PropsWithChildren } from "react";

type TableDataProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLTableDataCellElement>;
};

const TableData: React.FC<PropsWithChildren<TableDataProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <td
      className={`p-5 py-3 border-b border-white text-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

export default TableData;
