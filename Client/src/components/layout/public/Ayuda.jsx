import React from 'react';

export const Ayuda = () => {
    return (
        <div className="center-content">
            <h1>Contacto - Ideas Entrelazadas</h1>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                Si estás interesado en un perfil exclusivo para promocionar eventos, voluntariado y talleres que unen el espíritu innovador y colaborativo de Ideas Entrelazadas, ¡contáctanos! Queremos colaborar con personas apasionadas que buscan hacer la diferencia.
            </p>
            <table>
                <tbody>
                    <tr>
                        <td>Nombre de la empresa:</td>
                        <td>Ideas Entrelazadas</td>
                    </tr>
                    <tr>
                        <td>Teléfono:</td>
                        <td>+34 123 456 789</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>contacto@ideasentrelazadas.es</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Ayuda;
