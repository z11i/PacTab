import { browser } from 'webextension-polyfill-ts';
import { webRequestListener } from './listener';

browser.webRequest.onBeforeRequest.addListener(
  webRequestListener,
  { urls: ['<all_urls>'], types: ['main_frame'] },
  ['blocking']
);
// browser.tabs.onUpdated.addListener(tabUpdatedListener);
// browser.tabs.onCreated.addListener(onTabCreated);
// browser.tabs.onRemoved.addListener(onTabRemoved);
