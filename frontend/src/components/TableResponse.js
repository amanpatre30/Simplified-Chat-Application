import React from "react";

const TableResponse = ({ table, theme }) => {
  if (!table || table.length === 0) return null;

  const borderClass = theme === "dark" ? "border-gray-600" : "border-black";
  const textClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <table className={`table-auto border-collapse border ${borderClass} mb-2`}>
      <tbody>
        {table.map((row, i) => (
          <tr key={i}>
            <td
              className={`border ${borderClass} px-4 py-2 font-bold ${textClass}`}
            >
              {row.key}
            </td>
            <td className={`border ${borderClass} px-4 py-2 ${textClass}`}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableResponse;
