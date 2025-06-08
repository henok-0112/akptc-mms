import type { PropsWithChildren } from "react";

type TableDataProps = {
  className?: string;
};

const TableData: React.FC<PropsWithChildren<TableDataProps>> = ({
  children,
  className,
}) => {
  return (
    <td className={`p-5 py-3 border-b border-white text-xl ${className}`}>
      {children}
    </td>
  );
};

export default TableData;
