import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'engy',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
