
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.70cedb9873794158880d62777137dca1',
  appName: 'binge-watch-owl',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://70cedb98-7379-4158-880d-62777137dca1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    allowsLinkPreview: false,
    scrollEnabled: true,
    backgroundColor: '#121212'
  }
};

export default config;
