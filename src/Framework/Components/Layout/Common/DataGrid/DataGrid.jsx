import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import "./DataGrid.scss";

function DataGrid(props) {
  const { className, loader, overlayNoRowsTemplate, ...restProps } = props;

  return (
    <div className={classNames("AGDataGrid", "ag-theme-blue", className)}>
      {loader !== false ? loader : null}
      <AgGridReact
        enableRangeSelection="false"
        rowSelection="false"
        overlayNoRowsTemplate={overlayNoRowsTemplate}
        defaultColDef={{
          sortable: true,
          resizable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          animateRows: true,
        }}
        {...restProps}
      />
    </div>
  );
}

export default DataGrid;

DataGrid.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};
