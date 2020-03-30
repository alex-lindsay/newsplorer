import React, { Component } from "react";
import styles from "./Headlines.module.css";
import { Container, Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { sampleHeadlines } from "../../data/sample_headlines";
import { sampleSources } from "../../data/sample_sources";
import { sampleCategories } from "../../data/sample_categories";
import { sampleLanguages } from "../../data/sample_languages";
import { sampleCountries } from "../../data/sample_countries";

class Headlines extends Component {
  render() {
    let rows = sampleHeadlines.articles;
    console.log({ sources: sampleSources.sources });
    console.log({ categories: sampleCategories });
    console.log({ languages: sampleLanguages });
    console.log({ countries: sampleCountries });
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
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.title}>
                  <TableCell align="center"></TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.author}</TableCell>
                  <TableCell align="center">{row.publishedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Container>
    );
  }
}

export default Headlines;
