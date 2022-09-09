import React from "react";
import { Link } from "react-router-dom";
import style from './SidebarNavigation.module.scss';

export default function SidebarNavigation({ items, active, children }: { items: { label: string, url: string }[], children: JSX.Element, active?: number }) {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const childRef = React.useRef<HTMLUListElement>(null);
    const [overflow, setOverflow] = React.useState<boolean>(false);
    const overFlowRef = React.useRef<boolean>(false);
    overFlowRef.current = overflow;
    React.useEffect(() => {
        function _handleResize() {
            if (sidebarRef.current) {
                if (sidebarRef.current!.offsetParent !== null) {
                    if (!overFlowRef.current)
                        if (sidebarRef.current!.scrollWidth > sidebarRef.current!.clientWidth)
                            setOverflow(true)
                        else
                            setOverflow(false)
                }
            }
        }
        if (sidebarRef.current) {
            const ro = new ResizeObserver(_handleResize)
            ro.observe((sidebarRef.current));
            return () => {
                ro.disconnect()
            }
        }
    }, [sidebarRef])
    return (
        <div className={`${style["sidenav-container"]} ${overflow ? style["overflow"] : ""}`}>
            <div ref={sidebarRef} className={style["nav-container"]}>
                <ul ref={childRef} className={style["nav-list"]}>
                    {
                        items.map((e, i) => <li key={i}>
                            <Link className={active === i ? style["active"] : ""}
                                to={e.url}>{e.label}
                            </Link>
                        </li>
                        )
                    }
                </ul>
            </div>
            <div className={style["content"]}>
                {
                    children
                }
            </div>
        </div>


    )
}