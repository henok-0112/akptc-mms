import type { MouseEventHandler, ReactNode } from "react";
import TableData from "./TableData";
import TableHeader from "./TableHeader";
import { TableBodyRow, TableHeaderRow } from "./TableRow";

type TableProps = {
  headers: Array<string>;
  bodyData: ReactNode;
  onRowClick?: MouseEventHandler<HTMLTableRowElement>;
};

const Table = ({ headers, bodyData, onRowClick }: TableProps) => {
  return (
    <div className="w-full overflow-auto rounded-2xl">
      <table className="table-auto whitespace-nowrap border-separate border-spacing-0">
        <thead className=" overflow-hidden">
          <TableHeaderRow>
            {headers.map((header, index) => {
              return (
                <TableHeader
                  key={index}
                  className={`${
                    index === 0
                      ? "rounded-tl-2xl"
                      : index === headers.length - 1
                      ? "rounded-tr-2xl"
                      : ""
                  }`}
                >
                  {header}
                </TableHeader>
              );
            })}
          </TableHeaderRow>
        </thead>
        <tbody className="bg-white/5 backdrop-blur-2xl rounded-b-2xl overflow-hidden">
          {bodyData}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
