import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './index.scss';

class InplaceEditing extends React.PureComponent {
  state = {
    value: '',
    editing: false,
    changed: false,
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleChange = ({ target: { value } }) => {
    const { value: propsValue } = this.props;
    this.setState({ value, changed: value !== propsValue });
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
    case 'Enter':
    case 'Escape':
      this.handleSubmit();
      break;
    }
  };

  handleEditStart = () => {
    this.setState({ editing: true });
  }

  handleEditEnd = () => {
    const { value: initialValue } = this.props;

    this.setState(({ value, changed }) => ({
      editing: false,
      value: value.length > 0 && changed ? value : initialValue,
      changed: false,
    }));
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { value, changed } = this.state;
    if (value.length > 0 && changed) {
      onSubmit(value);
    }
    this.handleEditEnd();
  }

  render() {
    const { inputProps, ...rest } = this.props;
    const { value, editing } = this.state;
    return (
      <React.Fragment>
        {
          editing ? (
            <Typography
              {...rest}
              className="inplace"
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleEditEnd}
            >
              <TextField
                {...inputProps}
                className="inplace__field"
                value={value}
                onChange={this.handleChange}
                autoFocus
                fullWidth
                variant="outlined"
              />
            </Typography>
          ) : (
            <Typography
              {...rest}
              className="inplace inplace--disabled"
              onClick={this.handleEditStart}
              onFocus={this.handleEditStart}
            >
              { value }
            </Typography>
          )
        }
      </React.Fragment>
    );
  }
}

InplaceEditing.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InplaceEditing;
