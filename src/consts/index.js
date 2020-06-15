const ROUTES = {
  home: "/",
  detailLand: { path: "/detailLand/:id", to: "/detailLand/" },
  camera: "/camera",
  qr: "/qr",
  manier: "/manier",
  ontvanger: "/ontvanger",
  video: "/:id",
  detailSouvenir: { path: "/detailSouvenir/:landId/:id", to: "/detailSouvenir/" },
};

export { ROUTES };
