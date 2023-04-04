import { Router } from "express";
import { userModel } from "../models/user.model.js";

const router = Router();

router.get('/', async(req,res)=>{
    try{
        let users = await userModel.find()
        res.send({result:"success", payload: users})
    }
    catch(error){
        console.log("No se puede acceder al usuario con mongoose:" + error)
    }
});

router.get('/:id', async (req,res)=>{

    try {
        const { id: paramId } = req.params;
        const id = Number(paramId)

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        }
        const product = await userModel.findById(id);

        if(!product.id){
            return res.send({success: false, error: "El usuario no fue encontrado"})
        }

        res.send({success: true, product});
    
    } catch (error) {
        console.log(error)

        res.send({success: false, error: "Ha ocurrido un error"});
    }

});

router.post("/", async (req, res) => {
    try {
        const {first_name, last_name, email} = req.body

        if(!first_name || !last_name || !email){
            return res.send({success: false, error: "Las datos son obligatorios"});

        }

        const savedProduct = await userModel.create({
            first_name,
            last_name,
            email,
            
        });

        res.send({success: true, product: savedProduct})

    } catch (error) {
        console.log(error);

        
        res.send({success: false, error: "Ha ocurrido un error"});
    }
}
);

router.put('/:id', async(req,res) =>{
    try {
        const { id: paramId } = req.params;
        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        };

        const {first_name, last_name, email} = req.body

        const updateProduct = await userModel.updateOne(id, {
            first_name,
            last_name,
            email,
        });

        res.send({success: true, product: updateProduct});
        
    } catch (error) {
        console.log(error);

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }

        res.send({success: false, error: "Ha ocurrido un error"});
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const { id: paramId } = req.params;
        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0) {
            return res.send({success: false, error: "El Id debe ser un valor válido"})
        };

        const deletedProduct = await userModel.deleteOne(id)

        res.send({success: true, deleted: deletedProduct})


    } catch (error) {
        console.log(error)

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }
        
        res.send({success: false, error: "Ha ocurrido un error"});
        
    }

})

router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'El correo electrónico no está registrado.' });
      }
      const token = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
      await user.save();
      const mailOptions = {
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${process.env.CLIENT_URL}/reset-password/${token}`,
        html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${process.env.CLIENT_URL}/reset-password/${token}">Restablecer contraseña</a></p>`
      };
      await transporter.sendMail(mailOptions);
      return res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico.' });
    }
  });

  router.post('/reset-password/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;
      const user = await userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ error: 'El enlace para restablecer la contraseña es inválido o ha expirado.' });
      }
      if (password === user.password) {
        return res.status(400).json({ error: 'La nueva contraseña no puede ser la misma que la actual.' });
      }
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.json({ message: 'Se ha restablecido su contraseña exitosamente.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocurrió un error al restablecer la contraseña.' });
    }
  });

export default router;