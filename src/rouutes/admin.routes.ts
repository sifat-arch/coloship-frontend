const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Approve Courier",
        url: `${prefix}/approve-courier`,
      },
      {
        title: "Shipments",
        url: `${prefix}/shipments`,
      },
      {
        title: "Users",
        url: `${prefix}/users`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];
