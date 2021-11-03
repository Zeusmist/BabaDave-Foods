// levels are numbered from closest (cheapest) to farthest (most expensive)

// MAINLAND

// LEVEL 1
const surulere_coords = { lat: 6.49834, lng: 3.34841 };
const mushin_coords = { lat: 6.5353, lng: 3.34896 };
const oshodi_coords = { lat: 6.55339, lng: 3.33715 };
const ilupeju_coords = { lat: 6.55367, lng: 3.35659 };
const anthony_coords = { lat: 6.56444, lng: 3.37065 };
const ogudu_coords = { lat: 6.57438, lng: 3.39348 };
const maryland_coords = { lat: 6.57661, lng: 3.36418 };
const ketu_coords = { lat: 6.59744, lng: 3.39043 };
const ikeja_coords = { lat: 6.60175, lng: 3.3512 };
const magodo_phase2_coords = { lat: 6.6176, lng: 3.3817 };

const mainland_level1_coords = [
  surulere_coords,
  mushin_coords,
  oshodi_coords,
  ilupeju_coords,
  anthony_coords,
  ogudu_coords,
  maryland_coords,
  ketu_coords,
  ikeja_coords,
  magodo_phase2_coords,
];

// LEVEL 2
const festac_coords = { lat: 6.4706, lng: 3.28059 };
const isolo_coords = { lat: 6.53751, lng: 3.32251 };
const ejigbo_coords = { lat: 6.55153, lng: 3.29339 };
const egbeda_coords = { lat: 6.59161, lng: 3.29198 };
const iyana_ipaja_coords = { lat: 6.61996, lng: 3.30809 };

const mainland_level2_coords = [
  festac_coords,
  isolo_coords,
  ejigbo_coords,
  egbeda_coords,
  iyana_ipaja_coords,
];

// LEVEL 3
const ayobo_coords = { lat: 6.6054, lng: 3.24407 };
const ipaja_coords = { lat: 6.61323, lng: 3.26573 };
const ikorodu_coords = { lat: 6.61939, lng: 3.51171 };

const mainland_level3_coords = [ayobo_coords, ipaja_coords, ikorodu_coords];

// LEVEL 4
const satellite_town_coords = { lat: 6.44529, lng: 3.26238 };
const ojo_coords = { lat: 6.45812, lng: 3.15793 };

const mainland_level4_coords = [satellite_town_coords, ojo_coords];

// ISLAND

// LEVEL 1
const victoria_island_coords = { lat: 6.42924, lng: 3.42321 };
const lekki_phase1_coords = { lat: 6.44815, lng: 3.47479 };
const marina_coords = { lat: 6.45078, lng: 3.39012 };

const island_level1_coords = [
  victoria_island_coords,
  lekki_phase1_coords,
  marina_coords,
];

// LEVEL 2
const lekki_peninnsula2_coords = { lat: 6.44331, lng: 3.52145 };
const ajah1_coords = { lat: 6.46773, lng: 3.56283 };

const island_level2_coords = [lekki_peninnsula2_coords, ajah1_coords];

// LEVEL 3
const ajah2_coords = { lat: 6.46483, lng: 3.57194 };
const sangotedo_coords = { lat: 6.4534, lng: 3.62451 };

const island_level3_coords = [ajah2_coords, sangotedo_coords];

export const delivery_polygons = [
  {
    title: "Mainland level 1",
    delivery_fee: 1700,
    coords: mainland_level1_coords,
  },
  {
    title: "Mainland level 2",
    delivery_fee: 2000,
    coords: mainland_level2_coords,
  },
  {
    title: "Mainland level 3",
    delivery_fee: 2500,
    coords: mainland_level3_coords,
  },
  {
    title: "Mainland level 4",
    delivery_fee: 3000,
    coords: mainland_level4_coords,
  },
  {
    title: "Island level 1",
    delivery_fee: 2000,
    coords: island_level1_coords,
  },
  {
    title: "Island level 2",
    delivery_fee: 2500,
    coords: island_level2_coords,
  },
  {
    title: "Island level 3",
    delivery_fee: 3000,
    coords: island_level3_coords,
  },
];

export const office_coords = { lat: 6.5584, lng: 3.3915 };

export const lagos_coords = { lat: 6.5244, lng: 3.3792 };
