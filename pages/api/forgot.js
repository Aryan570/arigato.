// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../models/Forgot"
import User from "../../models/User"
export default async function handler(req, res) {
    //check if the user exists in the database
    //send the email to the user
    if(req.body.sendMail){
    let token= `jdnnfrnfnrenernfnfbeujijijss737728`
    let forgot=new Forgot({
       email: req.body.email,
       token: token
    })
    let email = `We have sent you this email in response to your request to reset your password on Arigato.com.

    To reset your password, please follow the link below:

    <a href="https://arigato.com/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.

    <br/><br/>

    If you need help, or you have any other questions, feel free to email ${customer - service - email}, or call ${site - name} customer service toll-free at ${site - toll - free - number}.

    <br/><br/>`
}
else{
  //reset user password
}
    res.status(200).json({ success:true })
}