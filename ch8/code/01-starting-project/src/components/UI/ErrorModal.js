import React from 'react';
import ReactDOM from 'react-dom';

import styles from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onConfirm} />;
}

const ModalOverlay = (props) => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h3>{props.title}</h3>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
        </Card>
    )
}

const backdropRoot = document.getElementById('backdrop-root');
const overlayRoot = document.getElementById('overlay-root');

const ErrorModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop
                    onConfirm={props.onConfirm} />, backdropRoot)}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />, overlayRoot)}
        </React.Fragment>
    )
}

export default ErrorModal;