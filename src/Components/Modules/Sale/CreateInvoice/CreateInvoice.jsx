import React, { useState, useRef } from "react";
import { DataGrid, PageBar } from "Framework/Components/Layout";
import Form from "Framework/Components/Layout/FormGroup/FormGroup";
import Modal from "Framework/Components/Layout/Modal/Modal";
import { AiFillEdit, AiFillDelete, AiFillPlusSquare, AiOutlinePlus } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";
import moment from "moment";
import BizClass from "./CreateInvoice.module.scss";
import { useEffect } from "react";
import { AlertMessage, Loader, Button } from "Framework/Components/Widgets";
import {
  createInvoice,
  getCompanyAddress,
  getGSTCategory,
  getInvoiceCategory,
  getItemMaster,
  getCustomer,
  getSupplier,
  getBRAddress,
  getInvoiceChargeMaster,
  GetInvoiceForEdit,
} from "Service/ApiMethods/invoice";
import { getCountryListData, getStateListData, getCityListData } from "Service/ApiMethods/deliveryChallan";
import { dateToSpecificFormat } from "Configuration/Utilities/dateFormat";
import SelectPopup, { SelectAddressCard, SelectPopupContent } from "Framework/Components/Layout/SelectPopup/SelectPopup";
import classNames from "classnames";

import InvoiceView from "Framework/InvoiceView/InvoiceView";

function CreateInvoice(props) {
  //Invoice Preview Button State to show and hide
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  //Set InvoiceData state to show and hide Invoice modal
  const [invoiceData, setInvoiceData] = useState();

  const setInvoiceDataFromApi = async (invoiceId) => {
    //const responseData = await GetInvoiceForEdit()
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

    setInvoiceData({
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
      Charges: {},
      InvoiceDetails,
    });
  };

  const [pageTile, setPageTile] = useState("Bill Of Supply");
  const { toggleCreateInvoiceModal } = props;

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const [openAddressModal, setOpenAddressModal] = useState({ IsOpen: false, IsBillTo: false });
  const toggleAddressModal = (isBillTo) => {
    setOpenAddressModal({ IsOpen: !openAddressModal.IsOpen, IsBillTo: isBillTo });
  };

  const [openAddShipToAddressModal, setOpenAddShipToAddressModal] = useState(false);
  const toggleAddShipToAddressModal = () => {
    setOpenAddShipToAddressModal(!openAddShipToAddressModal);
  };

  const setAlertMessage = AlertMessage();

  // Form Values
  const [formValues, setFormValues] = useState({
    selectedBranch: null,
    selectedBranchShipTo: null,
    selectedBranchAddress: null,
    selectedBranchAddressShipTo: null,
    selectedInvoiceCategory: null,
    selectedGRNCategory: null,
    txtInvoiceNo: "",
    txtInvoiceDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    txtDueDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    selectedBR: null,
    selectedBillToAddress: null,
    selectedShipToAddress: null,
    selecedBankAccount: null,
    selectedPaymentMode: null,
    txtPaymentAmount: "",
    addedItems: [
      {
        Item: null,
        HSN_SAC: "",
        TaxDefinitionValue: "",
        TaxDefinitionID: "",
        Quantity: "",
        UOM: "",
        Rate: "",
        Amount: "",
        DiscountType: null,
        DiscountValue: "",
        TaxableAmount: "",
        GST: "",
        TotalAmount: "",
      },
    ],
    addedCharges: [],
    txtNotes: "",
    txtAdjustment: "",
    txtTermCondition: "",
    txtTotal: "",
    txtTotalGST: "",
    txtTotalValue: "",
  });

  // Select Bank Account
  const [bankAccountOptions, setBankAccountOptions] = useState([
    {
      BankAccountId: 1,
      BankAccountName: "BankAccount 1",
    },
    ,
    {
      BankAccountId: 2,
      BankAccountName: "BankAccount 2",
    },
  ]);

  const [isLoadingBankAccountOptions, setIsLoadingBankAccountOptions] = useState(false);

  // Select PaymentModal
  const paymentModalOption = [
    { label: "Cheque", value: "Cheque" },
    { label: "Demand Draft", value: "Demand Draft" },
    { label: "UPI", value: "UPI" },
  ];
  const [isLoadingPaymentModeOptions, setIsLoadingPaymentModeOptions] = useState(false);

  // Select BNItem
  const [bnItemOptions, setBnItemOptions] = useState([]);
  const [isLoadingBnItem, setIsLoadingBnItem] = useState(false);
  const getItemMasterData = async () => {
    setIsLoadingBnItem(true);
    let response = await getItemMaster();
    setIsLoadingBnItem(false);
    if (response.ResponseCode === 1) {
      setBnItemOptions(response.ResponseData);
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  // Select Branch
  const [branchOptions, setBranchOptions] = useState([]);
  const [isLoadingBranch, setIsLoadingBranch] = useState(false);
  // const [branchShipToOptions, setBranchShipToOptions] = useState([]);
  // const [isLoadingBranchShipTo, setIsLoadingBranchShipTo] = useState(false);
  const getBranchOptions = async () => {
    setIsLoadingBranch(true);
    const response = await getCompanyAddress();
    setIsLoadingBranch(false);
    if (response.ResponseCode === 1) {
      setBranchOptions(response.ResponseData);
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  // const getBranchShipToOptions = async (pCompanyAddressID) => {
  //   debugger;
  //   setIsLoadingBranchShipTo(true);
  //   let filterBranchShipToOptionsList = branchOptions.filter((data) => {
  //     return data.CompanyAddressID === pCompanyAddressID;
  //   });
  //   setBranchShipToOptions(filterBranchShipToOptionsList);
  //   setIsLoadingBranchShipTo(false);
  // };

  // Select Invoice Category
  const [invoiceCategoryOptions, setInvoiceCategoryOptions] = useState([]);
  const [isLoadingInvoiceCategory, setIsLoadingInvoiceCategory] = useState(false);
  const getInvoiceCategoryOptions = async () => {
    setIsLoadingInvoiceCategory(true);
    const response = await getInvoiceCategory();
    setIsLoadingInvoiceCategory(false);
    if (response.ResponseCode === 1) {
      let filterInvoiceCategoryList = response.ResponseData.filter((data) => {
        return data.InvoiceCategoryID === 1001 || data.InvoiceCategoryID === 1002;
      });
      setInvoiceCategoryOptions(filterInvoiceCategoryList);
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  // Select GST Category
  const [gstCategoryOption, setGstCategoryOption] = useState([]);
  const [isLoadingGstCategoryOption, setIsLoadingGstCategoryOption] = useState(false);
  const getGstCategoryOptions = async () => {
    setIsLoadingGstCategoryOption(true);
    const response = await getGSTCategory();
    setIsLoadingGstCategoryOption(false);
    if (response.ResponseCode === 1) {
      setGstCategoryOption(response.ResponseData);
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  const [addressList, setAddressList] = useState([]);
  const [isLoadingAddressList, setIsLoadingAddressList] = useState(false);
  const getAddressList = async (brId) => {
    setIsLoadingAddressList(true);
    const response = await getBRAddress(brId);
    setIsLoadingAddressList(false);
    if (response.ResponseCode === 1) {
      if (response.ResponseData && response.ResponseData.length > 0) {
        let address = response.ResponseData.map((add, index) => {
          let addressText = `${add.AddressLine1} ${add.AddressLine2 ? "," + add.AddressLine2 : ""} ${add.PinCode ? "," + add.PinCode : ""}`;
          return { ...add, AddressText: addressText, IsSelected: false };
        });
        setAddressList(address);
      }
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  const [invoiceChargeOptions, setInvoiceChargeOptions] = useState([]);
  const [isLoadingInvoiceChargeOption, setIsLoadingInvoiceChargeOption] = useState(false);
  const getInvoiceChargeList = async () => {
    setIsLoadingInvoiceChargeOption(true);
    const response = await getInvoiceChargeMaster();
    setIsLoadingInvoiceChargeOption(false);
    if (response.ResponseCode === 1) {
      setInvoiceChargeOptions(response.ResponseData);
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  //set default address after customer or supplier selection
  useEffect(() => {
    if (addressList && addressList.length > 0) {
      let defaultAddress = addressList.find((x) => x.IsDefaultAddress === 1);
      if (defaultAddress) {
        formValues["selectedBillToAddress"] = defaultAddress;
        formValues["selectedShipToAddress"] = defaultAddress;
        setFormValues({ ...formValues });
      }
    }
  }, [addressList]);

  // useEffect(() => {
  //   console.log("bnItemOptions", bnItemOptions);
  //   console.log("branchOptions", branchOptions);
  // }, [bnItemOptions, branchOptions]);

  useEffect(() => {
    getBranchOptions();
    getItemMasterData();
    getInvoiceCategoryOptions();
    getGstCategoryOptions();
    getInvoiceChargeList();
  }, []);

  //set customer or supplier selection
  const updateBR = (br) => {
    formValues["selectedBillToAddress"] = null;
    formValues["selectedShipToAddress"] = null;
    setFormValues({ ...formValues, ["selectedBR"]: br });
    if (br && br.BRID) getAddressList(br.BRID);
  };

  //Update Form Values State
  /**
   *
   * @param {string} name
   * @param {*} value
   * @param {number} index
   */
  const updateState = (name, value) => {
    if (name === "selectedBranch") {
      formValues["selectedBranchAddress"] = value;
    }
    if (name === "selectedBranchShipTo") {
      formValues["selectedBranchAddressShipTo"] = value;
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const updateItemState = (name, value, index) => {
    let arrItems = [...formValues.addedItems];
    arrItems[index][name] = value;
    if (name == "Quantity" || name == "Rate" || name === "DiscountType" || name === "DiscountValue" || name === "Item") {
      if (name === "Item") {
        arrItems[index]["HSN_SAC"] =
          value && value.HSN_SACNo
            ? value.HSN_SACNo + (value.TaxDefinitionValue ? " - " + value.TaxDefinitionValue + "%" : " - 0%")
            : value && value.TaxDefinitionValue
            ? value.TaxDefinitionValue + "%"
            : "0%";
        arrItems[index]["TaxDefinitionValue"] = value && value.TaxDefinitionValue ? value.TaxDefinitionValue : "0";
        arrItems[index]["TaxDefinitionID"] = value && value.TaxDefinitionID ? value.TaxDefinitionID : "0";
        arrItems[index]["UOM"] = value && value.UOMMasterName ? value.UOMMasterName : "";
      } else if (name === "DiscountType") {
        arrItems[index]["DiscountValue"] = "";
      }

      let qty = arrItems[index]["Quantity"] ? Number(arrItems[index]["Quantity"]) : 0;
      let rate = arrItems[index]["Rate"] ? Number(arrItems[index]["Rate"]) : 0;
      let amount = qty * rate;
      arrItems[index]["Amount"] = amount.toFixed(2);

      let discountAmount = 0;
      if (arrItems[index]["DiscountType"] && arrItems[index]["DiscountType"].value === "%") {
        let discountPercent = arrItems[index]["DiscountValue"] ? Number(arrItems[index]["DiscountValue"]) : 0;
        if (discountPercent > 0) {
          discountAmount = (discountPercent / 100) * amount;
        }
      } else if (arrItems[index]["DiscountType"] && arrItems[index]["DiscountType"].value === "V") {
        discountAmount = arrItems[index]["DiscountValue"] ? Number(arrItems[index]["DiscountValue"]) : 0;
      }
      let taxableAmount = qty * rate - discountAmount;
      arrItems[index]["TaxableAmount"] = taxableAmount.toFixed(2);

      let taxPercent = arrItems[index]["TaxDefinitionValue"] ? Number(arrItems[index]["TaxDefinitionValue"]) : 0;
      let taxAmount = (taxPercent / 100) * taxableAmount;
      arrItems[index]["GST"] = taxAmount.toFixed(2);
      arrItems[index]["TotalAmount"] = (taxableAmount + taxAmount).toFixed(2);
    }

    // else if (name == "Item") {
    //   if (value && formValues.addedItems.length - 1 === index) {
    //     arrItem.push({
    //       Item: null,
    //       Quantity: "",
    //       Rate: "",
    //       GST: "",
    //       Amount: ""
    //     });
    //   }
    // }
    setFormValues({ ...formValues, addedItems: arrItems });
    calculateTotal();
  };

  //Validate current item line and Add a new blank row(for new item selection)
  const addNewItem = (index) => {
    let arrItems = [...formValues.addedItems];
    if (!validateItem(arrItems[index])) {
      return;
    }
    arrItems.push({
      Item: null,
      HSN_SAC: "",
      TaxDefinitionValue: "",
      TaxDefinitionID: "",
      Quantity: "",
      UOM: "",
      Rate: "",
      Amount: "",
      DiscountType: "",
      DiscountValue: "",
      TaxableAmount: "",
      GST: "",
      TotalAmount: "",
    });
    setFormValues({ ...formValues, addedItems: arrItems });
  };

  //Remove item from item list
  const removeItem = (index) => {
    let arrItems = [...formValues.addedItems];
    arrItems.splice(index, 1);
    setFormValues({ ...formValues, addedItems: arrItems });
  };

  const validateItem = (item) => {
    if (!item.Item) {
      setAlertMessage({ open: true, type: "warning", message: "Please select an item." });
      return false;
    } else if (!item.Quantity) {
      setAlertMessage({ open: true, type: "warning", message: "Please enter Quantity." });
      return false;
    } else if (Number(item.Quantity) === 0) {
      setAlertMessage({ open: true, type: "warning", message: "Quantity can not be zero." });
      return false;
    } else if (!item.Rate) {
      setAlertMessage({ open: true, type: "warning", message: "Please enter Rate." });
      return false;
    } else if (Number(item.Rate) === 0) {
      setAlertMessage({ open: true, type: "warning", message: "Rate can not be zero." });
      return false;
    }
    return true;
  };

  const calculateTotal = () => {
    //debugger;
    let arrItems = [...formValues.addedItems];
    const sumItem = arrItems.reduce((partialSum, item) => partialSum + (item.TotalAmount ? Number(item.TotalAmount) : 0), 0);
    let arrCharges = [...formValues.addedCharges];
    const sumCharge = arrCharges.reduce((partialSum, item) => partialSum + (item.TotalValue ? Number(item.TotalValue) : 0), 0);

    const sumItemValue = arrItems.reduce((partialSum, item) => partialSum + (item.TaxableAmount ? Number(item.TaxableAmount) : 0), 0);
    const sumChargeValue = arrCharges.reduce((partialSum, item) => partialSum + (item.TaxableValue ? Number(item.TaxableValue) : 0), 0);
    const sumItemGST = arrItems.reduce((partialSum, item) => partialSum + (item.GST ? Number(item.GST) : 0), 0);
    const sumChargeGST = arrCharges.reduce((partialSum, item) => partialSum + (item.GST ? Number(item.GST) : 0), 0);

    setFormValues({
      ...formValues,
      txtTotal: (sumItem + sumCharge).toFixed(2),
      txtTotalGST: (sumItemGST + sumChargeGST).toFixed(2),
      txtTotalValue: (sumItemValue + sumChargeValue).toFixed(2),
    });

    if (formValues.txtTotalGST === "" || formValues.txtTotalGST === "0.00") {
      setPageTile("Bill Of Supply");
    } else {
      setPageTile("Tax Invoice");
    }
  };

  /*
  Region To add charges
  set form data to add charges
  update state
  validate on add charge
  remove charge from list
  */
  const [formValuesCharge, setFormValuesCharge] = useState({
    selectedCharge: null,
    TaxableValue: "",
    TaxDefinitionValue: "",
    GST: "",
    TotalValue: "",
  });

  const updateChargeState = (name, value) => {
    formValuesCharge[name] = value;
    if (name === "selectedCharge") {
      formValuesCharge["TaxDefinitionValue"] = value && value.TaxDefinitionValue ? value.TaxDefinitionValue : "0";
    }
    let taxableValue = formValuesCharge["TaxableValue"] ? Number(formValuesCharge["TaxableValue"]) : 0;
    let taxPercent = formValuesCharge["TaxDefinitionValue"] ? Number(formValuesCharge["TaxDefinitionValue"]) : 0;
    let taxAmount = (taxPercent / 100) * taxableValue;
    formValuesCharge["GST"] = taxAmount.toFixed(2);
    formValuesCharge["TotalValue"] = (taxableValue + taxAmount).toFixed(2);
    setFormValuesCharge({ ...formValuesCharge });
  };

  const handleChargeValidation = () => {
    try {
      if (!formValuesCharge.selectedCharge) {
        setAlertMessage({ open: true, type: "warning", message: "Please select Invoice Charge." });
        return false;
      }
      if (!formValuesCharge.TaxableValue) {
        setAlertMessage({ open: true, type: "warning", message: "Please enter amount." });
        return false;
      } else if (Number(formValuesCharge.TaxableValue) === 0) {
        setAlertMessage({ open: true, type: "warning", message: "Amount can not be zero." });
        return false;
      }
      return true;
    } catch (error) {
      setAlertMessage({ open: true, type: "error", message: "Somethig went wrong." });
      return false;
    }
  };

  //To add charges in list
  const addCharges = () => {
    if (!handleChargeValidation()) {
      return;
    }
    let arrCharges = [...formValues.addedCharges];
    arrCharges.push(formValuesCharge);
    setFormValues({ ...formValues, addedCharges: arrCharges });
    setFormValuesCharge({
      selectedCharge: null,
      TaxableValue: "",
      TaxDefinitionValue: "",
      GST: "",
      TotalValue: "",
    });
  };

  useEffect(() => {
    calculateTotal();
  }, [formValues.addedCharges, formValues.addedItems, formValues.txtTotalGST, formValues.txtTotalValue]);

  //To remove invoice charge from list
  const removeCharges = (index) => {
    let arrCharges = [...formValues.addedCharges];
    arrCharges.splice(index, 1);
    setFormValues({ ...formValues, addedCharges: arrCharges });
  };

  useEffect(() => {
    //console.log("formValues", formValues);
  }, [formValues]);

  const handleValidation = () => {
    try {
      if (!formValues.selectedBranch) {
        setAlertMessage({ open: true, type: "warning", message: "Please select branch." });
        return false;
      }
      if (!formValues.txtInvoiceDate) {
        setAlertMessage({ open: true, type: "warning", message: "Please enter invoice date." });
        return false;
      }
      return true;
    } catch (error) {
      setAlertMessage({ open: true, type: "error", message: "Somethig went wrong." });
      return false;
    }
  };

  // Convert Form Item Values to Request Data
  const getFormItemValues = () => {
    let addeditems = [];
    formValues.addedItems.forEach((val) => {
      if (val.Item) {
        let item = {
          ItemMasterID: val.Item.ItemMasterID,
          ItemMakeID: "0",
          ItemBrandID: "0",
          PackingUnitID: "0",
          PackingTypeID: "0",
          NoOfBoxes: "0",
          Quantity_UOM: val.Quantity ? val.Quantity : "0",
          ItemWeight: "0",
          PriceType: "1",
          Price_IC: val.Rate ? val.Rate : "0",
          Price_BC: val.Rate ? val.Rate : "0",
          InvoiceDetailRemark: "",
          ExpiryDate: "",
          ItemMRP: "0",
          DiscountPercentage: "0",
          DiscountAmount: val.Discount ? val.Discount : "0",
          Discount_BC: val.Discount ? val.Discount : "0",
          Discount_IC: val.Discount ? val.Discount : "0",
          DiscountTypeID: "0",
          DiscountRemarks: "",
          TaxDefinitionID: val.TaxDefinitionID ? val.TaxDefinitionID : "0",
          TaxGroupID: "0",
          TaxPercentageApplicable: val.TaxDefinitionValue ? val.TaxDefinitionValue : "0",
          TaxAmountApplicable: val.GST ? val.GST : "0",
          Tax_BC: val.GST ? val.GST : "0",
          Tax_IC: val.GST ? val.GST : "0",
          ISReturnable: "0",
          ISFreeItem: "0",
        };
        addeditems.push(item);
      }
    });
    return addeditems;
  };

  // Convert Form Charge Values to Request Data
  const getFormChargeValues = () => {
    let addedCharges = [];
    formValues.addedCharges.forEach((val) => {
      let charge = {
        InvoiceChargeMasterID: val.selectedCharge && val.selectedCharge.InvoiceChargeMasterID ? val.selectedCharge.InvoiceChargeMasterID : "0",
        ChargeAmountBC: val.TaxableValue ? val.TaxableValue : "0",
        ChargeAmountIC: val.TaxableValue ? val.TaxableValue : "0",
        TaxDefinitionID: val.selectedCharge && val.selectedCharge.TaxDefinitionID ? val.selectedCharge.TaxDefinitionID : "0",
        TaxPercentageApplicable: val.TaxDefinitionValue ? val.TaxDefinitionValue : "0",
        TaxAmountApplicable: val.GST ? val.GST : "0",
        TaxBaseCurrency: val.GST ? val.GST : "0",
        TaxInvoiceCurrency: val.GST ? val.GST : "0",
      };
      addedCharges.push(charge);
    });
    return addedCharges;
  };

  //Handle Save Function called onClick submit button
  const [btnLoading, setBtnLoading] = useState(false);
  const handleSave = async () => {
    //Showing Invoice Preview Button
    setShowPreviewButton(true);

    if (!handleValidation()) {
      return;
    }
    let items = getFormItemValues();
    if (items.length === 0) {
      setAlertMessage({ open: true, type: "error", message: "Please add atleast one item" });
      return;
    }

    let charges = getFormChargeValues();

    var formData = {
      AccountingBranchID: formValues.selectedBranch && formValues.selectedBranch.CompanyAddressID ? formValues.selectedBranch.CompanyAddressID : "0",
      InvoiceCategoryID:
        formValues.selectedInvoiceCategory && formValues.selectedInvoiceCategory.InvoiceCategoryID ? formValues.selectedInvoiceCategory.InvoiceCategoryID : "0",
      ExecutiveID: "0",
      OutwardInvoiceDate: formValues.txtInvoiceDate
        ? dateToSpecificFormat(formValues.txtInvoiceDate, "YYYY-MM-DD")
        : dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      InvoiceDueDate: formValues.txtDueDate ? dateToSpecificFormat(formValues.txtDueDate, "YYYY-MM-DD") : dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      InvoiceToCustomerID: formValues.selectedBR && formValues.selectedBR.BRID ? formValues.selectedBR.BRID : "0",
      InvoiceToBranchID: "0",
      InvoiceToSupplierID: "0",
      InvoiceToAddressID: formValues.selectedBillToAddress && formValues.selectedBillToAddress.BRAddressID ? formValues.selectedBillToAddress.BRAddressID : "0",
      DispatchToAddressID:
        formValues.selectedShipToAddress && formValues.selectedShipToAddress.BRAddressID ? formValues.selectedShipToAddress.BRAddressID : "0",
      ItemPriceListID: "0",
      InvoiceStatusID: "0",
      CustomerPONO: "",
      CustomerPODate: "",
      InvoiceCurrencyID: "0",
      FXRate: "1",
      FXDateTime: "",
      CompanyMasterID: "0",
      DispatchFromWarehouseID: "0",
      DispacthToWarehouseID: "0",
      ECommChannelID: "0",
      ECOrderID: "0",
      ECOrderNo: "",
      ShippingCompanyID: "0",
      ShippingMethodID: "0",
      Items: items,
      Charges: charges,
    };
    setBtnLoading(true);
    const response = await createInvoice(formData);
    setBtnLoading(false);

    if (response.ResponseCode === 1) {
      setAlertMessage({
        open: true,
        type: "success",
        message: response.ResponseMessage,
      });
      clearForm();
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  const clearForm = () => {
    setFormValues({
      selectedBranch: null,
      selectedBranchAddress: null,
      selectedInvoiceCategory: null,
      selectedGRNCategory: null,
      txtInvoiceNo: "",
      txtInvoiceDate: "",
      txtDueDate: "",
      selectedBR: null,
      selectedBillToAddress: null,
      selectedShipToAddress: null,
      selecedBankAccount: null,
      selectedPaymentMode: null,
      txtPaymentAmount: "",
      addedItems: [
        {
          Item: null,
          HSN_SAC: "",
          TaxDefinitionValue: "",
          TaxDefinitionID: "",
          Quantity: "",
          UOM: "",
          Rate: "",
          Amount: "",
          DiscountType: "",
          DiscountValue: "",
          TaxableAmount: "",
          GST: "",
          TotalAmount: "",
        },
      ],
      addedCharges: [],
      txtNotes: "",
      txtAdjustment: "",
      txtTermCondition: "",
      txtTotal: "",
    });
  };

  return (
    <div className={BizClass.Box}>
      {openAddressModal.IsOpen && (
        <AddressSelector
          isBillTo={openAddressModal.IsBillTo}
          addressList={addressList}
          toggleAddressModal={toggleAddressModal}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      )}
      {openModal && <NewCustomerOnBoarding toggleModal={toggleModal} formValues={formValues} updateBR={updateBR} />}
      {openAddShipToAddressModal && (
        <AddShipToAddress toggleAddShipToAddressModal={toggleAddShipToAddressModal} formValues={formValues} setAlertMessage={setAlertMessage} />
      )}
      <div className={BizClass.InvoiceBox}>
        <div className={BizClass.Header}>
          <Form.InputGroup label="Branch">
            <Form.InputControl
              control="select"
              options={branchOptions}
              isLoading={isLoadingBranch}
              getOptionValue={(option) => `${option}`}
              getOptionLabel={(option) => `${option.AddressDisplayName}`}
              name="selectedBranch"
              value={formValues.selectedBranch}
              onChange={(e) => updateState("selectedBranch", e)}
            />
          </Form.InputGroup>

          <div className={BizClass.HeaderBox}>
            <Form.InputGroup label="Invoice Category">
              <Form.InputControl
                control="select"
                options={invoiceCategoryOptions}
                isLoading={isLoadingInvoiceCategory}
                getOptionValue={(option) => `${option}`}
                getOptionLabel={(option) => `${option.InvoiceCategoryName}`}
                name="selectedInvoiceCategory"
                value={formValues.selectedInvoiceCategory}
                onChange={(e) => updateState("selectedInvoiceCategory", e)}
              />
            </Form.InputGroup>
            <Form.InputGroup label="GST Category">
              <Form.InputControl
                control="select"
                options={gstCategoryOption}
                isLoading={isLoadingGstCategoryOption}
                getOptionValue={(option) => `${option}`}
                getOptionLabel={(option) => `${option.GSTCategoryName}`}
                name="selectedGRNCategory"
                value={formValues.selectedGRNCategory}
                onChange={(e) => {
                  updateState("selectedGRNCategory", e);
                }}
              />
            </Form.InputGroup>
            <PageBar.Button type="button" onClick={() => toggleCreateInvoiceModal()}>
              Close
            </PageBar.Button>
          </div>
        </div>
        <div className={BizClass.InvoiceForm}>
          <div className={BizClass.FormTitle}>
            <h4>{pageTile}</h4>
          </div>
          <div className={BizClass.PreviewDiv}>
            <div className={BizClass.PreviewDiv_L1}>
              <div className={BizClass.PreviewDiv_L1_Box1}>
                <h2>
                  {formValues.selectedBranchAddress && formValues.selectedBranchAddress.AddressDisplayName
                    ? formValues.selectedBranchAddress.AddressDisplayName
                    : ""}
                </h2>
                <h4>
                  {formValues.selectedBranchAddress && formValues.selectedBranchAddress.AddressLine1 ? formValues.selectedBranchAddress.AddressLine1 : ""}
                  {formValues.selectedBranchAddress && formValues.selectedBranchAddress.AddressLine2
                    ? " ," + formValues.selectedBranchAddress.AddressLine2
                    : ""}
                  {formValues.selectedBranchAddress && formValues.selectedBranchAddress.PinCode ? " ," + formValues.selectedBranchAddress.PinCode : ""}
                </h4>
                <p>
                  <strong>Email :</strong>
                  <span>
                    {formValues.selectedBranchAddress && formValues.selectedBranchAddress.ComEmailAddress
                      ? formValues.selectedBranchAddress.ComEmailAddress
                      : ""}
                  </span>
                </p>
                <p>
                  <strong>Phone :</strong>
                  <span>
                    {formValues.selectedBranchAddress && formValues.selectedBranchAddress.ComMobileNo ? formValues.selectedBranchAddress.ComMobileNo : ""}
                  </span>
                </p>
                <p>
                  <strong>GSTIN :</strong>
                  <span>{formValues.selectedBranchAddress && formValues.selectedBranchAddress.GSTNo ? formValues.selectedBranchAddress.GSTNo : ""}</span>
                </p>
              </div>
              <div className={BizClass.DataBox_Border}></div>
              <div className={BizClass.PreviewDiv_L1_Box1}>
                <div className={BizClass.PreviewDiv_ShipTo}>
                  <Form.InputGroup label="Dispatch from">
                    <Form.InputControl
                      control="select"
                      options={branchOptions}
                      isLoading={isLoadingBranch}
                      getOptionValue={(option) => `${option}`}
                      getOptionLabel={(option) => `${option.AddressDisplayName}`}
                      name="selectedBranchShipTo"
                      value={formValues.selectedBranchShipTo}
                      onChange={(e) => updateState("selectedBranchShipTo", e)}
                    />
                    <div style={{ paddingLeft: "10px" }}>
                      <BsClipboardPlus style={{ cursor: "pointer" }} onClick={() => toggleAddShipToAddressModal()} />
                    </div>
                  </Form.InputGroup>
                </div>
                <h2>
                  {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.AddressDisplayName
                    ? formValues.selectedBranchAddressShipTo.AddressDisplayName
                    : ""}
                </h2>
                <h4>
                  {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.AddressLine1
                    ? formValues.selectedBranchAddressShipTo.AddressLine1
                    : ""}
                  {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.AddressLine2
                    ? " ," + formValues.selectedBranchAddressShipTo.AddressLine2
                    : ""}
                  {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.PinCode
                    ? " ," + formValues.selectedBranchAddressShipTo.PinCode
                    : ""}
                </h4>
                <p>
                  <strong>Email :</strong>
                  <span>
                    {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.ComEmailAddress
                      ? formValues.selectedBranchAddressShipTo.ComEmailAddress
                      : ""}
                  </span>
                </p>
                <p>
                  <strong>Phone :</strong>
                  <span>
                    {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.ComMobileNo
                      ? formValues.selectedBranchAddressShipTo.ComMobileNo
                      : ""}
                  </span>
                </p>
                <p>
                  <strong>GSTIN :</strong>
                  <span>
                    {formValues.selectedBranchAddressShipTo && formValues.selectedBranchAddressShipTo.GSTNo ? formValues.selectedBranchAddressShipTo.GSTNo : ""}
                  </span>
                </p>
              </div>
              <div className={BizClass.PreviewDiv_L1_Box2}>
                <p>
                  <strong>Invoice No</strong>
                  <div className={BizClass.DataBox_Border}></div>
                  <input
                    type="text"
                    placeholder="invoice no"
                    name="txtInvoiceNo"
                    value={formValues.txtInvoiceNo}
                    onChange={(e) => updateState("txtInvoiceNo", e.target.value)}
                  />
                </p>
                <p>
                  <strong>Invoice Date</strong>
                  <div className={BizClass.DataBox_Border}></div>
                  <input type="date" name="txtInvoiceDate" value={formValues.txtInvoiceDate} onChange={(e) => updateState("txtInvoiceDate", e.target.value)} />
                </p>
                <p>
                  <strong>Due Date</strong>
                  <div className={BizClass.DataBox_Border}></div>
                  <input type="date" name="txtDueDate" value={formValues.txtDueDate} onChange={(e) => updateState("txtDueDate", e.target.value)} />
                </p>
              </div>
            </div>
            <div className={BizClass.PreviewDiv_L3}>
              <div className={BizClass.DataBox_L1}>
                <h3>
                  Customer
                  <button type="button" onClick={() => toggleModal()}>
                    <AiFillEdit />
                  </button>
                </h3>
                <p>
                  <strong>{formValues.selectedBR && formValues.selectedBR.CustomerName ? formValues.selectedBR.CustomerName : ""}</strong>
                  <br></br>
                </p>
                <p>
                  <strong>Email :</strong>
                  <span>{formValues.selectedBR && formValues.selectedBR.EmailAddress ? formValues.selectedBR.EmailAddress : ""}</span>
                </p>
                <p>
                  <strong>Phone :</strong>
                  <span>{formValues.selectedBR && formValues.selectedBR.MobileNo ? formValues.selectedBR.MobileNo : ""}</span>
                </p>
                <p>
                  <strong>GSTIN :</strong>
                  <span>{formValues.selectedBR && formValues.selectedBR.GSTNo ? formValues.selectedBR.GSTNo : ""}</span>
                </p>
              </div>
              <div className={BizClass.DataBox_Border}></div>
              <div className={BizClass.DataBox_L1}>
                <h3>
                  Billing Address
                  <button type="button" onClick={() => toggleAddressModal(true)}>
                    <AiFillEdit />
                  </button>
                </h3>
                <p>
                  {formValues.selectedBillToAddress ? formValues.selectedBillToAddress.AddressDisplayName : ""}
                  <br></br>{" "}
                  {formValues.selectedBillToAddress && formValues.selectedBillToAddress.AddressLine1
                    ? formValues.selectedBillToAddress.AddressLine1 +
                      (formValues.selectedBillToAddress.AddressLine2 ? "," + formValues.selectedBillToAddress.AddressLine2 : "")
                    : formValues.selectedBillToAddress && formValues.selectedBillToAddress.AddressLine2
                    ? formValues.selectedBillToAddress.AddressLine2
                    : ""}
                  <br></br> {""}
                  <br></br>
                  {""}
                </p>
              </div>
              <div className={BizClass.DataBox_Border}></div>
              <div className={BizClass.DataBox_L1}>
                <h3>
                  Shipping Address
                  <button type="button" onClick={() => toggleAddressModal(false)}>
                    <AiFillEdit />
                  </button>
                </h3>
                <p>
                  {formValues.selectedShipToAddress ? formValues.selectedShipToAddress.AddressDisplayName : ""}
                  <br></br>{" "}
                  {formValues.selectedShipToAddress && formValues.selectedShipToAddress.AddressLine1
                    ? formValues.selectedShipToAddress.AddressLine1 +
                      (formValues.selectedShipToAddress.AddressLine2 ? "," + formValues.selectedShipToAddress.AddressLine2 : "")
                    : formValues.selectedShipToAddress && formValues.selectedShipToAddress.AddressLine2
                    ? formValues.selectedShipToAddress.AddressLine2
                    : ""}
                  <br></br> {""}
                  <br></br>
                  {""}
                </p>
              </div>
            </div>
            <div className={BizClass.ItemDetailsDiv}>
              <table className={BizClass.ItemDetailsTable}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>HSN/SAC</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Total Value</th>
                    <th>Discount Value</th>
                    <th>Taxable Value</th>
                    <th>GST</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formValues &&
                    formValues.addedItems &&
                    formValues.addedItems.length > 0 &&
                    formValues.addedItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className={BizClass.Sr_Data}>
                            <PageBar.Select
                              options={bnItemOptions}
                              isLoading={isLoadingBnItem}
                              getOptionValue={(option) => `${option}`}
                              getOptionLabel={(option) => `${option.ItemMasterName}`}
                              name="Item"
                              value={formValues.addedItems[index].Item}
                              onChange={(e) => {
                                updateItemState("Item", e, index);
                              }}
                            />
                          </td>
                          <td>{formValues.addedItems[index].HSN_SAC}</td>
                          <td>
                            <div>
                              <PageBar.Input
                                name="Quantity"
                                type="text"
                                min="0"
                                value={formValues.addedItems[index].Quantity}
                                onChange={(e) => {
                                  updateItemState("Quantity", e.target.value.replace(/\D/g, ""), index);
                                }}
                              />
                              <span>{formValues.addedItems[index].UOM}</span>
                            </div>
                          </td>
                          <td>
                            <PageBar.Input
                              name="Rate"
                              type="text"
                              min="0"
                              value={formValues.addedItems[index].Rate}
                              onChange={(e) => {
                                updateItemState("Rate", e.target.value.replace(/\D/g, ""), index);
                              }}
                            />
                          </td>
                          <td className={BizClass.NumField}>{formValues.addedItems[index].Amount}</td>
                          <td>
                            <div>
                              <PageBar.Select
                                options={[
                                  { label: "%", value: "%" },
                                  { label: "V", value: "V" },
                                ]}
                                getOptionValue={(option) => `${option}`}
                                getOptionLabel={(option) => `${option.label}`}
                                name="DiscountType"
                                isClearable={false}
                                value={formValues.addedItems[index].DiscountType}
                                onChange={(e) => {
                                  updateItemState("DiscountType", e, index);
                                }}
                              />
                              <PageBar.Input
                                name="DiscountValue"
                                type="text"
                                min="0"
                                value={formValues.addedItems[index].DiscountValue}
                                onChange={(e) => {
                                  updateItemState("DiscountValue", e.target.value.replace(/\D/g, ""), index);
                                }}
                              />
                            </div>
                          </td>
                          <td className={BizClass.NumField}>{formValues.addedItems[index].TaxableAmount}</td>
                          <td className={BizClass.NumField}>{formValues.addedItems[index].GST}</td>
                          <td className={BizClass.NumField}>{formValues.addedItems[index].TotalAmount}</td>
                          <td>
                            {index === formValues.addedItems.length - 1 ? (
                              <button type="button">
                                <AiOutlinePlus onClick={() => addNewItem(index)} />
                              </button>
                            ) : (
                              <button type="button" className={BizClass.DeleteButton}>
                                <AiFillDelete onClick={() => removeItem(index)} />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <div className={BizClass.BottomDetailsDiv}>
              <div className={BizClass.PreviewDiv_L1_Box2}>
                <PageBar.Select
                  label={"Charge"}
                  isClearable={false}
                  options={invoiceChargeOptions}
                  isLoading={isLoadingInvoiceChargeOption}
                  getOptionValue={(option) => `${option}`}
                  getOptionLabel={(option) => `${option.ChargeMasterName}`}
                  name="selectedCharge"
                  value={formValuesCharge.selectedCharge}
                  onChange={(e) => {
                    updateChargeState("selectedCharge", e);
                  }}
                />
                <PageBar.Input
                  name="TaxableValue"
                  label="TaxableValue"
                  type="text"
                  min="0"
                  value={formValuesCharge.TaxableValue}
                  onChange={(e) => {
                    updateChargeState("TaxableValue", e.target.value.replace(/\D/g, ""));
                  }}
                />
                <PageBar.Input
                  label="GST(%)"
                  name="TaxDefinitionValue"
                  type="text"
                  min="0"
                  value={formValuesCharge.TaxDefinitionValue}
                  onChange={(e) => {
                    updateChargeState("TaxDefinitionValue", e.target.value.replace(/\D/g, ""));
                  }}
                />
                <PageBar.Input
                  label="GST"
                  name="GST"
                  disabled={true}
                  type="text"
                  min="0"
                  value={formValuesCharge.GST}
                  onChange={(e) => {
                    updateChargeState("GST", e.target.value.replace(/\D/g, ""));
                  }}
                />
                <PageBar.Input
                  label="TotalValue"
                  name="TotalValue"
                  type="text"
                  disabled={true}
                  min="0"
                  value={formValuesCharge.TotalValue}
                  onChange={(e) => {
                    updateChargeState("TotalValue", e.target.value.replace(/\D/g, ""));
                  }}
                />
                <button type="button" onClick={() => addCharges()}>
                  +
                </button>
              </div>
              <div className={BizClass.PreviewDiv_L1_Box3}>
                <div>
                  <table className={BizClass.ItemDetailsTable2}>
                    <thead>
                      <tr>
                        <th>Charge Name</th>
                        <th>Taxable Value</th>
                        <th>GST</th>
                        <th>Total Value</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formValues &&
                        formValues.addedCharges &&
                        formValues.addedCharges.length > 0 &&
                        formValues.addedCharges.map((charge, index) => {
                          return (
                            <tr key={index}>
                              <td className={BizClass.Sr_Data}>
                                {charge.selectedCharge && charge.selectedCharge.ChargeMasterName ? charge.selectedCharge.ChargeMasterName : ""}
                              </td>
                              <td className={classNames(BizClass.Sr_Data, BizClass.Num_Data)}>{charge.TaxableValue ? charge.TaxableValue : ""}</td>
                              <td className={classNames(BizClass.Sr_Data, BizClass.Num_Data)}>{charge.GST ? charge.GST : ""}</td>
                              <td className={classNames(BizClass.Sr_Data, BizClass.Num_Data)}>{charge.TotalValue ? charge.TotalValue : ""}</td>
                              <td>
                                <button type="button">
                                  <AiFillDelete onClick={() => removeCharges(index)} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  <strong>Total Value</strong>
                  <input name="txtTotalValue" value={formValues.txtTotalValue} onChange={(e) => updateState("txtTotalValue", e.target.value)} />
                  <div className={BizClass.DataBox_Border}></div>
                  <strong>Total GST</strong>
                  <input name="txtTotalGST" value={formValues.txtTotalGST} onChange={(e) => updateState("txtTotalGST", e.target.value)} />
                  <div className={BizClass.DataBox_Border}></div>
                  <strong>Total Invoice Value</strong>
                  <input name="txtTotal" value={formValues.txtTotal} onChange={(e) => updateState("txtTotal", e.target.value)} />
                </p>
              </div>
            </div>
            <div className={BizClass.BottomDataDetailsDiv}>
              <div className={BizClass.TermAndCondDetailsDiv}>
                <h3>
                  <strong>Notes / Remarks</strong>
                </h3>
                <textarea name="txtNotes" value={formValues.txtNotes} onChange={(e) => updateState("txtNotes", e.target.value)}></textarea>
              </div>
              <div className={BizClass.TermAndCondDetailsDiv}>
                <h3>
                  <strong>Terms & Conditions</strong>
                </h3>
                <textarea
                  name="txtTermCondition"
                  value={formValues.txtTermCondition}
                  onChange={(e) => updateState("txtTermCondition", e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={BizClass.DataBox_Submit_Button}>
              <div style={{ display: "flex" }}>
                {showPreviewButton && (
                  <Button
                    onClick={() => {
                      setInvoiceDataFromApi(1);
                    }}
                  >
                    Preview
                  </Button>
                )}

                {!showPreviewButton && (
                  <Button
                    onClick={() => {
                      handleSave();
                    }}
                    varient="secondary"
                    type="button"
                    trigger={btnLoading ? "true" : "false"}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice View */}
      {invoiceData && <InvoiceView invoiceData={invoiceData} setInvoiceData={setInvoiceData} />}
    </div>
  );
}

export default CreateInvoice;

const NewCustomerOnBoarding = (props) => {
  const { toggleModal, formValues, updateBR } = props;
  const setAlertMessage = AlertMessage();

  const [brGridApi, setBRGridApi] = useState();
  const onBRGridReady = (params) => {
    setBRGridApi(params.api);
  };

  const [brList, setBRList] = useState([]);
  const [isLoadingBRList, setIsLoadingBRList] = useState(false);
  const getCustomerList = async () => {
    setIsLoadingBRList(true);
    const response = await getCustomer(searchText);
    console.log(response);
    setIsLoadingBRList(false);
    if (response.ResponseCode === 1) {
      setBRList(response.ResponseData);
      if (searchText && searchText.toLowerCase().includes("#")) {
        setSearchText("");
        brGridApi.setQuickFilter("");
        brGridApi.refreshCells();
      }
    } else {
      setAlertMessage({
        open: true,
        type: "error",
        message: response.ResponseMessage,
      });
    }
  };

  const [searchText, setSearchText] = useState("");
  const onSearchChange = (val) => {
    setSearchText(val);
    brGridApi.setQuickFilter(val);
    brGridApi.refreshCells();
  };

  const onClickSearch = () => {
    if (searchText && searchText.length >= 3) {
      getCustomerList();
    } else {
      setAlertMessage({
        open: true,
        type: "warning",
        message: "Please type at least 3 character.",
      });
    }
  };

  const handleSelect = (row) => {
    // const selectedNodes = brGridApi.getSelectedNodes();
    // const selectedData = selectedNodes.map((node) => node.data);
    if (row.data) {
      updateBR(row.data);
      toggleModal(false);
    }
  };

  return (
    <Modal varient="center" title="Select Customer" show={toggleModal} width="700px" height="500px">
      <Modal.Body>
        <div className={BizClass.InvoiceBoxDiv}>
          <PageBar>
            <PageBar.Search focus={true} onClick={() => onClickSearch()} value={searchText} onChange={(e) => onSearchChange(e.target.value)} />
          </PageBar>
          <DataGrid
            rowData={brList}
            loader={isLoadingBRList ? <Loader /> : null}
            onGridReady={onBRGridReady}
            onRowDoubleClicked={handleSelect}
            overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">Please search to get result.</span>'}
          >
            {/* <DataGrid.Column field="#"
              headerName="Action"
              width={98}
              pinned="left"
              checkboxSelection={true}
               /> */}
            <DataGrid.Column field="CustomerCode" headerName="Customer Code" width={150} pinned="left" />
            <DataGrid.Column field="CustomerName" headerName="Customer Name" width={250} pinned="left" />
            <DataGrid.Column field="EmailAddress" headerName="Email" width={180} pinned="left" />
            <DataGrid.Column field="MobileNo" headerName="Mobile No" width={180} pinned="left" />
            <DataGrid.Column field="GSTNO" headerName="GSTNo" width={180} pinned="left" />
          </DataGrid>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={() => handleSelect()} varient="secondary" type="button" trigger={"false"}>
          Ok
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

const AddressSelector = (props) => {
  const { toggleAddressModal, isBillTo, formValues, setFormValues, addressList } = props;
  const setAlertMessage = AlertMessage();

  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    let address = addressList.map((add, index) => {
      let isSelected = false;
      if (isBillTo && formValues.selectedBillToAddress && formValues.selectedBillToAddress.BRAddressID === add.BRAddressID) {
        isSelected = true;
      } else if (!isBillTo && formValues.selectedShipToAddress && formValues.selectedShipToAddress.BRAddressID === add.BRAddressID) {
        isSelected = true;
      }
      return { ...add, IsSelected: isSelected };
    });
    setAddressOptions(address);
  }, []);

  const handleSelect = (address, index) => {
    if (!address.IsSelected) {
      if (isBillTo) {
        setFormValues({ ...formValues, ["selectedBillToAddress"]: address });
      } else {
        setFormValues({ ...formValues, ["selectedShipToAddress"]: address });
      }
      toggleAddressModal(false);
    } else {
      let mappedArr = [...addressOptions];
      mappedArr[index].IsSelected = false;
      setAddressOptions(mappedArr);
    }
  };

  return (
    <SelectPopup varient="top" PopupTitle="Select Address" trigger={"true"} togglepopup={toggleAddressModal}>
      <SelectPopupContent togglePopup={toggleAddressModal}>
        {addressOptions && addressOptions.length > 0
          ? addressOptions.map((address, index) => {
              return (
                <SelectAddressCard
                  key={index}
                  onClick={() => handleSelect(address, index)}
                  checked={address.IsSelected}
                  AddressTitle={address.AddressDisplayName}
                  AddressBody={address.AddressText}
                />
              );
            })
          : null}
      </SelectPopupContent>
    </SelectPopup>
  );
};

const AddShipToAddress = ({ toggleAddShipToAddressModal, setAlertMessage }) => {
  const [formValues, setFormValues] = useState({
    txtAddressLine1: "",
    txtAddressLine2: "",
    txtCountry: null,
    txtState: null,
    txtCity: null,
    txtPinCode: "",
    txtGSTIN: "",
  });

  const updateState = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    formValidationError[name] = validateField(name, value);

    if (name === "txtCountry") {
      setFormValues({
        ...formValues,
        txtCountry: value,
        txtState: null,
        txtCity: null,
      });
      setStateList([]);
      setCityList([]);
      if (name === "txtCountry" && value !== null) {
        getStateData(value.CountryMasterID);
      }
    }
    if (name === "txtState") {
      setFormValues({
        ...formValues,
        txtState: value,
        txtCity: null,
      });
      setCityList([]);
      if (name === "txtState" && value !== null) {
        getCityData(formValues.txtCountry.CountryMasterID, value.StateMasterID);
      }
    }
  };

  const [countryList, setCountryList] = useState([]);
  const [isLoadingCountry, setIsLoadingCountry] = useState(false);
  const getCountryData = async () => {
    //debugger;
    try {
      setIsLoadingCountry(true);
      const formData = {
        SearchText: "#all",
      };
      const result = await getCountryListData(formData);
      setIsLoadingCountry(false);
      if (result.ResponseCode === 1) {
        if (result.ResponseData && result.ResponseData.length > 0) {
          setCountryList(result.ResponseData);
        } else {
          setCountryList([]);
        }
      } else {
        setCountryList([]);
        console.log(result.ResponseMessage);
      }
    } catch (error) {
      setAlertMessage({ open: true, type: "error", msg: error });
      console.log(error);
    }
  };

  const [stateList, setStateList] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const getStateData = async (countryId) => {
    //debugger;
    try {
      setIsLoadingState(true);
      const formData = {
        CountryID: countryId,
        StateID: "0",
        SearchText: "#all",
      };
      const result = await getStateListData(formData);
      setIsLoadingState(false);
      if (result.ResponseCode === 1) {
        if (result.ResponseData && result.ResponseData.length > 0) {
          setStateList(result.ResponseData);
        } else {
          setStateList([]);
        }
      } else {
        setStateList([]);
        console.log(result.ResponseMessage);
      }
    } catch (error) {
      setAlertMessage({ open: true, type: "error", msg: error });
      console.log(error);
    }
  };

  const [cityList, setCityList] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const getCityData = async (countryId, stateId) => {
    debugger;
    try {
      setIsLoadingCity(true);
      const formData = {
        CountryID: countryId,
        StateID: stateId,
        CityID: "0",
        SearchText: "#all",
      };
      const result = await getCityListData(formData);
      setIsLoadingCity(false);
      if (result.ResponseCode === 1) {
        if (result.ResponseData && result.ResponseData.length > 0) {
          setCityList(result.ResponseData);
        } else {
          setCityList([]);
        }
      } else {
        setCityList([]);
        console.log(result.ResponseMessage);
      }
    } catch (error) {
      setAlertMessage({ open: true, type: "error", msg: error });
      console.log(error);
    }
  };

  const [formValidationError, setFormValidationError] = useState({});

  const validateField = (name, value) => {
    let errorsMsg = "";

    if (name === "txtAddressLine1") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "AddressLine1 is required!";
      }
    } else if (name === "txtCountry") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Country is required!";
      }
    } else if (name === "txtState") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "State is required!";
      }
    } else if (name === "txtCity") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "City is required!";
      }
    } else if (name === "txtPinCode") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "PinCode is required!";
      }
    }

    return errorsMsg;
  };

  const handleValidation = () => {
    try {
      //debugger;
      const errors = {};
      let formIsValid = true;

      errors["txtAddressLine1"] = validateField("txtAddressLine1", formValues.txtAddressLine1);
      errors["txtCountry"] = validateField("txtCountry", formValues.txtCountry);
      errors["txtState"] = validateField("txtState", formValues.txtState);
      errors["txtCity"] = validateField("txtCity", formValues.txtCity);
      errors["txtPinCode"] = validateField("txtPinCode", formValues.txtPinCode);

      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      setFormValidationError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({ open: true, type: "error", msg: error });
      return false;
    }
  };

  const SaveAddressShipTo = (e) => {
    if (e) e.preventDefault();
    if (!handleValidation()) {
      return;
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <Modal varient="center" title="Add Address" show={toggleAddShipToAddressModal}>
      <Modal.Body>
        <Form>
          <Form.Group column={2} controlwidth="320px">
            <Form.CustomGroup columntemplate="100%" column={4}>
              <div className={BizClass.TabControl}>
                <button type="button" className={BizClass.active}>
                  Billing Address
                </button>
              </div>
            </Form.CustomGroup>

            <Form.InputGroup label="Address Line 1" errorMsg={formValidationError["txtAddressLine1"]} req={true}>
              <Form.InputControl
                control="input"
                type="text"
                name="txtAddressLine1"
                value={formValues.txtAddressLine1}
                onChange={(e) => updateState("txtAddressLine1", e.target.value)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="Address Line 2">
              <Form.InputControl
                control="input"
                type="text"
                name="txtAddressLine2"
                value={formValues.txtAddressLine2}
                onChange={(e) => updateState("txtAddressLine2", e.target.value)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="Country" errorMsg={formValidationError["txtCountry"]} req={true}>
              <Form.InputControl
                control="select"
                name="txtCountry"
                options={countryList}
                isLoading={isLoadingCountry}
                getOptionLabel={(option) => `${option.CountryName}`}
                getOptionValue={(option) => `${option}`}
                value={formValues.txtCountry}
                onChange={(e) => updateState("txtCountry", e)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="State" errorMsg={formValidationError["txtState"]} req={true}>
              <Form.InputControl
                control="select"
                name="txtState"
                options={stateList}
                isLoading={isLoadingState}
                getOptionLabel={(option) => `${option.StateName}`}
                getOptionValue={(option) => `${option}`}
                value={formValues.txtState}
                onChange={(e) => updateState("txtState", e)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="City" errorMsg={formValidationError["txtCity"]} req={true}>
              <Form.InputControl
                control="select"
                name="txtCity"
                options={cityList}
                isLoading={isLoadingCity}
                getOptionLabel={(option) => `${option.CityName}`}
                getOptionValue={(option) => `${option}`}
                value={formValues.txtCity}
                onChange={(e) => updateState("txtCity", e)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="PinCode" errorMsg={formValidationError["txtPinCode"]} req={true}>
              <Form.InputControl
                control="input"
                type="text"
                name="txtPinCode"
                maxLength={6}
                value={formValues.txtPinCode}
                onChange={(e) => updateState("txtPinCode", e.target.value)}
              />
            </Form.InputGroup>

            <Form.InputGroup label="GSTIN">
              <Form.InputControl
                control="input"
                type="text"
                name="txtGSTIN"
                maxLength={15}
                value={formValues.txtGSTIN}
                onChange={(e) => updateState("txtGSTIN", e.target.value)}
              />
            </Form.InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button varient="secondary" onClick={(e) => SaveAddressShipTo(e)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* const InvoicePrintPreview = ({ setPreviewInvoice, previewInvoice, componentRef, handlePrint, formValues }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: previewInvoice ? "block" : "none",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#F4F5FF",
        }}
      >
        <div
          style={{
            height: "15%",
            minHeight: "80px",
            backgroundColor: "#F4F5FF",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button varient="secondary" style={{ width: "80px", textAlign: "center" }} type="button" onClick={handlePrint}>
            Print
          </Button>
          <Button
            varient="danger"
            type="button"
            style={{ width: "80px", textAlign: "center" }}
            onClick={() => {
              setPreviewInvoice(false);
            }}
          >
            Cancel
          </Button>
        </div>
        <div style={{ overflow: "scroll", height: "85%", display: "flex", justifyContent: "center" }}>
          <InvoicePage ref={componentRef} formValues={formValues} previewInvoice={previewInvoice} />
        </div>
      </div>
    </div>
  );
}; */
// const NewCustomerOnBoarding = ({ toggleModal }) => {
//   return (
//     <Modal varient="center" title="Add New Customer" show={toggleModal}>
//       <Modal.Body>
//         <Form>
//           <Form.Group column={2} controlwidth="320px">
//             <Form.CustomGroup columntemplate="100%" column={4}>
//               <div className={BizClass.TabControl}>
//                 <button type="button" className={BizClass.active}>
//                   Information
//                 </button>
//                 <button type="button">Banking & Taxes</button>
//               </div>
//             </Form.CustomGroup>

//             <Form.InputGroup label="Name">
//               <Form.CustomGroup columntemplate="120px auto">
//                 <Form.InputGroup>
//                   <Form.InputControl control="select" />
//                 </Form.InputGroup>
//                 <Form.InputGroup>
//                   <Form.InputControl control="input" />
//                 </Form.InputGroup>
//               </Form.CustomGroup>
//             </Form.InputGroup>

//             <Form.InputGroup label="Type">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Mobile No">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Email">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="GSTIN">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Reg Name">
//               <Form.InputControl control="input" disabled />
//             </Form.InputGroup>

//             <Form.InputGroup label="Business Name">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Display Name">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Phone No">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Fax">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.CustomGroup columntemplate="100%" column={4}>
//               <div className={BizClass.TabControl}>
//                 <button type="button" className={BizClass.active}>
//                   Billing Address
//                 </button>
//                 <button type="button">Shipping Address</button>
//               </div>
//             </Form.CustomGroup>

//             <Form.InputGroup label="Address Line 1">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Address Line 2">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="City">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="PinCode">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="State">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Country">
//               <Form.InputControl control="select" />
//             </Form.InputGroup>

//             <Form.InputGroup label="Branch Name">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>

//             <Form.InputGroup label="GSTIN">
//               <Form.InputControl control="input" />
//             </Form.InputGroup>
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer />
//     </Modal>
//   );
// };
