import React from 'react';

export function Stage(props) {
  return (
    <div className="Column" data-testid={`stage-${props.index}`}>
      <div className="Column__title">{props.title}</div>
      {props.children}
    </div>
  );
}

export default Stage;
