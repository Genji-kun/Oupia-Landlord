import { UserRole } from "@/lib/enums"
import { TSignInForm } from "@/lib/types"
import { assetService } from "@/services/AssetService"
import { authService } from "@/services/AuthService"
import { useCurrentUserStore } from "@/stores/currrentUserStore"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useSignIn = () => {
    const signIn = useCurrentUserStore((state) => state.signIn);
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: TSignInForm) => {
            const { data } = await authService.signIn(form);
            Cookies.set("accessToken", data.accessToken);
            const { data: currentUserInfo } = await authService.currentUser();
            if (currentUserInfo.role === UserRole.LANDLORD) {
                Cookies.set("user", JSON.stringify(currentUserInfo));
            }
            signIn(data);
            navigate("/", { replace: true })
        }
    })

    return {
        mutateAsync,
        isPending
    }
}

export const useCreateAsset = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await assetService.createAsset(form);
        },
        onSuccess: () => {
            toast.success("Thêm thông tin nhà trọ thành công.")
        }
    })

    return {
        mutateAsync,
        isPending
    }
}