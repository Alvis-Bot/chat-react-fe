import {Controller, useFormContext} from 'react-hook-form';
import {Autocomplete, AutocompleteProps, TextField} from '@mui/material';

type IRHFAutocomplete = AutocompleteProps<any, any, any, any> & {
    name: string;
    label: string;
    helperText?: string;
};

export default function RHFAutocomplete({name, label, helperText, options, ...other}: any) {
    const {control, setValue} = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <Autocomplete
                    options={options}
                    {...field}
                    onChange={(event, newValue) => setValue(name, newValue, {shouldValidate: true})}
                    renderInput={(params) => (
                        <TextField
                            label={label}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            {...params}
                        />
                    )}
                    {...other}
                />
            )}
        />
    );
}
