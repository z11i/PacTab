import * as React from 'react';
import {
  blankRule, blankSourceRegex, URLRule, URLRuleErrors, validateRules,
} from '../rule';
import { fetchRules, storeRules } from '../storage/local';

import '../styles/styles.css';

const Options: React.FC = () => {
  const [rulesState, setRulesState] = React.useState<URLRule[]>([]);
  const [errorState, setErrorState] = React.useState<URLRuleErrors>({});

  const onAddTarget = () => {
    setRulesState([...rulesState, blankRule()]);
  };
  const onRemoveTarget = (id: string) => {
    setRulesState(rulesState.filter((_) => _.id !== id));
  };
  const onSaveTarget = async () => {
    const validateResults = validateRules(rulesState);
    if (validateResults !== null) {
      setErrorState(validateResults);
      return;
    }
    setErrorState({});
    await storeRules(rulesState);
  };
  const onUpdateTarget = (event: React.ChangeEvent<HTMLInputElement>, rid: string) => {
    const rules = rulesState.map(
      (rule) => ((rule.id === rid)
        ? { ...rule, targetURLMatcher: event.target.value }
        : rule),
    );
    setRulesState(rules);
  };

  React.useEffect(() => {
    fetchRules().then((rules) => {
      if (rules?.length) {
        setRulesState(rules);
      } else {
        setRulesState([blankRule()]);
      }
    });
  }, []);

  const onAddSource = (rid: string) => {
    setRulesState(rulesState.map((rule) => {
      if (rule.id === rid) {
        return {
          ...rule,
          sourceRegexes: [...rule.sourceRegexes, blankSourceRegex()],
        };
      }
      return rule;
    }));
  };
  const onRemoveSource = (rid: string, sid: string) => {
    setRulesState(rulesState.map((rule) => {
      if (rule.id === rid) {
        return {
          ...rule,
          sourceRegexes: rule.sourceRegexes.filter((_) => _.id !== sid),
        };
      }
      return rule;
    }));
  };
  const onUpdateSource = (e: React.ChangeEvent<HTMLInputElement>, rid: string, sid: string) => {
    setRulesState(rulesState.map((rule) => {
      if (rule.id === rid) {
        return {
          ...rule,
          sourceRegexes: rule.sourceRegexes.map((sr) => {
            if (sr.id === sid) {
              return {
                ...sr,
                repr: e.target.value,
              };
            }
            return sr;
          }),
        };
      }
      return rule;
    }));
  };

  return (
    <div>
      { rulesState.map((rule) => (
        <div key={rule.id} className="container">
          <div>
            <button type="button" onClick={() => onRemoveTarget(rule.id)}>-</button>
          </div>
          <div>
            <div>Always use the tab that matches:</div>
            <div>
              <input
                key={rule.id}
                type="text"
                value={rule.targetURLMatcher}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateTarget(e, rule.id)}
              />
            </div>
          </div>
          {errorState[rule.id]?.error && (
          <div className="error">{errorState[rule.id].error}</div>
          )}
          <div />
          <div>
            <div>...when new URLs match the following:</div>
            <div>
              { rule.sourceRegexes.map(({ id, repr }) => (
                <div className="container">
                  <div>
                    <button type="button" onClick={() => onRemoveSource(rule.id, id)}> - </button>
                  </div>
                  <div>
                    <input
                      key={id}
                      type="text"
                      value={repr}
                      onChange={
                      (e: React.ChangeEvent<HTMLInputElement>) => {
                        onUpdateSource(e, rule.id, id);
                      }
                    }
                    />
                  </div>
                  { errorState[rule.id]?.sourceErrors?.[id] && (
                  <div className="error">
                    {errorState[rule.id].sourceErrors?.[id]}
                  </div>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => onAddSource(rule.id)}>+</button>
            </div>
          </div>
        </div>
      ))}
      <input type="button" value="New Rule" onClick={onAddTarget} />
      <input type="button" value="Save Rules" onClick={onSaveTarget} />
    </div>

  );
};

export default Options;
