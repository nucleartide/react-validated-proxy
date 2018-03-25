import * as React from 'react';
import { render } from 'react-dom';

import Adult from './validations/adult';
import Child from './validations/child';
import Validate from './components/Validate';
import ValidatedField from './components/ValidatedField';

const user = {
  firstName: 'Billy',
  lastName: 'Bob',
  email: '',
  job: '',
  age: 10,
};

// 	<div class="row">
//   	<button {{action save changeset}} disabled={{changeset.isInvalid}} class="button-primary">Save</button>
//   	<button {{action reset changeset}}>Reset</button>
//   </div>

render(
  <Validate model={user} as={Adult}>
    {({ model, set, reset }) => (
      <form>
        {Object.keys(user).map(k => (
          <ValidatedField
            key={k}
            model={model}
            property={k}
            setProperty={set}
          />
        ))}

        <button type="button">Save</button>
        <button type="button" onClick={reset}>Reset</button>
      </form>
    )}
  </Validate>,
  document.getElementById('app')
);
