import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import ValidatedField from './components/ValidatedField';
import { validatedProxy, BufferedProxy } from 'validated-proxy';

const user = {
  name: 'Billy Bob',
  age: 25,
};

/*
	<div class="row">
  	<button {{action save changeset}} disabled={{changeset.isInvalid}} class="button-primary">Save</button>
  	<button {{action reset changeset}}>Reset</button>
  </div>

  ChildValidations, AdultValidations
*/

/*
<Validate model={user}>

ReactDOM.render(
  <Container />,
  document.getElementById('app')
);
*/

/*
<Validate model={user} as={Adult}>
  {(user, setUser) => (
  )}
</Validate>
*/
