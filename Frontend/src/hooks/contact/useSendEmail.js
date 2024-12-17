import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query" 
import ApiServer from "../../services/ApiServer"

const useSendEmail = () => {
    const sendEmail = useMutation({
        mutationFn: (data) => ApiServer.post("api/contact/",data),
          onMutate: async () => 
          {
            toast.loading("Enviando email...")
          },
          onSettled: () => {
            toast.dismiss()
          },
          onError: (error) => {
            toast.error(error.response.data.message)
          },
          onSuccess: (response) => {
            toast.success(response.data.message)
          },
          
    }) 

    return sendEmail
}
export default useSendEmail
