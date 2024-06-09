import { UserRole } from "@/lib/enums"
import { TSignInForm } from "@/lib/types"
import { authService } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"

export const useSignIn = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: TSignInForm) => {
            const { data: accessToken } = await authService.signIn(form);
            const { data: currentUserInfo } = await authService.currentUser();
            if (currentUserInfo.role === UserRole.LANDLORD) {
                Cookies.set("accessToken", accessToken);
                Cookies.set("user", JSON.stringify(currentUserInfo));
            }
            return currentUserInfo;
        },
        onSuccess: (data) => {
            console.log(data)
            // const navigate = useNavigate();
            // const signIn = useCurrentUserStore((state) => state.signIn)
            // signIn(data);
            // navigate("/");
        }
    })

    return {
        mutateAsync,
        isPending
    }
}