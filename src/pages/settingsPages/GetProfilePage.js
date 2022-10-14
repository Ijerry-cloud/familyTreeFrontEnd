import React from 'react';
import PageContainer from '../../components/PageContainer';
import GetProfileComponent from '../../components/ProfileComponents/GetProfileComponent';


export default function GetProfilePage(){
    
    return (
        <PageContainer title={"Profile"}>
            <GetProfileComponent />
        </PageContainer>
    )
}