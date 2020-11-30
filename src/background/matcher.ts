import { fetchPatterns, storePatterns } from '../storage/local';
import { CorelatedURLPattern } from '../url-pattern';

const corelatedPatterns: CorelatedURLPattern[] = [
  {
    targetUrlMatcher: 'https://duckduckgo.com/*',
    patterns: [new RegExp('https://duckduckgo.com/')],
  },
];

storePatterns(corelatedPatterns).then(() => {
  console.log('saved');
});

const getUrlMatcher = async (url: string): Promise<string | undefined> => {
  const savedPatterns = await fetchPatterns();
  return savedPatterns.find((cp) => cp.patterns.some((pat) => pat.test(url)))
    ?.targetUrlMatcher;
};

export { getUrlMatcher };
