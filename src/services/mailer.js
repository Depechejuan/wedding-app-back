const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.ADMINMAIL;
const pass = process.env.SECUREPASSAPP;
const website = "www.weddingpictures.es";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: `${email}`,
        pass: `${pass}`,
    },
});

transporter.verify().then(() => {
    console.log("Ready to send e-mails");
});

const sendInvite = async (fullMail) => {
    try {
        console.log("ok");
        const info = await transporter.sendMail({
            from: `WEDDING PHOTO`,
            to: `${fullMail.partner}`,
            subject: `INVITACIÓN A USAR WEDDING APP`,
            text: `
                ¡Hola ${fullMail.partner}
                ¡Tu compañero de vida quiere que uséis juntos esta aplicación!
                Tienes que registrarte aquí para que pueda invitarte y así poder disfrutar ambos de las fotos de vuestra boda del día ${fullMail.date}.
                ¡Entra aquí!
                ${website}
            `,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { sendInvite };
