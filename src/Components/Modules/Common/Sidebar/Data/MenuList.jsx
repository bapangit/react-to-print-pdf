const MenuList = [
  {
    id: "1",
    name: "Master",
    submenu: [
      {
        id: "1-1",
        name: "Chart of Account",
        url: "/welcome",
      },
    ],
  },
  {
    id: "2",
    name: "Transaction",
    submenu: [
      {
        id: "2-1",
        name: "Revenue",
        submenu: [
          {
            id: "2-1-1",
            name: "Invoice",
            submenu: [
              {
                id: "2-1-1-1",
                name: "Sale Invoice",
                url: "/invoice",
              },
              {
                id: "2-1-1-2",
                name: "Credit Note",
                url: "/credit-note",
              },
              {
                id: "2-1-1-3",
                name: "Debit Note",
                url: "/debit-note",
              },
              {
                id: "2-1-1-4",
                name: "Stock Transfer",
                url: "/stock-transfer",
              },
              {
                id: "2-1-1-5",
                name: "Delivery Challan",
                url: "/delivery-challan",
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        name: "Purchase",
        url: "/welcome",
      },
      {
        id: "2-3",
        name: "Expense",
        url: "/welcome",
      },
      {
        id: "2-4",
        name: "Payment",
        url: "/welcome",
      },
      {
        id: "2-5",
        name: "Receipt",
        url: "/welcome",
      },
    ],
  },
  {
    id: "3",
    name: "Compliance",
    url: "/welcome",
  },
  {
    id: "4",
    name: "MIS",
    url: "/welcome",
  },
];

export default MenuList;
