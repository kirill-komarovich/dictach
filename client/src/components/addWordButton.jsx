import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';

class AddWordButton extends React.Component {
  state = {
    visible: true,
    lastScrollTop: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { documentElement: { scrollTop } } = document;
    const { lastScrollTop } = this.state;
    if (scrollTop > lastScrollTop) {
      this.handleVisibility(false, scrollTop);
    } else {
      this.handleVisibility(true, scrollTop);
    }
  }

  handleVisibility = (visible, lastScrollTop) => {
    this.setState({
      visible,
      lastScrollTop,
    });
  };

  render() {
    const { className, onClick } = this.props;
    const { visible } = this.state;
    return (
      <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        <Fab color="primary" aria-label="Add word" className={className} onClick={onClick} >
          <AddIcon />
        </Fab>
      </Slide>
    );
  }
}

AddWordButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

AddWordButton.defaultProps = {
  className: '',
};

export default AddWordButton;
