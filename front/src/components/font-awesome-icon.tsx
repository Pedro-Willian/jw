import React from 'react';
import {
  FontAwesomeIcon as FontAwesome,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const FontAwesomeIcon = ({
  icon,
  marginRight = true,
  ...props
}: FontAwesomeIconProps & { marginRight?: boolean }) => {
  return (
    <FontAwesome
      icon={icon}
      style={marginRight ? { marginRight: 10 } : {}}
      fixedWidth
      {...props}
    />
  );
};

export { FontAwesomeIcon };
