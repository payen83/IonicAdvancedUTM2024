import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.utm.utm2024',
  appName: 'UTM2024',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }, 
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#ff0000"
    },
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
