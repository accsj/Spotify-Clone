import React from "react";
import HeaderAuth from "../../componentes/HeaderAuth/HeaderAuth";
import RecoveyrForm from "../../componentes/RecoveryForm/RecoveryForm";
import FooterAuth from "../../componentes/FooterAuth/FooterAuth";

function RecoveryPage () {

    return (
        <>
        <main className="main_recovery_container">
            <HeaderAuth />
            <RecoveyrForm />
        </main>
        <FooterAuth />
        </>
    )
}

export default RecoveryPage;