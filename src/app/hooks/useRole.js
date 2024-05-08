import { useState, useEffect } from 'react';
import axios from 'axios';

const useRole = (auth) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const roles = ['beneficiario', 'voluntario', 'donante'];
                for (let role of roles) {
                    const roleResponse = await axios.get(`http://localhost:3001/api/${role}/findById/${auth.id}`);
                    if (roleResponse.data != null) {
                        // If there's a match, set the role in localStorage and stop checking
                        setRole(role);
                        break;
                    }
                    setRole('administrador');
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchRole();
    }, [auth]);

    return role;
}

export default useRole;

// example to use the hook:
// import useRole from '@/app/hooks/useRole';
//
// const Dashboard = () => {
//     const { auth, setAuth } = useContext(AuthContext);
//     const role = useRole(auth);
//     console.log(role);