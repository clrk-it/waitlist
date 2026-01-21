import * as React from 'react';

interface WelcomeEmailProps {
    email: string;
    userType: string;
    interest: string;
    club?: string;
    ventureName?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    email,
    userType,
    interest,
    club,
    ventureName,
}) => (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
        <h1 style={{ color: '#fbbf24' }}>New User Joined Mivro!</h1>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Type:</strong> {userType}</p>
        {club && <p><strong>Club:</strong> {club}</p>}
        {ventureName && <p><strong>Venture:</strong> {ventureName}</p>}
        <hr style={{ borderColor: '#eee', margin: '20px 0' }} />
        <p><strong>Reason for joining:</strong></p>
        <p style={{ fontStyle: 'italic', color: '#666' }}>&quot;{interest}&quot;</p>
    </div>
);
