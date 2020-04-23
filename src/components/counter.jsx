import React from "react";

class Counter extends React.Component {
  state = {
    value: this.props.value,
    tags: [],
  };

  formatCounter() {
    const { value } = this.state;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    const { value } = this.state;
    let classes = "badge m2 badge-";
    classes += value === 0 ? "warning" : "primary";
    return classes;
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>No tags</p>;
    return this.state.tags.map((tag, i) => <li key={i}>{tag}</li>);
  }

  handleClick = () => {
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    return (
      <div>
        <h3>#{this.props.id}</h3>
        <span className={this.getBadgeClasses()}>{this.formatCounter()}</span>
        <button onClick={this.handleClick} className="btn btn-info">
          Click Me
        </button>
        {!this.state.tags.length && <p>Please create tags</p>}
        <ul>{this.renderTags()}</ul>
      </div>
    );
  }
}

export default Counter;
