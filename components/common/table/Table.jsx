import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TableStyles } from "./TableStyles";
import useTable from "./useTable";

/**
 * @typedef {Object} ColumnType
 * @property {string} [title]
 * @property {string} [id]
 * @property {string} [renderType] - one of `TABLE_CELL_TYPE` values supported
 * @property {Function} [render] - to use this, change the `renderType` to `CUSTOM`
 * @property {string} [width] - supports every css standard unit (e.g. `percentage`, `rem`, ...)
 */

/**
 * @typedef {Object} TableProps
 * @property {ColumnType[]} columns
 * @property {Object[]} data
 * @property {boolean} [paginatable]
 * @property {number} [pageSize]
 * @property {number} [totalSize]
 * @property {boolean} [isLoading]
 * @property {Function} [fetchData]
 * @property {boolean} [hasFetchError]
 * @property {boolean} [hasRowId] - auto generated per rowIndex and currentPage
 */

/**
 * @param {TableProps} props
 */
const Table = ({
  // TODO: @ali: make columns support custom width
  columns,
  data,
  paginatable = true,
  pageSize = 10,
  totalSize,
  isLoading,
  fetchData,
  hasFetchError,
  hasRowId = false,
}) => {
  const { currentPage, setCurrentPage, renderCell } = useTable({
    fetchData,
    pageSize,
  });

  return (
    <TableStyles>
      <DataTable
        value={hasFetchError ? [] : data}
        emptyMessage={hasFetchError ? "مجددا تلاش کنید" : "محتوایی یافت نشد"}
        loading={isLoading}
        loadingIcon="spinner-border"
        paginator={paginatable}
        first={(currentPage - 1) * pageSize}
        onPage={(event) => setCurrentPage(event.page + 1)}
        currentPageReportTemplate={"نمایش {first} تا {last}  از {totalRecords}"}
        paginatorTemplate={
          "CurrentPageReport LastPageLink NextPageLink PageLinks PrevPageLink FirstPageLink"
        }
        {...(totalSize && {
          totalRecords: totalSize,
          lazy: true,
        })}
        rows={pageSize}
      >
        {hasRowId && (
          <Column
            header="ردیف"
            body={(data, props) =>
              (currentPage - 1) * pageSize + props.rowIndex + 1
            }
            headerStyle={{ width: "4rem" }}
          />
        )}

        {columns?.map((column, index) => (
          <Column
            key={index}
            field={column.id}
            header={column.title}
            headerStyle={{ width: column.width }}
            body={(data) =>
              renderCell(data, column.id, column.renderType, column.render)
            }
          />
        ))}
      </DataTable>
    </TableStyles>
  );
};

export default Table;
