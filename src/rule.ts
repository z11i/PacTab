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

export { URLRule, blankRule, blankSourceRegex };
