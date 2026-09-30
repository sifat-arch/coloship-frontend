const prefix = "/courier";

export const courierRoutes = [
  {
    title: "Management",

    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Approve Courier",
        url: `${prefix}/is-available`,
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
        isActive: true,
      },
    ],
  },
];
