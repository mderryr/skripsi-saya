export interface Status {
  status:
    | "Bertelur"
    | "Tidak Bertelur"
    | "Diinkubasi"
    | "Menetas"
    | "Dirawat"
    | "Mati"
    | "Dilepas"
    | "Aktif"
    | "Rusak"
    | undefined;
}

export const getStatusColor = (status: Status["status"]) => {
  switch (status) {
    case "Bertelur":
      return {
        Status: "Bertelur",
        color: "bg-emerald-500 text-white", // Hijau emerald untuk keberhasilan
      };
    case "Tidak Bertelur":
      return {
        Status: "Tidak Bertelur",
        color: "bg-red-600 text-white", // Merah untuk status negatif
      };
    case "Diinkubasi":
      return {
        Status: "Diinkubasi",
        color: "bg-amber-400 text-black", // Kuning amber untuk proses
      };
    case "Menetas":
      return {
        Status: "Menetas",
        color: "bg-green-400 text-white", // Hijau cerah untuk keberhasilan
      };
    case "Dirawat":
      return {
        Status: "Dirawat",
        color: "bg-blue-500 text-white", // Biru untuk perawatan
      };
    case "Mati":
      return {
        Status: "Mati",
        color: "bg-slate-800 text-white", // Hitam keabu-abuan untuk kematian
      };
    case "Dilepas":
      return {
        Status: "Dilepas",
        color: "bg-teal-500 text-white", // Teal untuk pelepasan
      };
    case "Aktif":
      return {
        Status: "Aktif",
        color: "bg-indigo-500 text-white", // Indigo untuk status aktif
      };
    case "Rusak":
      return {
        Status: "Ada Kendala",
        color: "bg-orange-500 text-white", // Orange untuk peringatan/kendala
      };
    default:
      return {
        Status: "Unknown",
        color: "bg-gray-500 text-white", // Abu-abu untuk status tidak diketahui
      };
  }
};