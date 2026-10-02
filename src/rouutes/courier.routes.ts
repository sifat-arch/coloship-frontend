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
        title: "My Deliveries",
        url: `${prefix}/tasks`,
      },
      {
        title: "Profile",
        url: `${prefix}/profile`,
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
