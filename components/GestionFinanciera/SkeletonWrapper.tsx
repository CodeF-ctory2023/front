import { Box, Skeleton } from '@mui/material';
import { Children, ReactNode, isValidElement } from 'react';
import { GrowWrapper } from './GrowWrapper';

interface SkeletonWrapperProps {
  children?: ReactNode;
  loading?: boolean;
  className?: string;
}

export const SkeletonWrapper = ({
  children = <Box></Box>,
  loading,
  className,
}: SkeletonWrapperProps) => {
  const renderChildSkeletons = (children: ReactNode) => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return <Skeleton />;
      }
      return (
        <Skeleton
          width={child.props.width}
          height={child.props.height}
          variant='rounded'
          animation='wave'
          className={className ?? 'w-1/2 h-1/4'}
        ></Skeleton>
      );
    });
  };

  if (loading) {
    return renderChildSkeletons(children);
  } else {
    return <GrowWrapper>{children}</GrowWrapper>;
  }
};
