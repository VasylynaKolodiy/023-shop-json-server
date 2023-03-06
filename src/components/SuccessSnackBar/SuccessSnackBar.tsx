import React from 'react';
import {Alert, AlertTitle, Snackbar} from "@mui/material";

interface ISuccessSnackBarProps {
    openAlertSuccess: boolean,
    setOpenAlertSuccess: (isOpen: boolean) => void,
    title: string,
    text: string
}

const SuccessSnackBar: React.FC<ISuccessSnackBarProps> = ({openAlertSuccess, setOpenAlertSuccess, title, text}) => {
    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={openAlertSuccess}
            autoHideDuration={6000}
            onClose={() => setOpenAlertSuccess(false)}
        >
            <Alert onClose={() => setOpenAlertSuccess(false)} severity="success" sx={{width: '100%'}}>
                <AlertTitle>{title}!</AlertTitle>
                <strong>{text}</strong>
            </Alert>
        </Snackbar>
    );
};

export default SuccessSnackBar;