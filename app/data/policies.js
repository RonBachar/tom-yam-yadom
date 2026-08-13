export const SHIPPING_POLICY = {
  standard: {
    price: 5.99,
    currency: "USD",
    transitDays: 7,
    label: "$5.99 Standard Shipping (7 business days)",
  },
  expedited: {
    price: 11.99,
    currency: "USD",
    transitDaysMin: 1,
    transitDaysMax: 3,
    label: "$11.99 Expedited Shipping (1-3 business days)",
  },
  freeThreshold: 50,
  handlingDaysMin: 1,
  handlingDaysMax: 2,
  shipsFrom: "US",
};

export const RETURN_POLICY = {
  windowDays: 30,
  merchantCoversReturn: true,
  refundDays: 14,
};

export const MAILING_ADDRESS = {
  street: "17530 Lake Melford Avenue",
  city: "Bowie",
  state: "Maryland",
  postalCode: "20715",
};

export const MAILING_ADDRESS_LINE = `${MAILING_ADDRESS.street}, ${MAILING_ADDRESS.city}, ${MAILING_ADDRESS.state} ${MAILING_ADDRESS.postalCode}`;
