import React, { CSSProperties } from 'react';

const badgeStyle: CSSProperties = {
  border: 'solid',
  borderRadius: '25px',
  borderWidth: '1px',
  background: '#BDBDE6',
  color: '#6264A7',
  fontSize: 'small',
  textAlign: 'center',
};

function Tag({ title }: { title: string }) {
  return <div style={badgeStyle}>{title}</div>;
}

export default Tag;
