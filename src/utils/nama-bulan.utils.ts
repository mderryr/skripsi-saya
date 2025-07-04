export const namaBulanPanjang = [
    'Januari', 
    'Februari', 
    'Maret', 
    'April', 
    'Mei', 
    'Juni', 
    'Juli', 
    'Agustus', 
    'September', 
    'Oktober', 
    'November', 
    'Desember'
];

export const namaBulanPendek = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'Mei', 
    'Jun', 
    'Jul', 
    'Agt', 
    'Sep', 
    'Okt', 
    'Nov', 
    'Des'
];

export default function getNamaBulan(bulan: number, format: 'pendek' | 'panjang' = 'panjang'): string {


    // Validasi input bulan
    if (bulan < 1 || bulan > 12) {
        throw new Error('Nomor bulan harus antara 1 dan 12');
    }

    // Kurangi 1 karena array dimulai dari index 0
    const indexBulan = bulan - 1;

    // Kembalikan nama bulan sesuai format
    return format === 'panjang' 
        ? namaBulanPanjang[indexBulan] 
        : namaBulanPendek[indexBulan];
}

