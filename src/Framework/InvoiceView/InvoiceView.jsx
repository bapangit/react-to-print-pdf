import React, { useEffect, useState, useRef } from "react";
import BizNext from "./InvoiceView.module.scss";
import { Button } from "Framework/Components/Widgets";
import jsPDF from "jspdf";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function InvoiceView({ invoiceData, setInvoiceData }) {
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const element = document.getElementById("print-page");
        const width = element.clientWidth;
        const height = element.clientHeight;

        const doc = new jsPDF("p", "pt", [width, height]);
        doc.html(element, {
          callback: function (pdf) {
            pdf.deletePage(2);
            pdf.save("mypdf.pdf");
          },
          x: 0,
          y: 0,
        });
      }
    },
  });

  /* const invoiceData = {
    BranchName: "Bangalore",
    InvoiceCategory: "invoice Category",
    GNRCategory: "GNR Category",
    BranchAddressLine1: "Address Line 1",
    BranchAddressLine2: "BranchAddressLine2",
    BranchPinCode: "Pin Code",
    BranchEmailAddress: "Email Address",
    BranchPhoneNo: "Mob No",
    BranchGSTNo: "GST No",
    InvoiceNo: "Invoice No",
    InvoiceDate: "Invoice Date",
    DueDate: "Due Date",
    CustomerName: "CustomerName",
    CustomerEmailAddress: "CustomerEmailAddress",
    CustomerPhoneNo: "CustomerPhoneNo",
    BillingAddressName: "BillingAddressName",
    BillingAddressLane1: "BillingAddressLane1",
    BillingAddressLane2: "BillingAddressLane2",
    ShippingAddressName: "ShippingAddressName",
    ShippingAddressLane1: "ShippingAddressLane1",
    ShippingAddressLane2: "ShippingAddressLane2",
  }; */
  const {
    BranchName,
    InvoiceCategory,
    GNRCategory,
    BranchAddressLine1,
    BranchAddressLine2,
    BranchPinCode,
    BranchEmailAddress,
    BranchPhoneNo,
    BranchGSTNo,
    InvoiceNo,
    InvoiceDate,
    DueDate,
    CustomerName,
    CustomerEmailAddress,
    CustomerPhoneNo,
    BillingAddressName,
    BillingAddressLane1,
    BillingAddressLane2,
    ShippingAddressName,
    ShippingAddressLane1,
    ShippingAddressLane2,
  } = invoiceData.Invoice;
  const itemsArray = invoiceData.InvoiceDetails;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "100",
        display: "block",
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
          <Button
            varient="secondary"
            style={{ width: "80px", textAlign: "center" }}
            type="button"
            onClick={() => {
              handlePrint();
            }}
          >
            Save
          </Button>
          <Button
            varient="danger"
            type="button"
            style={{ width: "80px", textAlign: "center" }}
            onClick={() => {
              setInvoiceData(null);
            }}
          >
            Cancel
          </Button>
        </div>
        <div style={{ overflow: "scroll", height: "85%", display: "flex", justifyContent: "center" }}>
          <div id="print-page" ref={ref} className={BizNext.Container}>
            <div className={BizNext.Box}>
              <div className={BizNext.Header}>
                <div className={BizNext.Type}>
                  <div className={BizNext.Branch}>
                    <strong>Branch :&nbsp;&nbsp;</strong>
                    <span>{BranchName}</span>
                  </div>
                  <div className={BizNext.Invoice}>
                    <strong>Invoice Category :&nbsp;&nbsp;</strong>
                    <span>{InvoiceCategory}</span>
                  </div>
                  <div className={BizNext.Gst}>
                    <strong>Gst Category :&nbsp;&nbsp;</strong>
                    <span>{GNRCategory}</span>
                  </div>
                </div>

                <div className={BizNext.InvoiceInfo}>
                  <div className={BizNext.CustomerContact}>
                    <strong>{BranchName}</strong>
                    <br />
                    <span>{BranchPinCode}</span>
                    <br />
                    <br />
                    <strong>Email : &nbsp;</strong>
                    <span>{BranchEmailAddress}</span>
                    <br />
                    <strong>Phone : &nbsp;</strong>
                    <span>{BranchPhoneNo}</span>
                    <br />
                    <strong>GSTIN : &nbsp;</strong>
                    <span>{BranchGSTNo}</span>
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
                      <div className={BizNext.Col}>{InvoiceNo}</div>
                    </div>
                    <div className={BizNext.Row}>
                      <strong className={BizNext.Col}>Invoice Date</strong>
                      <div className={BizNext.Col}>{InvoiceDate}</div>
                    </div>
                    <div className={BizNext.Row}>
                      <strong className={BizNext.Col}> Due Date</strong>
                      <div className={BizNext.Col}>{DueDate}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", borderBottom: "1px solid grey", justifyContent: "space-between", padding: "5px" }}>
                  <div style={{ flex: "1", borderRight: "1px solid grey" }}>
                    <strong style={{ borderBottom: "1px solid grey" }}>Customer</strong>
                    <div>{CustomerName}</div>
                    <br />
                    <strong>Email : &nbsp;</strong>
                    <span>{CustomerEmailAddress}</span>
                    <br />
                    <strong>Phone : &nbsp;</strong>
                    <span>{CustomerPhoneNo}</span>
                    <br />
                    <strong>GSTIN : &nbsp;</strong>
                    <span></span>
                  </div>
                  <div style={{ flex: "1", padding: "5px" }}>
                    <strong>Billing Address</strong>
                    <br />
                    <span>{BillingAddressName}</span>
                    <br />
                    <div>{BillingAddressLane1 + BillingAddressLane2}</div>
                  </div>
                  <div style={{ flex: "1", padding: "5px", borderLeft: "1px solid grey" }}>
                    <strong>Shipping Address</strong>
                    <div>{ShippingAddressName}</div>
                    <div>{ShippingAddressLane1 + ShippingAddressLane2}</div>
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
                  {itemsArray.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td colSpan={2}>{val.SerialNo}</td>
                        <td colSpan={2}>{val.ItemMasterName}</td>
                        <td colSpan={2}>SAC NO</td>
                        <td colSpan={2}>{val.Quantity}</td>
                        <td colSpan={2}>Unit</td>
                        <td colSpan={2}>{val.PricePerUnit}</td>
                        <td colSpan={2}> {val.TotalValue}</td>
                        <td colSpan={2}>{val.DiscountIfAny}</td>
                        <td colSpan={2}>{val.TaxabeValue}</td>
                        <td colSpan={1}>tax</td>
                        <td colSpan={1}>tax rate</td>
                        <td colSpan={1}>ut</td>
                        <td colSpan={1}>ut</td>
                        <td colSpan={1}>tax amt</td>
                        <td colSpan={1}>tax</td>
                        <td colSpan={1}></td>
                        <td colSpan={1}></td>
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
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
