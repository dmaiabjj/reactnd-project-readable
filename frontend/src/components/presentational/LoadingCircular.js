import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>  ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    margin: theme.spacing.unit,
    maxWidth: '50%' ,
  },
  progress: {
    color: '#FF5E3A'
  }
});


/**
* @description 
* Componente que representa o loading circular genérico usado para mostrar o usuário
* que o fetch dos dados está acontecendo
*/
class LoadingCircular extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
            <CircularProgress 
              size={50} 
              className={classes.progress } 
            />
        </div>
      </div>
    );
  }
}

LoadingCircular.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingCircular);
