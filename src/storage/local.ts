import { browser } from 'webextension-polyfill-ts';
import { CorelatedURLPattern } from '../url-pattern';

const patternsKey = 'patterns';

const storePatterns = (patterns: CorelatedURLPattern[]): Promise<void> => {
  return browser.storage.local.set({
    [patternsKey]: patterns,
  });
};

const fetchPatterns = async (): Promise<CorelatedURLPattern[]> => {
  const val = await browser.storage.local.get(patternsKey);
  return Promise.resolve(val[patternsKey] as CorelatedURLPattern[]);
};

export { storePatterns, fetchPatterns };
