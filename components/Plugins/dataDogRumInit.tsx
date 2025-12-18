// Necessary if using App Router to ensure this file runs on the client
"use client";
import { datadogRum } from '@datadog/browser-rum';
import env_config from '../../config.json';

datadogRum.init({
    applicationId: env_config?.applicationId,
    clientToken: env_config?.DD_RUM_KEY,
    site: 'datadoghq.com',
    service: 'nvbot-ui',
    env: env_config?.ENV || 'dev',
    allowedTracingUrls: [(url) => url.startsWith(env_config.allowedTracingUrls)],
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
   
