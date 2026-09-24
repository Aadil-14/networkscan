export const initialBandwidthData = [
  { time: "00:00", upload: 120, download: 340 },
  { time: "04:00", upload: 80, download: 210 },
  { time: "08:00", upload: 450, download: 890 },
  { time: "12:00", upload: 620, download: 1200 },
  { time: "16:00", upload: 780, download: 1450 },
  { time: "20:00", upload: 390, download: 780 },
  { time: "23:59", upload: 210, download: 490 },
];

export const initialReportSummary = {
  slaTarget: "99.94%",
  slaStatus: "Above 99.90% SLA",
  peakTraffic: "1.45 Gbps",
  peakTime: "Recorded at 16:00 UTC",
  avgLatency: "8.4 ms",
  latencyScope: "Global Node Average",
  period: "Last 30 Days",
  dateRange: "Oct 01 - Oct 30, 2026",
};
