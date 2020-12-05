import { browser, WebRequest } from 'webextension-polyfill-ts';
import getURLMatcher from './matcher';

type OnBeforeRequestDetailsType = WebRequest.OnBeforeRequestDetailsType;
type BlockingResponse = WebRequest.BlockingResponse;

const webRequestListener = async (
  details: OnBeforeRequestDetailsType,
): Promise<BlockingResponse> => {
  const urlMatcher = await getURLMatcher(details.url);
  if (!urlMatcher) {
    return { cancel: false };
  }
  const matchedTabs = await browser.tabs.query({
    status: 'complete',
    url: urlMatcher,
  });
  // No tabs matched; request goes as usual.
  if (!matchedTabs?.length) {
    return { cancel: false };
  }
  // Only use the most recently used tab.
  matchedTabs.sort((t1, t2) => {
    if (t1.lastAccessed === undefined) return -1;
    if (t2.lastAccessed === undefined) return 1;
    return t1.lastAccessed - t2.lastAccessed;
  });
  await browser.tabs.update(matchedTabs[0].id, {
    url: details.url,
    active: true,
  });
  await browser.tabs.remove(details.tabId);
  return { cancel: true };
};

export default webRequestListener;
