import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[400],
    },
    deleteIcon: {
        color: "red",
    },
    editIcon: {
        color: "#1c9ca9"
    },
    YouTubeIcon: {
        color: "red",
        "& svg": {
            fontSize: "30px"
        }
    },
    touchAppIcon: {
        marginLeft: 'auto',
        "&:hover":{
            color: "green"
        }
    }
}));