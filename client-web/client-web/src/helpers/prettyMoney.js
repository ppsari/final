import React from 'react';
export default function (price) {
  return (
    <span>
      Rp
      <strong>
        {' '}
        {String(price || 0)
          .split('')
          .reverse()
          .map((char, index) => (index + 3) % 3 ? char : `${char}.`)
          .reverse()
          .join('')
          .split('')
          .slice(0, -1)}
        ,-
      </strong>
    </span>
  );
}
