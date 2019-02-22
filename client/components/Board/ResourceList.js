import React from 'react';
import Resource from './Resource';

const ResourceList = ({
  num,
  options,
  transform,
  zIndex,
  visible,
  visibleTopLeft,
  visibleTopRight,
  visibleBottomLeft,
  visibleBottomRight,
}) => {
  const resourceListArr = Array(num).fill(null);
  return (
    <div
      style={{ display: 'flex', width: `${8.2 * num}rem`, transform, zIndex }}
    >
      {resourceListArr.map((item, index) => {
        const { style, id } = options[index];
        return (
          <Resource
            key={id}
            id={id}
            style={style}
            visible={visible}
            visibleOdd={!(index % 2)}
            visibleTopLeft={visibleTopLeft}
            visibleTopRight={visibleTopRight}
            visibleBottomLeft={visibleBottomLeft}
            visibleBottomRight={visibleBottomRight}
          />
        );
      })}
    </div>
  );
};

export default ResourceList;
