import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageAuthenticator from "Configuration/PageAuthenticator/PageAuthenticator";
import Invoice from "Components/Modules/Sale/Invoice/Invoice";
import Page from "./Page/Page";
import DeliveryChallan from "Components/Modules/DeliveryChallan/DeliveryChallan/DeliveryChallan";
import CreditNote from "Components/Modules/CreditNote/CreditNote/CreditNote";
import DebitNote from "Components/Modules/DebitNote/DebitNote/DebitNote";
import StockTransfer from "Components/Modules/StockTransfer/StockTransfer/StockTransfer";

function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PageAuthenticator />} />
        <Route exact path="/welcome" element={<Page component="" />} />
        <Route exact path="/invoice" element={<Page component={<Invoice />} />} />
        <Route exact path="/delivery-challan" element={<Page component={<DeliveryChallan />} />} />
        <Route exact path="/credit-note" element={<Page component={<CreditNote />} />} />
        <Route exact path="/debit-note" element={<Page component={<DebitNote />} />} />
        <Route exact path="/stock-transfer" element={<Page component={<StockTransfer />} />} />
      </Routes>
    </Router>
  );
}

export default PageRouter;
