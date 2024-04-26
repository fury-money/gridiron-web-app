import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { specificSizeStyle } from '../internal/internalSpecificSizeStyle';

export interface EmptyButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: ReactNode;
  size?: number | { width: number; height: number };
  fontSize?: number | `${number}em`;
}

function EmptyButtonBase({
  size,
  className,
  ...buttonProps
}: EmptyButtonProps) {
  return <button className={className} {...buttonProps} />;
}

export const EmptyButton = styled(EmptyButtonBase)`
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;

  ${({ size }) => (!!size ? specificSizeStyle(size) : '')};

  color: inherit;

  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : fontSize};

  line-height: 1em;
  max-height: 1em;

  display: inline-flex;
  align-items: center;

  svg,
  img {
    font-size: 1em;
    width: 1em;

    transition: color 0.4s ease-out;
  }
`;
