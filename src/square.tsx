import React from "react";

interface SquareProps {
  onClick: () => void,
  value: string
}

export default class Square extends React.Component<SquareProps> {

  render() {
    return (<button
      className="square"
      onClick={this.props.onClick}
    >
      {this.props.value}
    </button>);
  }

}

