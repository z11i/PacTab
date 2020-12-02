import { browser } from 'webextension-polyfill-ts';
import { URLRule } from '../rule';

const rulesKey = 'rules';

const storeRules = (rules: URLRule[]): Promise<void> => browser.storage.local.set({
  [rulesKey]: rules,
});

const fetchRules = async (): Promise<URLRule[]> => {
  const val = await browser.storage.local.get(rulesKey);
  const rules = val[rulesKey] as URLRule[];
  return Promise.resolve(rules || []);
};

export { storeRules, fetchRules };
