import { fetchRules } from '../storage/local';

const getUrlMatcher = async (url: string): Promise<string | undefined> => {
  const savedPatterns = await fetchRules();
  return savedPatterns
    .find((cp) => cp.sourceRegexes.some((_) => new RegExp(_.repr).test(url)))
    ?.targetUrlMatcher;
};

export default getUrlMatcher;
