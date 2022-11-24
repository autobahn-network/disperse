export const chains = {
  autobahn: 45000,
};

export const disperseAddresses = {
  45000:
    import.meta.VITE_DISPERSE_AUTOBAHN ||
    "0xa36e217Dc24C730a36E8C35cc058B592Bf9343f6",
};

export const scans = {
  45000: "https://autobahn-explorer.com",
};

export const warnMessage =
  "*Supports Autobahn Network with ChainId: 45000*";
