import React from "react";
import HeaderAuth from "../../componentes/HeaderAuth/HeaderAuth";
import RecoveryPassForm from "../../componentes/RecoveryPassForm/RecoveryPassForm";
import FooterAuth from "../../componentes/FooterAuth/FooterAuth";

function RecoveryPassPage () {

    return (
        <>
        <main className="main_recovery_pass_container">
            <HeaderAuth />
            <RecoveryPassForm />
        </main>
        <FooterAuth />
        </>
    )
}

export default RecoveryPassPage;