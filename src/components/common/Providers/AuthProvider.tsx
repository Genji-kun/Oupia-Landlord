import { useCurrentUserStore } from '@/stores/currrentUserStore';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type IAuthProviderProps = PropsWithChildren<{}>;

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser)
            navigate("/sign-in", { replace: true });
        else if (currentUser && pathname.startsWith("/sign-in")) {
            navigate("/");
        }
    }, [currentUser, navigate])

    return children;
};

export default AuthProvider;
