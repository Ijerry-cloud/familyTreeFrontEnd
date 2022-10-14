import React from 'react';
import PageContainer from '../../components/PageContainer';
import ChangePasswordForm from '../../components/AuthenticationComponents/ChangePasswordForm';


export default function ChangePasswordPage(){
    
    return (
        <PageContainer title={"Change Password"}>
            <ChangePasswordForm />
        </PageContainer>
    )
}