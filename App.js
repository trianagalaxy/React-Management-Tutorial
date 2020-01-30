import React, { Component } from 'react';
import BufferCache from './Components/Buffercache';
import DicCache from './Components/Diccache';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '120%',
    marginTop: theme.spacing(4),
    overflowX: "auto"
  },
  table: {
    minWidth: 512
  },
  progress : {
    margin: theme.spacing.unit *2
  }
}
)

class App extends Component {

  state = {
      buffercache: "",
      diccache: "",
      completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi() 
    .then(res => this.setState({buffercache : res}))   
    .catch(err => console.log(err));
    this.callApi2() 
    .then(res2 => this.setState({diccache : res2}))   
    .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/buffercache');
    const body = await response.json();
    return body;
  }

  callApi2 = async() => {
    const response = await fetch('/api/diccache');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1})
  }


  render() {
    const { classes } = this.props;
      return (
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>시간</TableCell>
              <TableCell>버퍼캐시 적중률</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {this.state.buffercache ? this.state.buffercache.map(b => 
              {return ( <BufferCache time={b[0]} hitratio={b[1]} /> );
            }) :  
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
        </Paper>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>시간</TableCell>
                <TableCell>디셔너리 캐시 적중률</TableCell>
              </TableRow>
              </TableHead>
          <TableBody>
            {this.state.diccache ? this.state.diccache.map(d => 
              {return ( <DicCache time={d[0]} hitratio={d[1]} /> );
              }) :  
                <TableRow>
                  <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
            </Table>
          </Paper>

        </div>
   );

  }
}




export default withStyles(styles)(App);
