import * as React from 'react';
import { Component } from 'react';
import { IValidationMap } from 'validated-proxy/dist/types/utils/validator-lookup';
import { validatedProxy, BufferedProxy } from 'validated-proxy';

interface HelperProps {
  model: BufferedProxy
  set: <T>(name: string, value: T) => void
  reset: () => void
  isPristine: boolean
  hasErrors: boolean
  flush: () => void
}

type RenderProp = (p: HelperProps) => JSX.Element

interface Props<T> {
  model: T
  as: IValidationMap
  children: RenderProp
}

interface State {
  model: BufferedProxy
}

class Validate<Model extends {}> extends Component<Props<Model>, State> {
  constructor(p: Props<Model>) {
    super(p);
    this.state = {
      model: validatedProxy(p.model, { validations: p.as }),
    };
  }

  set = <V extends {}>(name: string, value: V) => {
    this.state.model[name] = value;
    this.setState({ model: this.state.model });
  }

  reset = () => {
    this.state.model.reset();
    this.setState({ model: this.state.model });
  }

  flush = () => {
    this.state.model.flush();
    this.setState({ model: this.state.model });
  }

  render() {
    return this.props.children({
      model: this.state.model,
      set: this.set,
      reset: this.reset,
      isPristine: Object.keys(this.state.model.cache).length === 0,
      hasErrors: this.state.model.errors.length > 0,
      flush: this.flush,
    });
  }
}

export default Validate;
