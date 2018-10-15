import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  colorPrimary: {
    backgroundColor: '#888DA8',
  },
  barColorPrimary: {
    backgroundColor: '#FF5E3A',
  },
};

/**
* @description 
* Componente que representa o loading linear genérico usado para mostrar o usuário
* que o fetch dos dados está acontecendo
*/
function LoadingLinear(props) {
  const { classes } = props;
  return (
    <Fragment>
      <LinearProgress classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
    </Fragment>
  );
}

LoadingLinear.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingLinear);
