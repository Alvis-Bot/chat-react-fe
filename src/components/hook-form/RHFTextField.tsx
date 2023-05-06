import {Controller, useFormContext} from 'react-hook-form';
import {TextField, TextFieldProps} from '@mui/material';
import React from "react";

export type CustomTextFieldProps = TextFieldProps & {
    name: string;
    helperText?: string;
};
export default function RHFTextField({name, helperText, ...other}: CustomTextFieldProps) {
    const {control} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    value={field.value || ''}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                    {...other}
                />
            )}
        />
    );
}
