const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Management",

    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Track",
        url: `${prefix}`,
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
