import React, { Component } from "react";
import { parseISO, format } from "date-fns";

import styles from "./Headlines.module.css";

import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";

class Headlines extends Component {
  render() {
    let tableRows = this.props.headlines
      ? this.props.headlines.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center">
              {row.urlToImage ? (
                <Paper className={styles.HeadlineImage} elevation={3} square>
                  <img src={row.urlToImage} width="100" alt={row.description} />
                </Paper>
              ) : null}
            </TableCell>
            <Tooltip
              title={row.description}
              placement="bottom"
              aria-label={row.description}
            >
              <TableCell align="left">{row.title}</TableCell>
            </Tooltip>
            <TableCell align="left">{row.author}</TableCell>
            <TableCell align="center">
              {format(parseISO(row.publishedAt), "LLL d h:mmaaaaa")}
            </TableCell>
            <TableCell align="center">
              {" "}
              <IconButton
                aria-label={"Read More about " + row.description}
                onClick={() => this.props.setStory(index)}
                color="inherit"
              >
                <DescriptionIcon />
              </IconButton>
            </TableCell>
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
                <TableCell align="center">&nbsp;</TableCell>
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
