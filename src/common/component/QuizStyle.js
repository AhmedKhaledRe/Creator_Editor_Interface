import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    // Quiz Styles
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
    },
    // QuestionQuiz styles
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: "100vh"
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        textAlign: "center",
        color: theme.palette.text.secondary,
        "& > * + *": {
            marginTop: theme.spacing(1),
        },
    },
    BackIcon: {
        position: "absolute",
        top: -20,
        left: 20,
        color: "red",
        "& svg": {
            fontSize: "30px"
        }
    }
}));