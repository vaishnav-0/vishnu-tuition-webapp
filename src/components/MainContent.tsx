import React from 'react';
import Center from "./Center";
import { BallTriangle } from "react-loader-spinner";
import { Video } from "./Video";
import k from "../functions/utils";
import { useSearchParams } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { Button } from '@mui/material';


export default function MainContent({ content }: { content: any }) {

    const [loading, setLoading] = React.useState(true);
    const [restricted, setRestricted] = React.useState(true);
    const [vData, setVData] = React.useState<any>();
    const [onIndex, setOnIndex] = React.useState(false);
    const toolbarPluginInstance = toolbarPlugin();
    const [pdfOpen, setPdfOpen] = React.useState<boolean>(false);

    let [searchParams, setSearchParams] = useSearchParams();
    React.useEffect(() => {
        setOnIndex(false);
        const v = searchParams.get("v");
        if (v) {
            setLoading(true);
            console.log(v);
            k(v).then((d) => {
                setLoading(false);
                if (d.status === 403) {
                    setRestricted(true);
                    setVData(null);
                } else if (d.status === 200) {
                    setRestricted(false);
                    setVData(d.data);
                }
                console.log(d);
            })
        } else {
            setOnIndex(true);
            setLoading(false);
        }
    }, [searchParams])

    return (
        <>
            {loading && <Center style={{ height: "100%", width: "100%" }}>
                <BallTriangle
                    height="100"
                    width="100"
                    radius="5"
                    wrapperStyle={{ height: "auto" }}
                    color='green'
                    ariaLabel='three-dots-loading'
                />
            </Center>
            }
            <div hidden={loading}>
                {
                    onIndex ?
                        <div>
                            Welcome message
                        </div>
                        :
                        <>
                            {
                                restricted ?
                                    <>
                                        <Center>
                                            <div style={{ width: "100%", backgroundColor: "black", height: "300px" }} />
                                            <LockIcon style={{ position: "absolute", color: "white" }} />
                                        </Center>
                                        <div>This video is locked!</div>
                                    </>
                                    :
                                    <>
                                        <Video data={vData} content={content} />
                                        {
                                            pdfOpen ?
                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                                                    <div
                                                        style={{
                                                            marginTop: '30px',
                                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                                            height: '750px',
                                                        }}
                                                    >
                                                        <toolbarPluginInstance.Toolbar />
                                                        <Viewer plugins={[toolbarPluginInstance]} fileUrl="https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK" />;

                                                    </div>

                                                </Worker>
                                                :
                                                <Button style={{marginTop:"30px"}} variant="outlined" onClick={() => setPdfOpen(true)}>
                                                    Open notes
                                                </Button>
                                        }

                                    </>
                            }

                        </>
                }

            </div>
        </>
    );
}
