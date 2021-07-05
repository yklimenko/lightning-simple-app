import React from 'react';
import { storiesOf } from '../storybook-react';
import {
  BalanceLabel,
  BalanceLabelNumeral,
  BalanceLabelUnit,
  SmallBalanceLabel,
} from '../../src/component/label';
import { color } from '../../src/component/style';

storiesOf('Labels', module)
  .add('Balance SAT', () => (
    <BalanceLabel>
      <BalanceLabelNumeral style={{ color: color.blackText }}>
        9,123,456,788
      </BalanceLabelNumeral>
      <BalanceLabelUnit style={{ color: color.blackText }}>
        SAT
      </BalanceLabelUnit>
    </BalanceLabel>
  ))
  .add('Balance USD', () => (
    <BalanceLabel>
      <BalanceLabelNumeral style={{ color: color.blackText }}>
        $10,000.00
      </BalanceLabelNumeral>
    </BalanceLabel>
  ))
  .add('Small Balance SAT', () => (
    <SmallBalanceLabel unit="SAT" style={{ color: color.blackText }}>
      9,123,456,788
    </SmallBalanceLabel>
  ));
