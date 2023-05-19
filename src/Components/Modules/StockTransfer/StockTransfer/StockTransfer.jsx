import React, { useState } from "react";
import { DataGrid, Footer, PageBar } from "Framework/Components/Layout";
import { FaPlus } from "react-icons/fa";
import CreateStockTransfer from "Components/Modules/StockTransfer/CreateStockTransfer/CreateStockTransfer";
import BizClass from "./StockTransfer.module.scss";
import { AgGridColumn } from "ag-grid-react";

function StockTransfer() {
  const [openCreateInvoiceModal, setOpenCreateInvoiceModal] = useState(false);

  const toggleCreateInvoiceModal = () => {
    setOpenCreateInvoiceModal(!openCreateInvoiceModal);
  };

  const props = {
    toggleCreateInvoiceModal,
  };

  return (
    <>
      {openCreateInvoiceModal && <CreateStockTransfer {...props} />}
      <div className={BizClass.Box}>
        <PageBar className={BizClass.PageBar}>
          <span>Stock Transfer</span>
          <PageBar.Button onClick={() => toggleCreateInvoiceModal()}>
            <p className={BizClass.ButtonText}>
              <FaPlus />
              Create Stock Transfer
            </p>
          </PageBar.Button>
        </PageBar>
        <DataGrid rowData={[]}>
          <AgGridColumn field="#" headerName="Action" width={98} pinned="left" />
          <AgGridColumn valueGetter="node.rowIndex + 1" field="#" headerName="Sr No." width={80} type="rightAligned" pinned="left" />
          <AgGridColumn field="InvoiceNumber" headerName="Invoice No." width={120} type="rightAligned" pinned="left" />
          <AgGridColumn field="DocumentName" headerName="Invoice Type" width={180} />
          <AgGridColumn field="#" headerName="Invoice Date" width={130} />
          <AgGridColumn field="CustomerName" headerName="Customer Name" width={280} />
          <AgGridColumn field="NoOfItems" headerName="Item (s)" width={98} type="rightAligned" />
          <AgGridColumn field="InvoiceGrossAmount_OC" headerName="Amount" width={98} />
          <AgGridColumn field="InvoiceDiscountAmount_OC" headerName="Discount" width={98} type="rightAligned" cellRenderer="discountTemplate" />
          <AgGridColumn field="InvoiceTaxAmount_OC" headerName="Tax" width={98} type="rightAligned" cellRenderer="taxTemplate" />
          <AgGridColumn field="GrossTotal_OC" headerName="Gross Total" width={120} type="rightAligned" cellRenderer="grossTotalTemplate" />
          <AgGridColumn field="InvoiceStatus" headerName="Status" width={120} type="rightAligned" />
          <AgGridColumn field="DispatchStatus" headerName="Dispatch Status" width={140} />
          <AgGridColumn field="SalesExecutiveName" headerName="Executive" width={160} />
          <AgGridColumn field="PaymentMethod" headerName="Payment Method" width={160} />
          <AgGridColumn field="BusinessUnitName" headerName="Business Unit" width={160} />
          <AgGridColumn field="ReferenceName" headerName="Reference Type" width={160} />
          <AgGridColumn field="InvoiceReferenceNo" headerName="Reference No" width={120} type="rightAligned" />
          <AgGridColumn field="InsertedUserName" headerName="Creator" width={160} />
          <AgGridColumn field="DispatchBranch" headerName="Dispatch Branch" width={140} />
        </DataGrid>
        <Footer />
      </div>
    </>
  );
}

export default StockTransfer;
