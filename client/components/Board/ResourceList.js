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
            visibleTopLeft={index === 0 && visibleTopLeft}
            visibleTopRight={index === 3 && visibleTopRight}
            visibleBottomLeft={index === 0 && visibleBottomLeft}
            visibleBottomRight={index === 3 && visibleBottomRight}
          />
        );
      })}
    </div>
  );
};

export default ResourceList;
