import React, { useState, useEffect } from "react";
import { DataGrid, Footer, PageBar } from "Framework/Components/Layout";
import { AlertMessage, Loader } from "Framework/Components/Widgets";
import { FaPlus } from "react-icons/fa";
import { AiFillEdit, AiFillEye, AiFillPrinter } from "react-icons/ai";
import { dateToSpecificFormat, dateTimeCompanyFormat } from "Configuration/Utilities/dateFormat";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import BizClass from "./Invoice.module.scss";
import { AgGridColumn } from "ag-grid-react";
import { GetInvoiceForEdit, getInvoiceListData } from "Service/ApiMethods/invoice";
import InvoiceView from "Framework/InvoiceView/InvoiceView";

function Invoice() {
  const setAlertMessage = AlertMessage();

  //Set InvoiceData state to show and hide Invoice modal
  const [invoiceData, setInvoiceData] = useState();

  const setInvoiceDataFromApi = async (invoiceId) => {
    const response = await GetInvoiceForEdit(invoiceId);
    const responseData = response.ResponseData;
    const Invoice = responseData.Invoice[0];
    const Charges = responseData.Charges.map((val) => {
      return {};
    });
    const InvoiceDetails = responseData.InvoiceDetail.map((val, index) => {
      return {
        SerialNo: index + 1,
        ItemMasterName: val.ItemMasterName,
        HSN: "HSN",
        Quantity: val.Quantity_UOM,
        Unit: "Unit",
        PricePerUnit: val.PriceInvoiceCurrency,
        TotalValue: Number.parseInt(val.Quantity_UOM) * Number.parseInt(val.PriceInvoiceCurrency),
        DiscountIfAny: val.Discount_InvoiceCurrency,
        TaxabeValue: Number.parseInt(val.Quantity_UOM) * Number.parseInt(val.PriceInvoiceCurrency) - val.Discount_InvoiceCurrency,
      };
    });

    setInvoiceData({
      Invoice: {
        BranchName: Invoice.InvoiceAccountingBranchName,
        InvoiceCategory: "",
        GNRCategory: "",
        BranchAddressLine1: "",
        BranchAddressLine2: "",
        BranchPinCode: "",
        BranchEmailAddress: "",
        BranchPhoneNo: "",
        BranchGSTNo: "",
        InvoiceNo: "",
        InvoiceDate: Invoice.OutwardInvoiceDate,
        InvoiceDueDate: Invoice.InvoiceDueDate,
        CustomerName: "",
        CustomerEmailAddress: "",
        CustomerPhoneNo: "",
        BillingAddressName: "",
        BillingAddressLane1: "",
        BillingAddressLane2: "",
        ShippingAddressName: "",
        ShippingAddressLane1: "",
        ShippingAddressLane2: "",
      },
      Charges,
      InvoiceDetails,
    });
  };

  const [initialFormData, setInitialFormData] = useState({});

  const setFormDataFromApi = async (invoiceID) => {
    const response = await GetInvoiceForEdit("1");
    console.log("api response" + response);

    const responseData = {
      Invoice: [
        {
          OutwardInvoiceID: 24,
          InvoiceAccountingBranchID: 101,
          InvoiceExecutiveID: 0,
          OutwardInvoiceDate: "2022-09-27T18:30:00.000Z",
          InvoiceDueDate: "2022-09-27T18:30:00.000Z",
          InvoiceToCustomerID: 3,
          InvoiceToBranchID: 0,
          InvoiceToSupplierID: 0,
          InvoiceToAddressID: 1275,
          DispatchToAddressID: 1275,
          ItemPriceListID: 0,
          InvoiceStatusID: 0,
          CustomerPONO: "",
          CustomerPODate: "1899-11-29T18:38:50.000Z",
          InvoiceCurrencyID: 0,
          FXRate: 1,
          FXDateTime: null,
          CompanyMasterID: 0,
          DispatchFromWarehouseID: 0,
          DispacthToWarehouseID: 0,
          ECommChannelID: 0,
          ECOrderID: 0,
          ECOrderNo: "",
          ShippingCompanyID: 0,
          ShippingMethodID: 0,
          InsertUserID: 1,
          InsertIPAddress: "122.161.95.56",
          CancelUserID: 0,
          CancelDateTime: null,
          CancelIPAddress: "",
          CancelReasonCode: 0,
          CancelRemark: "",
          ApproveUserID: 0,
          ApproveDateTime: null,
          ApproveIPAddress: "",
          InvoiceAccountingBranchName: null,
          ModeOfTransport: null,
          VehicleNumber: null,
          DispatchDateTime: null,
          TransportRemarks: null,
          ExportBillNo: null,
          ExportBillDate: null,
          ExportPortCode: null,
          ExportDeclaration: null,
          ExportDeclaration1: null,
        },
      ],
      Charges: [
        {
          OutwardInvoiceID: 24,
          ChargeAmountBC: 2,
          ChargeAmountIC: 2,
          TaxDefinitionID: 2,
        },
      ],
      InvoiceDetail: [
        {
          OutwardInvoiceDetailID: 41,
          OutwardInvoiceID: 24,
          ItemMasterID: 5,
          ItemMakeID: 0,
          ItemBrandID: 0,
          PackingUnitID: 0,
          PackingTypeID: 0,
          NoOfBoxes: 0,
          Quantity_UOM: 1,
          ItemWeight: 0,
          PriceType: 1,
          PriceInvoiceCurrency: 10000,
          PriceBaseCurrency: 10000,
          OutwardDetailRemark: "",
          ExpiryDate: "1899-11-29T18:38:50.000Z",
          ItemMRP: 0,
          DiscountPercentage: 0,
          DiscountAmount: 0,
          Discount_BaseCurrency: 0,
          Discount_InvoiceCurrency: 0,
          DiscountTypeID: 0,
          DiscountRemarks: "",
          TaxDefinitionID: 2,
          TaxGroupID: 0,
          TaxPercentageApplicable: 5,
          TaxAmountApplicable: 450,
          TaxBaseCurrency: 450,
          TaxInvoiceCurrency: 450,
          ISReturnable: 0,
          ISFreeItem: 0,
          InsertUserID: 1,
          InsertDateTime: "2022-09-28T06:33:47.000Z",
          InsertIPAddress: "122.161.95.56",
          ItemMasterName: "Laptop",
        },
        {
          OutwardInvoiceDetailID: 42,
          OutwardInvoiceID: 24,
          ItemMasterID: 7,
          ItemMakeID: 0,
          ItemBrandID: 0,
          PackingUnitID: 0,
          PackingTypeID: 0,
          NoOfBoxes: 0,
          Quantity_UOM: 2,
          ItemWeight: 0,
          PriceType: 1,
          PriceInvoiceCurrency: 500,
          PriceBaseCurrency: 500,
          OutwardDetailRemark: "",
          ExpiryDate: "1899-11-29T18:38:50.000Z",
          ItemMRP: 0,
          DiscountPercentage: 0,
          DiscountAmount: 0,
          Discount_BaseCurrency: 0,
          Discount_InvoiceCurrency: 0,
          DiscountTypeID: 0,
          DiscountRemarks: "",
          TaxDefinitionID: 4,
          TaxGroupID: 0,
          TaxPercentageApplicable: 18,
          TaxAmountApplicable: 170.1,
          TaxBaseCurrency: 170.1,
          TaxInvoiceCurrency: 170.1,
          ISReturnable: 0,
          ISFreeItem: 0,
          InsertUserID: 1,
          InsertDateTime: "2022-09-28T06:33:47.000Z",
          InsertIPAddress: "122.161.95.56",
          ItemMasterName: "PenDrive",
        },
      ],
    };
    const Invoice = responseData.Invoice[0];
    const Charges = responseData.Charges.map((val) => {
      return {};
    });
    const InvoiceDetails = responseData.InvoiceDetail.map((val, index) => {
      return {
        SerialNo: index + 1,
        ItemMasterName: val.ItemMasterName,
        HSN: "HSN",
        Quantity: val.Quantity_UOM,
        Unit: "Unit",
        PricePerUnit: val.PriceInvoiceCurrency,
        TotalValue: Number.parseInt(val.Quantity_UOM) * Number.parseInt(val.PriceInvoiceCurrency),
        DiscountIfAny: val.Discount_InvoiceCurrency,
        TaxabeValue: Number.parseInt(val.Quantity_UOM) * Number.parseInt(val.PriceInvoiceCurrency) - val.Discount_InvoiceCurrency,
      };
    });

    setInitialFormData({
      Invoice: {
        BranchName: Invoice.InvoiceAccountingBranchName,
        InvoiceCategory: "invoice Category",
        GNRCategory: "GNR Category",
        BranchAddressLine1: "Address Line 1",
        BranchAddressLine2: "BranchAddressLine2",
        BranchPinCode: "Pin Code",
        BranchEmailAddress: "Email Address",
        BranchPhoneNo: "Mob No",
        BranchGSTNo: "GST No",
        InvoiceNo: "Invoice No",
        InvoiceDate: Invoice.OutwardInvoiceDate,
        InvoiceDueDate: Invoice.InvoiceDueDate,
        CustomerName: "CustomerName",
        CustomerEmailAddress: "CustomerEmailAddress",
        CustomerPhoneNo: "CustomerPhoneNo",
        BillingAddressName: "BillingAddressName",
        BillingAddressLane1: "BillingAddressLane1",
        BillingAddressLane2: "BillingAddressLane2",
        ShippingAddressName: "ShippingAddressName",
        ShippingAddressLane1: "ShippingAddressLane1",
        ShippingAddressLane2: "ShippingAddressLane2",
      },
      Charges,
      InvoiceDetails,
    });
  };

  const [openCreateInvoiceModal, setOpenCreateInvoiceModal] = useState(false);

  const toggleCreateInvoiceModal = () => {
    setOpenCreateInvoiceModal(!openCreateInvoiceModal);
  };

  const props = {
    toggleCreateInvoiceModal,
  };

  const [invoiceList, setInvoiceList] = useState([]);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);
  const getInvoiceData = async () => {
    //debugger;
    try {
      setIsLoadingInvoice(true);
      const formData = {
        AccountingBranchID: "101",
        PageIndex: "1",
        PageSize: "0",
        SearchText: "#ALL",
        FromDate: "2022-10-06",
        ToDate: "2022-10-06",
      };
      console.log(formData);
      const result = await getInvoiceListData(formData);
      console.log("result", result);
      setIsLoadingInvoice(false);
      if (result.ResponseCode === 1) {
        if (result.ResponseData && result.ResponseData.Invoice.length > 0) {
          setInvoiceList(result.ResponseData.Invoice);
        } else {
          setInvoiceList([]);
        }
      } else {
        setInvoiceList([]);
        console.log(result.ResponseMessage);
      }
    } catch (error) {
      setAlertMessage({ open: true, type: "error", msg: error });
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoiceData();
  }, []);

  const toggleEditInvoicePopup = (data) => {
    console.log(data);
  };

  const toggleViewInvoicePopup = (data) => {
    setInvoiceDataFromApi(data.OutwardInvoiceID);
  };

  return (
    <>
      {openCreateInvoiceModal && <CreateInvoice {...props} />}
      <div className={BizClass.Box}>
        {/* Invoice View */}
        {invoiceData && <InvoiceView invoiceData={invoiceData} setInvoiceData={setInvoiceData} />}
        <PageBar className={BizClass.PageBar}>
          <span>Invoices</span>
          <PageBar.Button onClick={() => toggleCreateInvoiceModal()}>
            <p className={BizClass.ButtonText}>
              <FaPlus />
              Create Invoice
            </p>
          </PageBar.Button>
        </PageBar>
        <DataGrid
          rowData={invoiceList}
          loader={isLoadingInvoice ? <Loader /> : null}
          frameworkComponents={{
            actionTemplate: cellTemplate,
          }}
        >
          <AgGridColumn
            field="#"
            headerName="Action"
            width={98}
            pinned="left"
            cellRenderer="actionTemplate"
            cellRendererParams={{
              toggleEditInvoicePopup: toggleEditInvoicePopup,
              toggleViewInvoicePopup: toggleViewInvoicePopup,
            }}
          />
          <AgGridColumn valueGetter="node.rowIndex + 1" field="#" headerName="Sr No." width={80} type="rightAligned" pinned="left" />
          <AgGridColumn
            field="#"
            headerName="Invoice Date"
            width={120}
            cellRenderer={(node) => {
              return dateToSpecificFormat(node.data.OutwardInvoiceDate.split("T")[0], "DD-MM-YYYY");
            }}
            pinned="left"
          />
          <AgGridColumn field="InvoiceNumber" headerName="Invoice No." width={120} pinned="left" />
          <AgGridColumn field="InvoiceCategoryName" headerName="Invoice Type" width={150} />
          <AgGridColumn field="InvoiceToCustomer" headerName="Customer Name" width={250} />
          <AgGridColumn field="InvoiceToAddress" headerName="Bill To" width={140} />
          <AgGridColumn field="DispatchToAddress" headerName="Ship To" width={140} />
          <AgGridColumn field="NoOfItems" headerName="Item (s)" width={98} type="rightAligned" />
          <AgGridColumn field="InvoiceGrossAmount_OC" headerName="Amount" width={98} />
          <AgGridColumn field="InvoiceDiscountAmount_OC" headerName="Discount" width={98} type="rightAligned" cellRenderer="discountTemplate" />
          <AgGridColumn field="InvoiceTaxAmount_OC" headerName="Tax" width={98} type="rightAligned" cellRenderer="taxTemplate" />
          <AgGridColumn field="GrossTotal_OC" headerName="Gross Total" width={120} type="rightAligned" cellRenderer="grossTotalTemplate" />
          <AgGridColumn field="InvoiceStatus" headerName="Status" width={120} />
          <AgGridColumn field="PaymentMethod" headerName="Payment Method" width={150} />
          <AgGridColumn field="InsertedUserName" headerName="Created By" width={160} />
          <AgGridColumn
            field="InsertedUserName"
            headerName="Created On"
            width={150}
            cellRenderer={(node) => {
              return dateTimeCompanyFormat(node.data.InsertDateTime);
            }}
          />
          <AgGridColumn field="DispatchBranch" headerName="Dispatch Branch" width={140} />
        </DataGrid>
        <Footer />
      </div>
    </>
  );
}

export default Invoice;

const cellTemplate = (props) => {
  const toggleEditInvoicePopup = () => {
    props.toggleUpdateStagePopup(true, props.data);
  };

  const toggleViewInvoicePopup = () => {
    props.toggleViewInvoicePopup(props.data);
  };

  console.log(props.data);
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <AiFillEye style={{ fontSize: "18px", color: "#34495E", marginTop: "1px" }} title="View  Invoice" onClick={() => toggleViewInvoicePopup()} />
      <AiFillEdit style={{ fontSize: "18px", color: "#34495E", marginTop: "1px" }} title="Edit Invoice" onClick={() => toggleEditInvoicePopup()} />
      <AiFillPrinter style={{ fontSize: "18px", color: "#34495E", marginTop: "1px" }} title="Edit Invoice" onClick={() => toggleEditInvoicePopup()} />
    </div>
  );
};
