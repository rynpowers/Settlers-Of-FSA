import React from 'react';
import Resource from './Resource';

const ResourceList = ({ num, options, transform }) => {
  return (
    <div style={{ display: 'flex', width: `${8.2 * num}rem`, transform }}>
      {Array(num)
        .fill(null)
        .map((item, index) => {
          const { style } = options[index];
          return <Resource style={style} />;
        })}
    </div>
  );
};

export default ResourceList;
