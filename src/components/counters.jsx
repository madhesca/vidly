import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 24 },
      { id: 3, value: 3 },
      { id: 4, value: 8 },
    ],
  };

  render() {
    const { counters } = this.state;
    return (
      <div>
        {counters.map((counter) => (
          <Counter key={counter.id} value={counter.value} id={counter.id} />
        ))}
      </div>
    );
  }
}

export default Counters;
