export const initialSettings = {
  general: {
    orgName: "SkyLink Network Systems Inc.",
    primarySubnet: "192.168.1.0/24",
    scanInterval: "Every 5 Minutes (Real-time)",
  },
  security: {
    twoFactorAuth: true,
    ipWhitelisting: true,
  },
  api: {
    productionApiKey: "sk_live_9988231200938491823901",
  },
  notifications: {
    criticalEmailDispatch: true,
    slackWebhook: true,
  },
};
