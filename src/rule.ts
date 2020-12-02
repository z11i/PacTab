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
  targetUrlMatcher: string;
  sourceRegexes: SourceRegex[];
}

const blankRule = (): URLRule => ({
  id: ulid(),
  targetUrlMatcher: '',
  sourceRegexes: [],
});

export { URLRule, blankRule, blankSourceRegex };
