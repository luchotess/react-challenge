import React            from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typography       from '@material-ui/core/Typography';
import { makeStyles }   from '@material-ui/core/styles';
import Grid             from '@material-ui/core/Grid';

import ArticleCard     from './article/article';
import useLocalStorage from './hooks/localstorage';
import useFetch        from './hooks/useFetch';
import { User }        from './models';

import './App.css';

const useStyles = makeStyles((theme) => ({
    root   : {
        flexGrow: 1
    },
    paper  : {
        height: 140,
        width : 100
    },
    control: {
        padding: theme.spacing(2)
    }
}));

const endpoints = {
    posts: 'https://jsonplaceholder.typicode.com/posts',
    users: 'https://jsonplaceholder.typicode.com/users'
}

function extractUserDataFromId (users: User[], userId: number): { username: string, city: string } {
    const user: User | undefined = users.find((user) => user.id === userId);
    const { username, address } = user || new User();

    return {
        username,
        city: address.city
    };
}

function App () {
    const [clientId] = useLocalStorage('clientId', uuidv4());
    const classes = useStyles();

    // Fetch data from API
    const { response: articleResponse, error, loading } = useFetch(
        endpoints.posts, 'GET'
    );

    const { response: usersResponse } = useFetch(
        endpoints.users, 'GET'
    );

    // Loading and error handlers
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (error) {
        return <div className="error">{JSON.stringify(error)}</div>;
    }

    return (
        <>
            <header>
                <Typography variant="h3" gutterBottom>
                    Posts
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>

                    ClientID: {clientId}
                </Typography>
            </header>

            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {articleResponse && articleResponse.map((article) =>
                            <Grid key={article.id} item>
                                <ArticleCard article={article}
                                             user={extractUserDataFromId(usersResponse, article.userId)}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
