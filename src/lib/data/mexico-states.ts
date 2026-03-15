export const MEXICO_STATES = [
  { code: "AGS", name: "Aguascalientes" },
  { code: "BC", name: "Baja California" },
  { code: "BCS", name: "Baja California Sur" },
  { code: "CAM", name: "Campeche" },
  { code: "CHIS", name: "Chiapas" },
  { code: "CHIH", name: "Chihuahua" },
  { code: "CDMX", name: "Ciudad de México" },
  { code: "COAH", name: "Coahuila" },
  { code: "COL", name: "Colima" },
  { code: "DGO", name: "Durango" },
  { code: "GTO", name: "Guanajuato" },
  { code: "GRO", name: "Guerrero" },
  { code: "HGO", name: "Hidalgo" },
  { code: "JAL", name: "Jalisco" },
  { code: "MEX", name: "Estado de México" },
  { code: "MICH", name: "Michoacán" },
  { code: "MOR", name: "Morelos" },
  { code: "NAY", name: "Nayarit" },
  { code: "NL", name: "Nuevo León" },
  { code: "OAX", name: "Oaxaca" },
  { code: "PUE", name: "Puebla" },
  { code: "QRO", name: "Querétaro" },
  { code: "QROO", name: "Quintana Roo" },
  { code: "SLP", name: "San Luis Potosí" },
  { code: "SIN", name: "Sinaloa" },
  { code: "SON", name: "Sonora" },
  { code: "TAB", name: "Tabasco" },
  { code: "TAM", name: "Tamaulipas" },
  { code: "TLAX", name: "Tlaxcala" },
  { code: "VER", name: "Veracruz" },
  { code: "YUC", name: "Yucatán" },
  { code: "ZAC", name: "Zacatecas" },
] as const;

export type StateCode = (typeof MEXICO_STATES)[number]["code"];

export const DEFAULT_STATE: StateCode = "SLP";

export function getStateName(code: StateCode): string {
  return MEXICO_STATES.find((s) => s.code === code)?.name ?? code;
}
