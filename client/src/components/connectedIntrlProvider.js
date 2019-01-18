import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { messages } from '../locales';

function ConnectedIntlProvider(props) {
  const { locale, children } = props;
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
};

function mapStateToProps(state) {
  return {
    locale: state.locale
  };
};

export default connect(mapStateToProps)(ConnectedIntlProvider);
