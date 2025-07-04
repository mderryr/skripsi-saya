'use client'

import React, { CSSProperties, useState, useEffect } from 'react';
import { DynamicLineChart } from '@/components/Chart/line'
import { BarChart } from '@/components/Chart/bar'
import { convertChartToDataUrl } from '@/components/Chart/converter'

interface LogsData {
    json: {
        [month: string]: {
            PenyuNaikBertelur: number;
            PenyuNaikTakBertelur: number;
            TotalTelurDiselamatkan: number;
            TotalTelurMenetas: number;
            TotalTelurTakMenetas: number;
            TotalTukikDilepaskan: number;
            TotalTukikMati: number;
        };
    };
}

interface ReportProps {
    logsData: LogsData;
    dataPenyu: {
        PenyuNaikBertelur: number
        PenyuNaikTakBertelur: number
        TotalTelurDiselamatkan: number
        TotalTelurMenetas: number
        TotalTelurTakMenetas: number
        TotalTukikDilepaskan: number
        TotalTukikMati: number
        TotalTukikDilepas: number
    }
}
const styles: { [key: string]: CSSProperties } = {
    pageContainer: {
        width: '210mm',
        height: '297mm',
        maxWidth: '210mm',
        margin: '0 auto',     
        padding: '6mm 6mm 6mm 10mm', // Tambahkan padding kiri lebih besar
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        position: 'relative', // Tambahkan positioning
    },
    header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: '3mm',
        paddingBottom: '2mm',
        borderBottom: '1px solid #e0e0e0',
    },
    title: {
        fontSize: '11pt',
        color: '#2c3e50',
        margin: 0,
        fontWeight: 600,
    },
    subtitle: {
        fontSize: '9pt',
        color: '#7f8c8d',
        marginTop: '1mm',
    },
    chartSection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '2mm',
    },
    chartContainer: {
        width: '48%',
        marginBottom: '2mm',
        boxSizing: 'border-box',
        padding: '1mm',
    },
    chartTitle: {
        fontSize: '8pt',
        color: '#2c3e50',
        marginBottom: '1mm',
        textAlign: 'center',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '1mm',
    },
    chartWrapper: {
        width: '100%',
        height: '45mm', // Lebih kecil
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartImage: {
        maxWidth: '100%',
        maxHeight: '45mm',
        objectFit: 'contain',
    },
    footer: {
        width: '100%',
        textAlign: 'center',
        padding: '2mm 0',
        marginTop: 'auto',
        borderTop: '1px solid #e0e0e0',
        fontSize: '7pt',
        color: '#666',
    },

    analysisSection: {
        fontSize: '7pt',
        lineHeight: 1.2,
        padding: '0 2mm',
        marginTop: '1mm', // Kurangi margin top
        marginBottom: '1mm', // Kurangi margin bottom
        width: '100%',
        boxSizing: 'border-box',
    },
    sectionHeader: {
        fontSize: '9pt',
        marginBottom: '1mm',
        color: '#2c3e50',
        borderBottom: '1px solid #e0e0e0', // Tambahkan garis bawah tipis
        paddingBottom: '1mm', // Tambahkan sedikit padding bawah
    },
    summaryList: {
        paddingLeft: '2mm',
        margin: 0,
        fontSize: '7pt',
        lineHeight: 1.2,
        listStyleType: 'disc', // Tambahkan bullet point
        listStylePosition: 'inside', // Posisi bullet point
    },
    paragraph: {
        fontSize: '7pt',
        lineHeight: 1.2,
        margin: '1mm 0',
    },
    analysisContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '2mm',
        marginBottom: '2mm',
        gap: '2mm', // Tambahkan jarak antar kolom
    }
};
const hitungPresentase = (dataPenyu: {
    PenyuNaikBertelur: number
    PenyuNaikTakBertelur: number
    TotalTelurDiselamatkan: number
    TotalTelurMenetas: number
    TotalTelurTakMenetas: number
    TotalTukikDilepaskan: number
    TotalTukikMati: number
    TotalTukikDilepas: number
}) => {
    // 1. Presentase Penyu Naik Bertelur
    const totalPenyuNaik = dataPenyu.PenyuNaikBertelur + dataPenyu.PenyuNaikTakBertelur;
    const presentasePenyuNaikBertelur = totalPenyuNaik > 0
        ? ((dataPenyu.PenyuNaikBertelur / totalPenyuNaik) * 100).toFixed(2)
        : '0.00';

    // 2. Presentase Telur Menetas
    const totalTelur = dataPenyu.TotalTelurDiselamatkan;
    const presentaseTelurMenetas = totalTelur > 0
        ? ((dataPenyu.TotalTelurMenetas / totalTelur) * 100).toFixed(2)
        : '0.00';

    // 3. Presentase Tukik Dilepas
    const totalTukikMenetas = dataPenyu.TotalTelurMenetas;
    const presentaseTukikDilepas = totalTukikMenetas > 0
        ? ((dataPenyu.TotalTukikDilepaskan / totalTukikMenetas) * 100).toFixed(2)
        : '0.00';

    return {
        presentasePenyuNaikBertelur,
        presentaseTelurMenetas,
        presentaseTukikDilepas
    };
};

const chartPalette = {
    primary: [
        'rgba(54, 162, 235, 0.7)',   // Biru cerah
        'rgba(255, 99, 132, 0.7)',   // Merah muda
        'rgba(75, 192, 192, 0.7)',   // Tosca
        'rgba(255, 206, 86, 0.7)',   // Kuning
        'rgba(153, 102, 255, 0.7)',  // Ungu
        'rgba(46, 204, 113, 0.7)',   // Hijau cerah 
    ],
    secondary: [
        'rgba(54, 162, 235, 1)',     // Biru cerah solid
        'rgba(255, 99, 132, 1)',     // Merah muda solid
        'rgba(75, 192, 192, 1)',     // Tosca solid
        'rgba(255, 206, 86, 1)',     // Kuning solid
        'rgba(153, 102, 255, 1)',    // Ungu solid
        'rgba(46, 204, 113, 1)',     // Hijau cerah solid 
    ]
};

export const ReportYearsPageThree: React.FC<ReportProps> = ({ logsData, dataPenyu }) => {

    const [penyuNaikChartDataUrl, setPenyuNaikChartDataUrl] = useState<string | null>(null);
    const [totalTelurDiselamatkanDataUrl, setTotalTelurDiselamatkanDataUrl] = useState<string | null>(null);
    const [tukikMenetasDataUrl, setTukikMenetasDataUrl] = useState<string | null>(null);
    const [totalTukikMatiDataUrl, setTotalTukikMatiDataUrl] = useState<string | null>(null);
    const [totalTukikDilepaskanDataUrl, setTotalTukikDilepaskanDataUrl] = useState<string | null>(null);

    const months = Object.keys(logsData.json);
    const penyuNaikBertelurData = months.map(month => logsData.json[month].PenyuNaikBertelur);
    const penyuNaikTakBertelurData = months.map(month => logsData.json[month].PenyuNaikTakBertelur);
    const totalTelurDiselamatkanData = months.map(month => logsData.json[month].TotalTelurDiselamatkan);
    const totalTukikDilepaskanData = months.map(month => logsData.json[month].TotalTukikDilepaskan);
    const totalTukikMatiData = months.map(month => logsData.json[month].TotalTukikMati);

    // Menyusun data tahun untuk tukik menetas dan tidak menetas
    const yearlyData: { [year: string]: { menetas: number; tidakMenetas: number } } = {};
    months.forEach(month => {
        const year = month.split('-')[0]; // Ambil tahun dari bulan
        const menetas = logsData.json[month].TotalTelurMenetas;
        const tidakMenetas = logsData.json[month].TotalTelurTakMenetas;

        if (!yearlyData[year]) {
            yearlyData[year] = { menetas: 0, tidakMenetas: 0 };
        }

        yearlyData[year].menetas += menetas;
        yearlyData[year].tidakMenetas += tidakMenetas;
    });

    const years = Object.keys(yearlyData);
    const menetasData = years.map(year => yearlyData[year].menetas);
    const tidakMenetasData = years.map(year => yearlyData[year].tidakMenetas);

    //Menghitung Presentase Data
    const {
        presentasePenyuNaikBertelur,
        presentaseTelurMenetas,
        presentaseTukikDilepas
    } = hitungPresentase(dataPenyu);

    // Effect untuk mengonversi chart ke data URL
    useEffect(() => {
        const loadChartDataUrls = async () => {
            // Konfigurasi chart Komposisi Penyu Naik
            const penyuNaikChartConfig = {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Penyu Naik Bertelur',
                            data: penyuNaikBertelurData,
                            backgroundColor: chartPalette.primary[0],
                        },
                        {
                            label: 'Penyu Naik Tak Bertelur',
                            data: penyuNaikTakBertelurData,
                            backgroundColor: chartPalette.primary[1],
                        },
                    ],
                },
                options: {
                    responsive: false,
                    width: 400,
                    height: 300,
                },
            };

            // Konfigurasi chart Total Telur Diselamatkan
            const totalTelurDiselamatkanChartConfig = {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Total Telur Diselamatkan',
                            data: totalTelurDiselamatkanData,
                            borderColor: chartPalette.primary[2],
                            backgroundColor: chartPalette.secondary[2],
                        },
                    ],
                },
                options: {
                    responsive: false,
                    width: 400,
                    height: 300,
                },
            };

            // Konfigurasi chart Tukik Menetas vs Tidak Menetas
            const tukikChartConfig = {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Tukik Menetas',
                            data: menetasData,
                            backgroundColor: chartPalette.primary[3],
                        },
                        {
                            label: 'Tukik Tidak Menetas',
                            data: tidakMenetasData,
                            backgroundColor: chartPalette.primary[4],
                        },
                    ],
                },
                options: {
                    responsive: false,
                    width: 400,
                    height: 300,
                },
            };

            // Konfigurasi chart Total Tukik Mati
            const totalTukikMatiChartConfig = {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Total Tukik Mati',
                            data: totalTukikMatiData,
                            borderColor: chartPalette.primary[5],
                            backgroundColor: chartPalette.secondary[5],
                        },
                    ],
                },
                options: {
                    responsive: false,
                    width: 400,
                    height: 300,
                },
            };

            // Konfigurasi chart Total Tukik Dilepaskan
            const totalTukikDilepaskanChartConfig = {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: 'Total Tukik Dilepaskan',
                            data: totalTukikDilepaskanData,
                            borderColor: chartPalette.primary[0],
                            backgroundColor: chartPalette.secondary[0],
                        },
                    ],
                },
                options: {
                    responsive: false,
                    width: 400,
                    height: 300,
                },
            };

            // Konversi chart ke data URL
            const penyuNaikDataUrl = await convertChartToDataUrl(penyuNaikChartConfig);
            const totalTelurDiselamatkanDataUrl = await convertChartToDataUrl(totalTelurDiselamatkanChartConfig);
            const tukikDataUrl = await convertChartToDataUrl(tukikChartConfig);
            const totalTukikMatiDataUrl = await convertChartToDataUrl(totalTukikMatiChartConfig);
            const totalTukikDilepaskanDataUrl = await convertChartToDataUrl(totalTukikDilepaskanChartConfig);

            // Set state dengan data URL chart
            setPenyuNaikChartDataUrl(penyuNaikDataUrl);
            setTotalTelurDiselamatkanDataUrl(totalTelurDiselamatkanDataUrl);
            setTukikMenetasDataUrl(tukikDataUrl);
            setTotalTukikMatiDataUrl(totalTukikMatiDataUrl);
            setTotalTukikDilepaskanDataUrl(totalTukikDilepaskanDataUrl);
        };

        loadChartDataUrls();
    }, [logsData]);


    return (
        <div
            style={{
                ...styles.pageContainer,
                position: 'relative', // Tambahkan positioning
                overflow: 'hidden'    // Cegah konten meluap
            }}
        >
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>
                    Laporan Konservasi Penyu
                </h1>
                <h2 style={styles.subtitle}>
                    Halaman 3: Grafik dan Analisis Tahunan
                </h2>
            </div>
            <div style={styles.chartSection}>
                {/* Chart Pertama: Penyu Naik Bertelur */}
                <div style={styles.chartContainer}>
                    <h2 style={styles.chartTitle}>Penyu Naik Bertelur</h2>
                    <div style={styles.chartWrapper}>
                        {penyuNaikChartDataUrl ? (
                            <img
                                src={penyuNaikChartDataUrl}
                                alt="Chart Penyu Naik"
                                style={styles.chartImage}
                            />
                        ) : (
                            <BarChart
                                labels={months}
                                datasets={[
                                    {
                                        label: 'Penyu Naik Bertelur',
                                        data: penyuNaikBertelurData,
                                        backgroundColor: chartPalette.primary[0],

                                    },
                                    {
                                        label: 'Penyu Naik Tak Bertelur',
                                        data: penyuNaikTakBertelurData,
                                        backgroundColor: chartPalette.primary[1],
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>

                {/* Chart Kedua: Total Telur Diselamatkan */}
                <div style={styles.chartContainer}>
                    <h2 style={styles.chartTitle}>Total Telur Diselamatkan</h2>
                    <div style={styles.chartWrapper}>
                        {totalTelurDiselamatkanDataUrl ? (
                            <img
                                src={totalTelurDiselamatkanDataUrl}
                                alt="Chart Telur Diselamatkan"
                                style={styles.chartImage}
                            />
                        ) : (
                            <DynamicLineChart
                                labels={months}
                                datasets={[
                                    {
                                        label: 'Total Telur Diselamatkan',
                                        data: totalTelurDiselamatkanData,
                                        borderColor: chartPalette.primary[2],
                                        backgroundColor: chartPalette.secondary[2],
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Tambahan baris chart berikutnya */}
            <div style={styles.chartSection}>
                {/* Chart Ketiga: Tukik Menetas */}
                <div style={styles.chartContainer}>
                    <h2 style={styles.chartTitle}>Tukik Menetas vs Tidak Menetas</h2>
                    <div style={styles.chartWrapper}>
                        {tukikMenetasDataUrl ? (
                            <img
                                src={tukikMenetasDataUrl}
                                alt="Chart Tukik Menetas"
                                style={styles.chartImage}
                            />
                        ) : (
                            <BarChart
                                labels={years}
                                datasets={[
                                    {
                                        label: 'Tukik Menetas',
                                        data: menetasData,
                                        backgroundColor: chartPalette.primary[3],
                                    },
                                    {
                                        label: 'Tukik Tidak Menetas',
                                        data: tidakMenetasData,
                                        backgroundColor: chartPalette.primary[4],
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>

                {/* Chart Keempat: Total Tukik Mati */}
                <div style={styles.chartContainer}>
                    <h2 style={styles.chartTitle}>Total Tukik Mati</h2>
                    <div style={styles.chartWrapper}>
                        {totalTukikMatiDataUrl ? (
                            <img
                                src={totalTukikMatiDataUrl}
                                alt="Chart Tukik Mati"
                                style={styles.chartImage}
                            />
                        ) : (
                            <DynamicLineChart
                                labels={months}
                                datasets={[
                                    {
                                        label: 'Total Tukik Mati',
                                        data: totalTukikMatiData,
                                        borderColor: chartPalette.primary[5],
                                        backgroundColor: chartPalette.secondary[5],
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>

                {/* Chart Kelima: Total Tukik Dilepaskan */}
                <div style={styles.chartContainer}>
                    <h2 style={styles.chartTitle}>Total Tukik Dilepaskan</h2>
                    <div style={styles.chartWrapper}>
                        {totalTukikDilepaskanDataUrl ? (
                            <img
                                src={totalTukikDilepaskanDataUrl}
                                alt="Chart Tukik Dilepaskan"
                                style={styles.chartImage}
                            />
                        ) : (
                            <DynamicLineChart
                                labels={months}
                                datasets={[
                                    {
                                        label: 'Total Tukik Dilepaskan',
                                        data: totalTukikDilepaskanData,
                                        borderColor: chartPalette.primary[5],
                                        backgroundColor: chartPalette.secondary[5],
                                    },
                                ]}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div style={styles.analysisContainer}>
                <div style={{ ...styles.analysisSection, width: '60%' }}>
                    <h3 style={styles.sectionHeader}>Analisis Grafik</h3>
                    <p style={styles.paragraph}>
                        Grafik di atas menampilkan visualisasi data konservasi penyu, menunjukkan
                        fluktuasi aktivitas penyu naik bertelur dan jumlah telur yang berhasil diselamatkan
                        sepanjang tahun.
                    </p>
                    <p style={styles.paragraph}>
                        Analisis visual membantu memahami pola musiman, efektivitas upaya konservasi,
                        dan tantangan yang dihadapi dalam perlindungan penyu di wilayah ini.
                    </p>
                </div>

                <div style={{ ...styles.analysisSection, width: '40%' }}>
                    <h3 style={styles.sectionHeader}>Ringkasan Presentase</h3>
                    <ul style={styles.summaryList}>
                        <li>Presentase Penyu Naik Bertelur: {presentasePenyuNaikBertelur}%</li>
                        <li>Presentase Telur Menetas: {presentaseTelurMenetas}%</li>
                        <li>Presentase Tukik Dilepas: {presentaseTukikDilepas}%</li>
                    </ul>
                </div>
            </div>


            {/* Footer */}
            <div style={{
                ...styles.footer,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}>
                <p>Halaman 3 dari 3 - Laporan Akhir Konservasi</p>
            </div>
        </div>

    );
};

export default ReportYearsPageThree
