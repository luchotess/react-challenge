import React          from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card           from '@material-ui/core/Card';
import CardHeader     from '@material-ui/core/CardHeader';
import CardContent    from '@material-ui/core/CardContent';
import Avatar         from '@material-ui/core/Avatar';
import Typography     from '@material-ui/core/Typography';
import { red }        from '@material-ui/core/colors';

import { Article } from '../models';

const useStyles = makeStyles((theme) => ({
    root      : {
        maxWidth: 345
    },
    media     : {
        height    : 0,
        paddingTop: '56.25%' // 16:9
    },
    expand    : {
        transform : 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar    : {
        backgroundColor: red[500]
    }
}));

interface IUserData {
    username: string;
    city: string;
}

export default function ArticleCard (props: { article: Article, user: IUserData }) {
    const classes = useStyles();
    const { article, user } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {user.username.substr(0, 1)}
                    </Avatar>
                }
                title={article.title}
                subheader={`${user.username} from ${user.city}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {article.body}
                </Typography>
            </CardContent>
        </Card>
    );
}
