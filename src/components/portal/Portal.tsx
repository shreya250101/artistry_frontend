import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: ReactNode;
    selector: string;
}

function Portal({ children, selector }: PortalProps) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return mounted ? ReactDOM.createPortal(children, document.getElementById(selector) as Element) : null;
}

export default Portal;
