import React from "react";
import { useEffect, useState } from "react";
import BizNext from "./InvoicePage.module.scss";
import logo from "./logo.png";

const InvoicePage = React.forwardRef(({ formValues, previewInvoice }, ref) => {
  const {
    selectedBranch,
    selectedInvoiceCategory,
    selectedGRNCategory,
    txtInvoiceNo,
    txtInvoiceDate,
    txtDueDate,
    selectedBR,
    selectedBillToAddress,
    selectedShipToAddress,
    addedItems,
    addedCharges,
    txtTotal,
  } = formValues;
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (previewInvoice) {
      console.log(formValues);
      setItems(() => {
        let itemsArray = [...addedItems];
        itemsArray.pop();
        return itemsArray;
      });
    }
  }, [previewInvoice]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div id="print-page" ref={ref} className={BizNext.Container}>
      <div className={BizNext.Box}>
        <div className={BizNext.Header}>
          <div className={BizNext.Title}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img style={{ height: "50px" }} src={logo} alt="" />
            </div>
            <div className={BizNext.Item}>Sale Order</div>
            <div style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>3s Logics Pvt Ltd.</div>
          </div>
          <div className={BizNext.Type}>
            <div className={BizNext.Branch}>
              <strong>Branch :&nbsp;&nbsp;</strong>
              <span>{selectedBranch && selectedBranch.AddressDisplayName}</span>
            </div>
            <div className={BizNext.Invoice}>
              <strong>Invoice Category :&nbsp;&nbsp;</strong>
              <span>{selectedInvoiceCategory && selectedInvoiceCategory.InvoiceCategoryName}</span>
            </div>
            <div className={BizNext.Gst}>
              <strong>Gst Category :&nbsp;&nbsp;</strong>
              <span>{selectedGRNCategory && selectedGRNCategory.GSTCategoryName}</span>
            </div>
          </div>

          <div className={BizNext.InvoiceInfo}>
            <div className={BizNext.CustomerContact}>
              <strong>{selectedBranch && selectedBranch.AddressDisplayName}</strong>
              <br />
              <span>{selectedBranch && selectedBranch.AddressLine1 + selectedBranch.AddressLine2 + selectedBranch.PinCode}</span>
              <br />
              <br />
              <strong>Email : &nbsp;</strong>
              <span>{selectedBranch && selectedBranch.ComEmailAddress}</span>
              <br />
              <strong>Phone : &nbsp;</strong>
              <span>{selectedBranch && selectedBranch.ComMobileNo}</span>
              <br />
              <strong>GSTIN : &nbsp;</strong>
              <span>{selectedBranch && selectedBranch.GSTNo}</span>
            </div>
            {/* <div className={BizNext.ShipContact}>
              <div style={{ display: "inline" }}>Dispatch From : &nbsp;</div>
              <div>
                <strong>Email : &nbsp;</strong>
                <div></div>
                <strong>Phone : &nbsp;</strong>
                <div></div>
                <strong>GSTIN : &nbsp;</strong>
              </div>
            </div> */}
            <div className={BizNext.Info}>
              <div className={BizNext.Row}>
                <strong className={BizNext.Col}>Invoice No</strong>
                <div className={BizNext.Col}>{txtInvoiceNo}</div>
              </div>
              <div className={BizNext.Row}>
                <strong className={BizNext.Col}>Invoice Date</strong>
                <div className={BizNext.Col}>{txtInvoiceDate}</div>
              </div>
              <div className={BizNext.Row}>
                <strong className={BizNext.Col}> Due Date</strong>
                <div className={BizNext.Col}>{txtDueDate}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", borderBottom: "1px solid grey", justifyContent: "space-between", padding: "5px" }}>
            <div style={{ flex: "1", borderRight: "1px solid grey" }}>
              <strong style={{ borderBottom: "1px solid grey" }}>Customer</strong>
              <div>{selectedBR && selectedBR.CustomerName}</div>
              <br />
              <strong>Email : &nbsp;</strong>
              <span>{selectedBR && selectedBR.EmailAddress}</span>
              <br />
              <strong>Phone : &nbsp;</strong>
              <span>{selectedBR && selectedBR.MobileNo}</span>
              <br />
              <strong>GSTIN : &nbsp;</strong>
              <span></span>
            </div>
            <div style={{ flex: "1", padding: "5px" }}>
              <strong>Billing Address</strong>
              <br />
              <span>{selectedBillToAddress && selectedBillToAddress.AddressDisplayName}</span>
              <br />
              <div>{selectedBillToAddress && `${selectedBillToAddress.AddressLine1}, ${selectedBillToAddress.AddressLine2}`}</div>
            </div>
            <div style={{ flex: "1", padding: "5px", borderLeft: "1px solid grey" }}>
              <strong>Shipping Address</strong>
              <div>{selectedShipToAddress && selectedShipToAddress.AddressDisplayName}</div>
              <div>{selectedShipToAddress && `${selectedShipToAddress.AddressLine1}, ${selectedShipToAddress.AddressLine2}`}</div>
            </div>
          </div>
        </div>
        <table className={BizNext.ItemDataTable}>
          <tr>
            <th rowSpan={2} colSpan={2}>
              Sr No.
            </th>
            <th rowSpan={2} colSpan={2}>
              Description Of Goods
            </th>
            <th rowSpan={2} colSpan={2}>
              HSN
            </th>
            <th rowSpan={2} colSpan={2}>
              Qty.
            </th>
            <th rowSpan={2} colSpan={2}>
              Unit
            </th>
            <th rowSpan={2} colSpan={2}>
              Price (per unit)
            </th>
            <th rowSpan={2} colSpan={2}>
              Total Value
            </th>
            <th rowSpan={2} colSpan={2}>
              Discount If Any
            </th>
            <th rowSpan={2} colSpan={2}>
              Taxable Value
            </th>
            <th colSpan={2}>Central tax</th>
            <th colSpan={2}>State or UT tax </th>
            <th colSpan={2}>Integrated tax</th>
            <th colSpan={2}>Cess</th>
          </tr>

          <tr>
            <td colSpan={1}>Rate</td>
            <td colSpan={1}>Amt</td>
            <td colSpan={1}>Rate</td>
            <td colSpan={1}>Amt</td>
            <td colSpan={1}>Rate</td>
            <td colSpan={1}>Amt</td>
            <td colSpan={1}>Rate</td>
            <td colSpan={1}>Amt</td>
          </tr>
          <tbody>
            {items.map((val, index) => {
              /* 
              {
    "Item": {
        "ItemMasterID": 3,
        "ItemMasterName": "Handwash",
        "HSN_SACNo": 102,
        "TaxDefinitionValue": 18,
        "TaxDefinitionID": 4,
        "UOMMasterName": "Nos"
    },
    "HSN_SAC": "102 - 18%",
    "TaxDefinitionValue": 18,
    "TaxDefinitionID": 4,
    "Quantity": "10",
    "UOM": "Nos",
    "Rate": "50",
    "Amount": "500.00",
    "DiscountType": {
        "label": "%",
        "value": "%"
    },
    "DiscountValue": "10",
    "TaxableAmount": "450.00",
    "GST": "81.00",
    "TotalAmount": "531.00"
} */
              return (
                <tr key={index}>
                  <td colSpan={2}>{index + 1}</td>
                  <td colSpan={2}>{val.Item && val.Item.ItemMasterName}</td>
                  <td colSpan={2}>{val.Item && val.Item.HSN_SACNo}</td>
                  <td colSpan={2}>{val.Quantity}</td>
                  <td colSpan={2}>{val.Item && val.Item.UOMMasterName}</td>
                  <td colSpan={2}>{val.Rate}</td>
                  <td colSpan={2}> {Number.parseInt(val.Quantity || 0) * Number.parseInt(val.Rate || 0)}</td>
                  <td colSpan={2}>{val.DiscountValue}</td>
                  <td colSpan={2}>{val.TaxableAmount}</td>
                  {/* <td colSpan={2}>{index + 1}</td>
                  <td colSpan={2}>{val.Item && val.Item.ItemMasterName}</td>
                  <td colSpan={2}>{val.Item && val.Item.HSN_SACNo}</td>
                  <td colSpan={2}>{val.Quantity}</td>
                  <td colSpan={2}>Unit</td>
                  <td colSpan={2}>{val.pricePerUnit}</td>
                  <td colSpan={2}> {Number.parseInt(val.Quantity) * Number.parseInt(val.pricePerUnit)}</td>
                  <td colSpan={2}>discount if any</td>
                  <td colSpan={2}>taxable value</td>
                  <td colSpan={1}>{val.centralTax.amt}</td>
                  <td colSpan={1}>{val.centralTax.rate}</td>
                  <td colSpan={1}>ut</td>
                  <td colSpan={1}>ut</td>
                  <td colSpan={1}>{val.integratedTax.amt}</td>
                  <td colSpan={1}>{val.integratedTax.rate}</td>
                  <td colSpan={1}></td>
                  <td colSpan={1}></td> */}
                </tr>
              );
            })}
            <tr>
              <td colSpan={2}></td>
              <td colSpan={10}>Freight</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td colSpan={10}>Insurance</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td colSpan={10}>Packing and Forwarding Charges etc.</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
            </tr>
            <tr>
              <td colSpan={12}>Total</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
              <td colSpan={1}></td>
            </tr>
            <tr>
              <td colSpan={18}>Total Invoice Value (In figure)</td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td colSpan={18}>Total Invoice Value (In Words)</td>
              <td colSpan={8}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default InvoicePage;
