export interface CodeID {
  idGet:
    | "PenyuNaik"
    | "PenyuNaikTidakBertelur"
    | "TelurDikerami"
    | "TelurMenetas"
    | "TukikDirawat"
    | "TukikMati"
    | "TukikDilepas"
    | "Pengguna"
    | "Inkubator"
    | "Zona"
    | "Tempat"
    | "ReportBulanan"
    | "ReportTahunan";
}

export function customID(idGet: CodeID["idGet"]): string {
  const codeConfig: { [key: string]: string } = {
    PenyuNaik: "PN",
    PenyuNaikTidakBertelur: "PNTB",
    TelurDikerami: "TD",
    TelurMenetas: "TM",
    TukikDirawat: "TI",
    TukikMati: "TMa",
    TukikDilepas: "TDi",
    Pengguna: "US",
    Zona: "ZN",
    Tempat: "PL",
    Inkubator: "INK",
    ReportBulanan : "RB",
    ReportTahunan : "RT",
  };

  return codeConfig[idGet];
}
