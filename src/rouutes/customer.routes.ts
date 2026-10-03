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
        title: "Book a Parcel",
        url: `${prefix}/book-parcel`,
      },
      {
        title: "My Shipments",
        url: `${prefix}/shipments`,
      },
      {
        title: "Track Parcel",
        url: `${prefix}/track`,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Saved Addresses",
        url: `${prefix}/addresses`,
      },
      {
        title: "Profile",
        url: `${prefix}/profile`,
      },
    ],
  },
];
