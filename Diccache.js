import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class DicCache extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell> {this.props.time}</TableCell>
                <TableCell> {this.props.hitratio}</TableCell>
            </TableRow>
        )
    }
}

export default DicCache;