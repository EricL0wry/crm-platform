import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: purple
  },
  status: {
    danger: 'red'
  }

});

export default theme;
