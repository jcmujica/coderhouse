import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from 'contexts/authContext';

export const Config = () => {
    const [config, setConfig] = useState({});
    const { user } = useContext(AuthContext);

    const handleConfigDisplay = (config) => {
        return JSON.stringify(config, null, 2);
    };

    const getConfig = async () => {
        const config = await axios.get('/api/config', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        setConfig(config?.data?.data);
    };

    useEffect(() => {
        if (!user) return;
        getConfig();
    }, [user?._id]);

    console.log({ config })
    return (
        <pre
            style={{
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                margin: '1rem',
                borderRadius: '0.5rem'
            }}
        >
            <code>
                {handleConfigDisplay(config)}
            </code>
        </pre>
    )
}
