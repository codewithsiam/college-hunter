import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Profile = () => {
    const {users} = useContext(AuthContext);

    
    
    return (
        <div>
            profile 
        </div>
    );
};

export default Profile;