import * as React from 'react';
import { BufferedProxy } from 'validated-proxy';

interface Props {
  property: string
  model: BufferedProxy
  setModel: <T>(name: string, value: T) => void
}

interface ComputedProps extends Props {
  messages: Array<string>
}

const transform = (p: Props): ComputedProps => ({
  messages: p.model.errored[p.property] && p.model.errored[p.property].messages || [],
  ...p,
});

const component = (p: ComputedProps) => (
  <>
    <label htmlFor={p.property}>{p.property}</label>
    <input
      type="text"
      id={p.property}
      value={p.model[p.property]}
      onChange={e => p.setModel(p.property, e.target.value)}
    />

    {p.messages.length > 0 &&
      <ul>
        {p.messages.map(m => <li key={m}>{m}</li>)}
      </ul>
    }
  </>
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
