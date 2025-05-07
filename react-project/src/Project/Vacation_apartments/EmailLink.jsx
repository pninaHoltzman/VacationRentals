import React from 'react';

export const EmailLink = ({ email, subject = 'שלום' }) => {
    // יצירת קישור mailto עם כתובת האימייל והנושא
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    const openGmail = () => {
        // פותח את Gmail (אם הוא לא פתוח)
        const gmailUrl = 'https://mail.google.com/mail/u/0/#inbox?compose=new';
        window.open(gmailUrl, '_blank');
    };

    return (
        <div>
            <a id='h'
                href={mailtoLink} 
                style={{ color: 'blue', textDecoration: 'underline' }}
                onClick={openGmail}
            >
                {email}
            </a>
        </div>
    );
};

export default EmailLink;
