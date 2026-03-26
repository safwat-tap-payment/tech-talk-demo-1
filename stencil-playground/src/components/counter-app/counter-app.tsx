import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'counter-app',
  styleUrl: 'counter-app.css',
  shadow: true,
})
export class CounterApp {
  // Input (like attribute/prop)
  @Prop() initial: number = 0;

  // Internal reactive state
  @State() count: number;

  // Optional: emit event when value changes
  @Event() change: EventEmitter<number>;

  componentWillLoad() {
    this.count = this.initial;
  }

  increment = () => {
    this.count++;
    this.emitChange();
  };

  decrement = () => {
    this.count--;
    this.emitChange();
  };

  reset = () => {
    this.count = this.initial;
    this.emitChange();
  };

  emitChange() {
    this.change.emit(this.count);
  }

  render() {
    return (
      <div class="container">
        <h3>Counter</h3>
        <div class="count">{this.count}</div>

        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}
