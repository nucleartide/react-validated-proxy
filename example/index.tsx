import * as React from 'react';
import { render } from 'react-dom';

import Adult from './validations/adult';
import Child from './validations/child';
import Validate from '..';
import ValidatedField from './components/ValidatedField';

window.user = {
  firstName: 'Billy',
  lastName: 'Bob',
  email: '',
  job: '',
  age: 10,
};

// Try swapping `as={Adult}` with `as={Child}`.
render(
  <Validate model={window.user} as={Adult}>
    {({ model, set, reset, isPristine, hasErrors, flush }) => (
      <form onSubmit={e => {
        e.preventDefault();
        flush();
      }}>
        <h2>Profile</h2>

        <ValidatedField
          type="text"
          model={model}
          property="firstName"
          setProperty={set}
        />

        <ValidatedField
          type="text"
          model={model}
          property="lastName"
          setProperty={set}
        />

        <ValidatedField
          type="text"
          model={model}
          property="email"
          setProperty={set}
        />

        <ValidatedField
          type="text"
          model={model}
          property="job"
          setProperty={set}
        />

        <ValidatedField
          type="number"
          model={model}
          property="age"
          setProperty={(name, value) => set(name, parseInt(value, 10))}
        />

        <div className="ButtonRow">
          <button
            className="Save"
            type="submit"
            disabled={isPristine || hasErrors}
          >
            Save
          </button>

          <button
            className="Reset"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </form>
    )}
  </Validate>,
  document.getElementById('app')
);
