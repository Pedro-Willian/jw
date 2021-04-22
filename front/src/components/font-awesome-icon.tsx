import {
  FontAwesomeIcon as FontAwesome,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import React from 'react';

const FontAwesomeIcon = ({
  icon,
  marginRight = true,
  ...props
}: FontAwesomeIconProps & { marginRight?: boolean }): JSX.Element => {
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
