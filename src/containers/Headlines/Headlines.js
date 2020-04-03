import React, { Component } from "react";

import styles from "./Headlines.module.css";

import { Container, Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Headlines extends Component {
  render() {
    let tableRows = this.props.headlines
      ? this.props.headlines.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center"></TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">{row.author}</TableCell>
            <TableCell align="center">{row.publishedAt}</TableCell>
          </TableRow>
        ))
      : null;
    return (
      <Container className={styles.Headlines} data-testid="headlines">
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">&nbsp;</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>{" "}
      </Container>
    );
  }
}

export default Headlines;
