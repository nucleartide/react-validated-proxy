import * as React from 'react';
import { BufferedProxy } from 'validated-proxy';

interface Props {
  model: BufferedProxy
  property: string
  setProperty: (name: string, value: string) => void
  type: 'text' | 'number'
}

interface ComputedProps extends Props {
  messages: Array<string>
}

const transform = (p: Props): ComputedProps => ({
  messages: p.model.cache
    && p.model.cache[p.property]
    && p.model.cache[p.property].validations
      .filter(v => !v.validation)
      .map(v => v.message)
    || [],
  ...p,
});

const component = (p: ComputedProps) => (
  <div className="ValidatedField">
    <label htmlFor={p.property}>{p.property}</label>
    <input
      type={p.type}
      id={p.property}
      value={p.model[p.property]}
      onChange={e => p.setProperty(p.property, e.target.value)}
      className={p.messages.length > 0 ? 'Error' : null}
    />

    {p.messages.length > 0 &&
      <ul>
        {p.messages.map(m => <li key={m}>{m}</li>)}
      </ul>
    }
  </div>
);

// def validated_field(p) do
//   p
//   |> transform
//   |> component
// end
const ValidatedField = (p: Props) => (
  component(
    transform(
      p
    )
  )
);

export default ValidatedField;
