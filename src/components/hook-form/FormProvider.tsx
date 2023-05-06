// form
import {FormProvider as Form, UseFormReturn} from 'react-hook-form';
import React from "react";

// ----------------------------------------------------------------------

interface IFormProvider {
    children: React.ReactNode;
    methods: UseFormReturn<any>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormProvider({children, onSubmit, methods}: IFormProvider) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}