import React from "react";
import {styled} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import TopBar from "../components/TopBar";
import {firestore} from "../firebase";
import {collection, getDocs} from "firebase/firestore";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import MainContent from "../components/MainContent";

const drawerWidth = 240;

const Content = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: "-10px",
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Main() {
    const params = useParams();
    const drawerState = React.useState(true);
    const navigate = useNavigate();
    const [content, setContent] = React.useState<Record<any, any>>();
    const [contentData, setContentData] = React.useState<Record<any, any>>();

    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleDrawerOpen = () => {
        drawerState[1](true);
    };

    const handleDrawerClose = () => {
        drawerState[1](false);
    };

    React.useEffect(() => {
        const col = collection(firestore, "tuition", "CPG", "meta");
        const content: Record<any, any> = {};
        getDocs(col).then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const {module, ...mod_rem} = doc.data();

                if (!content[module])
                    content[module] = mod_rem;

                const modCont = collection(firestore, "tuition", "CPG", "meta", doc.id, "contents");
                getDocs(modCont).then((querySnapshot) => {
                    content[module]["content"] = [];
                    querySnapshot.forEach((doc) => {
                        const {index, ...rem} = doc.data();
                        content[module]["content"][index] = rem;
                        setContent((prev)=>({...prev,...content}))

                    });
                });
            });
        });


    }, []);
    console.log(content);
    return <>
        <TopBar drawerState={drawerState}/>
        <div style={{"display": "flex", width: "100%"}}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerState[0]}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                {
                    content && Object.entries(content).map(([mod, data], i) => (
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={"module-" + mod}
                                id={"mod-" + mod}
                            >
                                <Typography>Module {mod}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="nav" aria-label={"module " + mod + " content"}>
                                    {
                                        data["content"] && data["content"].map((content: any, i: number) => {

                                            return (
                                                <ListItemButton
                                                    key={i}
                                                    selected={selectedIndex === i}
                                                    onClick={() => {
                                                        setSelectedIndex(i)
                                                        setSearchParams({v: content.content ?? ""})
                                                        setContentData(content);
                                                    }}
                                                >
                                                    <ListItemText primary={content.description}/>
                                                </ListItemButton>
                                            )

                                        })
                                    }
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
                {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
                <Divider/>
            </Drawer>
            <Content style={{flex: 1, height: "100%", minWidth: 0}} open={drawerState[0]}>
                <MainContent content={contentData}/>
            </Content>
        </div>

    </>
}
