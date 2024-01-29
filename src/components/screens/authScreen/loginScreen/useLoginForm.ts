import { useUserLoginMutation } from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { SignInAuth, SignInSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useLoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInAuth>({
       resolver: yupResolver(SignInSchema),
    });
   
    const [loginUser] = useUserLoginMutation()
   
    const dispatch = useAppDispatch()
    const router = useRouter()
   
    const sendForm: SubmitHandler<SignInAuth> = (data) => {
       loginUser(data).unwrap()
         .then((res) => {
           localStorage.setItem('token', res.token)
           dispatch(setCredentials({ token: res.token }))
           authLogin(res.token)
           router.push('/')
           toast.success(`Вы успешно вошли`, {
             position: toast.POSITION.BOTTOM_RIGHT
           });
         }).catch(() => {
           toast.error(`Неправильный email или пароль`, {
             position: toast.POSITION.BOTTOM_RIGHT
           });
         })
    }
   
    return { sendForm, register, errors, handleSubmit };
   };