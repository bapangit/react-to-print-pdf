export const ApiEndPoints = {
  Base: "https://api.orion.mybiznext.in/", //"http://localhost:3000/"
  Authenticate: "Users/Authenticate",
  Invoice: {
    GetAllInvoice: "FAC/Invoice/GetInvoice",
    AddNewInvoice: "FAC/Invoice/CreateInvoice",
    GetItemMaster: "FAC/Invoice/GetItemMaster",
    GetCompanyAddress: "FAC/Invoice/GetCompanyAddress",
    GetInvoiceCategory: "FAC/Invoice/GetInvoiceCategory",
    GetGSTCategory: "FAC/Invoice/GetGSTCategory",
    GetSupplier: "FAC/Invoice/GetSupplier",
    GetCustomer: "FAC/Invoice/GetCustomer",
    GetBRAddress: "FAC/Invoice/GetBusinessRelationAddress",
    GetInvoiceChargeMaster: "FAC/Invoice/GetInvoiceChargeMaster",
    GetInvoiceList: "FAC/Invoice/GetInvoiceList",
    GetInvoiceData: "FAC/Invoice/GetInvoiceForEdit",
  },
  DeliveryChallan: {
    GetCountryList: "FAC/Invoice/GetCountryList",
    GetStateList: "FAC/Invoice/GetStateList",
    GetCityList: "FAC/Invoice/GetCityList",
  },
};
