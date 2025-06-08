import type { PropsWithChildren } from "react";

type TableHeaderProps = {
  className?: string;
};

const TableHeader: React.FC<PropsWithChildren<TableHeaderProps>> = ({
  children,
  className,
}) => {
  return (
    <th className={`p-5 py-3 text-white text-xl capitalize ${className}`}>
      {children}
    </th>
  );
};

export default TableHeader;
