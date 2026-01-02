import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: role, isLoading: isReloading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const { data } = await api.get(`/user/role/${user.email}`);
      return data.role;
      
    }
  });

  return { role, isReloading };
};

export default useRole;
