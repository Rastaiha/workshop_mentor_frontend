import { makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import EditWidgets from '../components/SpecialComponents/EditArticlePage/EditWidgets';
import { getArticleAction } from '../redux/slices/article';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },
  body: {
    background: '#fff',
    paddingTop: theme.spacing(1),
    height: '100vh',
  },
  smFullHeight: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
  },
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
  workshopTabsPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
    height: '100%',
  },
}));

const EditArticle = ({
  article = {},
  articleId,
  needUpdateState,
  getArticle,
  widgets,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (articleId) {
      getArticle({ articleId });
    } else {
      history.push('/');
    }
  }, [getArticle, articleId, history]);

  useEffect(() => {
    if (articleId && needUpdateState) {
      getArticle({ articleId });
    }
  }, [needUpdateState]);

  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
      <Paper className={classes.mainPaper}>
        {article && (
          <EditWidgets
            widgets={widgets}
            stateId={articleId}
            stateName={article.name}
          />
        )}
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.article.article,
  widgets: state.article.widgets,
  articleId: ownProps.match.params.articleId,
  needUpdateState: state.currentState.needUpdateState,
});

export default connect(mapStateToProps, {
  getArticle: getArticleAction,
})(EditArticle);
