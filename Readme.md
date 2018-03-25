# react-validated-proxy

An approach to form validation in React that makes use of [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), by way of [**@poteto**](https://github.com/poteto)'s [`validated-proxy`](https://github.com/poteto/validated-proxy) library.

`react-validated-proxy` exports a single component `<Validate>`, which you can use to validate changes to any object.

## Install

_Note: this library is in alpha and is not ready for production use._

```bash
$ npm i react-validated-proxy
```

## Example

![](https://user-images.githubusercontent.com/914228/37880875-2ba750f6-305d-11e8-9a6a-6ed5d865339b.png)

```jsx
import Validate from 'react-validated-proxy';
import { isPresent, hasLength } from './validations';

const user = {
  firstName: 'Billy',
  lastName: 'Bob',
  // ...
};

const Adult = {
  firstName: [isPresent(), hasLength({ min: 2 })],
  lastName: [isPresent(), hasLength({ min: 2 })],
  // ...
};

<Validate model={user} as={Adult}>
  {({ model, set, reset, isPristine, hasErrors, flush }) => (
    <form onSubmit={flush}>
      <input type="text" value={model.firstName} onChange={e => set('firstName', e.target.value)} />
      <input type="text" value={model.lastName} onChange={e => set('lastName', e.target.value)} />
      <button type="submit" disabled={isPristine || hasErrors}>Save</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  )}
</Validate>
```

See the full code for this example under [`example/`](example). You can also clone this repo and run `npm install && npm start` to see the example running live.

## Rationale

ES6 Proxies have many cool use cases – one of which is validating changes to objects. You can modify an object as you normally would, and a `Proxy` can intercept those modifications to add custom behavior.

In the case of this library, the `<Validate>` component accepts a `model` object, as well as a map of `validations` in the format defined by [`validated-proxy`](https://github.com/poteto/validated-proxy#custom-validators). `<Validate>` will then wrap your `model` in a Proxy, and pass the Proxy to your `children` render prop. You can then interact with the Proxy as your `model`, but with the added benefit of knowing when and why changes to the `model` are invalid. (Specifically, you can easily retrieve [error messages](https://github.com/nucleartide/react-validated-proxy/blob/b8338a1aeaa851abc3bd3f35f39fac4be39a172c/example/components/ValidatedField.tsx#L36) from the Proxy.)

`react-validated-proxy` owes its existence to [`validated-proxy`](https://github.com/poteto/validated-proxy) and [`ember-changeset`](https://github.com/poteto/ember-changeset) by [Lauren Tan](https://github.com/poteto). It's mostly an experiment in distilling `ember-changeset` to its framework-agnostic core.

## API

### `<Validate model={T} as={IValidationMap}>...</Validate>`

Pass in a data model that you want to validate, as well as a validation map of validators for your data model. The validation map should be in the format expected by [`validated-proxy`](https://github.com/poteto/validated-proxy#getting-started).

```jsx
const user = {
  firstName: 'Jim',
  lastName: 'Bob',
  age: 15,
};

const Adult = {
  firstName: [isPresent(), hasLength({ min: 2 })],
  lastName: [isPresent(), hasLength({ min: 2 })],
  age: isNumber({ op: '>=', value: 18 }),
};

<Validate model={user} as={Adult}>
  {({ model, set, reset, isPristine, hasErrors, flush }) => (
    <form>{/* ... */}</form>
  )}
</Validate>
```

`<Validate>` accepts a render prop as its `children`, and will pass the wrapped `model` (and some helper properties and functions) to the render prop:

```ts
interface HelperProps {
  model: BufferedProxy
  set: <T>(name: string, value: T) => void
  reset: () => void
  isPristine: boolean
  hasErrors: boolean
  flush: () => void
}
```

---

> Jason Tu · GitHub [@nucleartide](https://github.com/nucleartide) · Twitter [@nucleartide](https://twitter.com/nucleartide)
