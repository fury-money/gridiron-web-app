import { SendIcon } from '@nebula-js/icons';
import { breakpoints, EmptyButton, TableHeader } from '@nebula-js/ui';
import React from 'react';
import styled from 'styled-components';

export interface HistoryProps {
  className?: string;
}

function HistoryBase({ className }: HistoryProps) {
  return (
    <div className={className}>
      <TableHeader>
        <h2>
          <s>History</s>
        </h2>
        <div className="buttons">
          <EmptyButton>
            <SendIcon style={{ marginRight: '0.5em' }} /> CSV
          </EmptyButton>
        </div>
      </TableHeader>
      <ul>
        {Array.from({ length: Math.floor(Math.random() * 10) + 4 }, (_, i) => (
          <li key={'history' + i}>
            <div>
              <p>Trade</p>
              <p>Bought 100.123456 NIAB with 100.12 UST</p>
            </div>
            <div>Apr 19, 2021, 18:01 PM</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const History = styled(HistoryBase)`
  background-color: var(--color-gray14);
  border-radius: 8px;

  > header {
    border-bottom: 1px solid var(--color-gray11);
  }

  > ul {
    padding: 0;
    list-style: none;

    li {
      padding: 1.8rem 2rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;

      font-size: 16px;

      > :first-child {
        color: var(--color-white92);

        > :first-child {
          font-size: 12px;
          color: var(--color-white44);
        }
      }

      > :last-child {
        font-size: 0.75em;
        color: var(--color-white44);
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray11);
      }
    }
  }

  @media (max-width: ${breakpoints.tablet.max}px) {
    > ul {
      li {
        padding: 1rem;

        flex-direction: column;
        align-items: flex-start;

        font-size: 14px;
      }
    }
  }
`;
