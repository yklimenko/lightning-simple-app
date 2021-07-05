import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Background from '../component/background';
import MainContent from '../component/main-content';
import { InputField, AmountInputField } from '../component/field';
import { Header, Title } from '../component/header';
import { CancelButton, PillButton, Button } from '../component/button';
import { BalanceLabel, BalanceLabelUnit } from '../component/label';
import Card from '../component/card';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import { FormStretcher, FormSubText } from '../component/form';
import { color } from '../component/style';

const styles = StyleSheet.create({
  balance: {
    marginTop: 40,
  },
  unit: {
    color: color.blackText,
  },
  subText: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

const InvoiceView = ({ store, nav, invoice }) => (
  <Background image="purple-gradient-bg">
    <Header shadow color={color.purple}>
      <Button disabled onPress={() => {}} />
      <Title title="Payment Request">
        <LightningBoltIcon height={12} width={6.1} />
      </Title>
      <CancelButton onPress={() => nav.goHome()} />
    </Header>
    <MainContent>
      <Card>
        <BalanceLabel style={styles.balance}>
          <AmountInputField
            autoFocus={true}
            value={store.invoice.amount}
            onChangeText={amount => invoice.setAmount({ amount })}
            onSubmitEditing={() => invoice.generateUri()}
          />
          <BalanceLabelUnit style={styles.unit}>
            {store.unitFiatLabel}
          </BalanceLabelUnit>
        </BalanceLabel>
        <FormStretcher>
          <InputField
            placeholder="Note"
            value={store.invoice.note}
            onChangeText={note => invoice.setNote({ note })}
            onSubmitEditing={() => invoice.generateUri()}
          />
        </FormStretcher>
        <FormSubText style={styles.subText}>
          Generate a payment request that others can use to pay you immediately
          via the Lightning Network.
        </FormSubText>
        <PillButton onPress={() => invoice.generateUri()}>Next</PillButton>
      </Card>
    </MainContent>
  </Background>
);

InvoiceView.propTypes = {
  store: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default observer(InvoiceView);
