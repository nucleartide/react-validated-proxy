import * as React from 'react';
import { Component } from 'react';
import { IValidationMap } from 'validated-proxy/dist/types/utils/validator-lookup';
import { validatedProxy, BufferedProxy } from 'validated-proxy';

type RenderProp = (
  model: BufferedProxy,
  setModel: <T>(name: string, value: T) => void
) => JSX.Element

interface Props<T> {
  model: T
  validations: IValidationMap
  children: RenderProp
}

interface State {
  model: BufferedProxy
}

class Validate<Model extends {}> extends Component<Props<Model>, State> {
  constructor(p: Props<Model>) {
    super(p);
    this.state = {
      model: validatedProxy(p.model, { validations: p.validations }),
    };
  }

  setModel = <V extends {}>(name: string, value: V) => {
    this.state.model[name] = value;
    this.setState({ model: this.state.model });
  }

  render() {
    return <div></div>;
  }
}

export default Validate;
