import {createPortal} from 'react-dom';

const Portal = ({children, container}) => createPortal(
    children,
    document.getElementById(container),
);

export default Portal;