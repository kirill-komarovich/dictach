import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { messages } from '../locales';

function ConnectedIntlProvider(props) {
  const { locale, children } = props;
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      { children }
    </IntlProvider>
  );
}

ConnectedIntlProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale
  };
}

export default connect(mapStateToProps)(ConnectedIntlProvider);
