import React from 'react';
import Resource from './Resource';

const ResourceList = ({ num, options, transform, zIndex }) => {
  return (
    <div
      style={{ display: 'flex', width: `${8.2 * num}rem`, transform, zIndex }}
    >
      {Array(num)
        .fill(null)
        .map((item, index) => {
          const { style, id } = options[index];
          return <Resource key={id} id={id} style={style} />;
        })}
    </div>
  );
};

export default ResourceList;
