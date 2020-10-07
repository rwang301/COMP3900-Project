import React from 'react';

export default function Button(props) {
  return <button className="primary-button" onClick={props.onClick}>{props.children}</button>
}