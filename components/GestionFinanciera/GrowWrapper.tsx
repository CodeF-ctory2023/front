import { Box, Grow } from '@mui/material';
import { Children, ReactNode, isValidElement } from 'react';
import { NumericFormat } from 'react-number-format';

interface GrowWrapperProps {
  children: ReactNode;
  /**
   * if `true`, the component will transition in.
   * @default true
   */
  growIn?: boolean;
}

export const GrowWrapper = ({ children, growIn = true }: GrowWrapperProps) => {
  const renderChild = (children: ReactNode) => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }
      if (child.type == NumericFormat) {
        const className = child.props.className;
        return (
          <Grow in={growIn}>
            <Box className={className || 'flex w-full h-full'}>
              <child.type
                {...child.props}
                className={className && className + ' w-full'}
              >
                {renderChild(child.props.children)}
              </child.type>
            </Box>
          </Grow>
        );
      } else {
        return (
          <Grow in={growIn}>
            <child.type {...child.props}>
              {renderChild(child.props.children)}
            </child.type>
          </Grow>
        );
      }
    });
  };
  return renderChild(children);
};
