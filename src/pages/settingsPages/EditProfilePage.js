import React from 'react';
import PageContainer from '../../components/PageContainer';
import EditProfileComponent from '../../components/ProfileComponents/EditProfileComponent';

export default function EditProfilePage(){

    return (
        <PageContainer title={"Edit Profile"}>
            <EditProfileComponent />
        </PageContainer>
    )
}