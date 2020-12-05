/* eslint-disable no-underscore-dangle */
import { ulid } from 'ulid';

interface SourceRegex {
  id: string;
  repr: string;
}

const blankSourceRegex = (): SourceRegex => ({
  id: ulid(),
  repr: '',
});

interface URLRule {
  id: string;
  targetURLMatcher: string;
  sourceRegexes: SourceRegex[];
}

const blankRule = (): URLRule => ({
  id: ulid(),
  targetURLMatcher: '',
  sourceRegexes: [],
});

interface URLRuleErrors {
  [ruleID: string]: URLRuleError;
}

interface URLRuleError {
  sourceErrors?: {
    [sourceID: string]: string
  };
  error?: string;
}

const validateRule = (rule: URLRule): URLRuleError | null => {
  if (rule.targetURLMatcher === '') {
    return { error: 'target cannot be empty' };
  }
  if (rule.sourceRegexes.length === 0) {
    return { error: 'sources cannot be empty' };
  }
  const sourceErrors = <{[key: string]: string}>{};
  rule.sourceRegexes.forEach((source) => {
    if (source.repr === '') {
      sourceErrors[source.id] = 'source cannot be empty';
    }
    try {
      // eslint-disable-next-line no-new
      new RegExp(source.repr);
    } catch (e) {
      sourceErrors[source.id] = String(e);
    }
  });
  if (Object.keys(sourceErrors).length !== 0) {
    return { sourceErrors };
  }
  return null;
};

const validateRules = (rules: URLRule[]): URLRuleErrors | null => {
  const result = rules.reduce((map, rule) => {
    const error = validateRule(rule);
    return error === null
      ? map
      : { ...map, [rule.id]: error };
  }, <URLRuleErrors>{});
  if (Object.keys(result).length !== 0) {
    return result;
  }
  return null;
};

export {
  URLRule, URLRuleErrors, blankRule, blankSourceRegex, validateRules,
};
