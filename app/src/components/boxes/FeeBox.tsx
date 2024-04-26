import styled from 'styled-components';

export const FeeBox = styled.ul`
  list-style: none;
  margin: 0;

  background-color: var(--color-gray14);
  color: var(--color-white80);
  border-radius: 8px;

  font-weight: 400;

  padding: 1.4em 1.7em;

  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > :first-child {
      color: var(--color-white44);
    }

    &:not(:first-child) {
      margin-top: 0.5em;
    }
  }

  &:empty {
    display: none;
  }
`;
