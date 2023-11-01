import React from 'react';
import { useField } from 'formik';
import Input from '@mui/joy/Input';



export function InputField({ label, ...props }) {
    const [field, meta] = useField(props.name)

    return (
        <Input
            {...field}
            {...props}
            label={label}
            error={meta.touched && meta.error ? true : false}
            helperText={meta.touched && meta.error ? meta.error : ''}
        />
    )

}

