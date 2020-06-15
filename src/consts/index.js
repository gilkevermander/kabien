const ROUTES = {
  home: "/",
  detailLand: { path: "/detailLand/:id", to: "/detailLand/" },
  qr: "/qr",
  login: "/login",
  register: "/register",
  detailSouvenir: { path: "/detailSouvenir/:landId/:id", to: "/detailSouvenir/" },
};

export { ROUTES };
