import React, {useCallback, useState} from "react";
import * as Yup from "yup";
// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import {RHFTextField, RHFUploadAvatar} from "../../../components/hook-form";
import {Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import {fetchUpdateUserProfile} from "../../../redux/slices/app.ts";
import useProfile from "../../../hooks/useProfile.ts";
// import { UpdateUserProfile } from "../../../redux/slices/app";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";


interface IProfileForm {
    firstName: string;
    lastName: string;
    avatar: string;
}

const ProfileForm = () => {
    const dispatch = useAppDispatch()
    const [file, setFile] = useState<File>();
    const {user, avatarUrl} = useAppSelector((state) => state.app);
    const {accessToken} = useAppSelector((state) => state.auth);
    const {profile} = useProfile()

    const ProfileSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        avatar: Yup.string().required("Avatar is required"),
    });


    const defaultValues = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatar: avatarUrl,
    };

    const methods = useForm({
        resolver: yupResolver(ProfileSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isSubmitSuccessful},
    } = methods;


    const onSubmit = async (data: IProfileForm) => {

        console.log("sdfsdfsdfsdfdsfsdfsdfsdfsdfdsfsdf", file);
        const formData: any = new FormData();
        if (file) formData.append("avatar", file);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        console.log("DATA", data);
        dispatch(fetchUpdateUserProfile(formData))
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];

            setFile(file);

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue("avatar", newFile.preview, {shouldValidate: true});
            }
        },
        [setValue]
    );
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
                <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop}/>
                <RHFTextField
                    helperText={"This name is visible to your contacts"}
                    name="firstName"
                    label="First Name"
                />
                <RHFTextField
                    helperText={"This name is visible to your contacts"}
                    name="lastName"
                    label="Last Name"
                />
                {/*<RHFTextField multiline rows={4} name="about" label="About" />*/}

                <Stack direction={"row"} justifyContent="end">
                    <LoadingButton
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        // loading={isSubmitSuccessful || isSubmitting}
                    >
                        Save
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default ProfileForm;
