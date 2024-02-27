const express = require('express')
const connection = require('./config/db')
const userRouter = require('./routes/userRoutes')
const { productRouter } = require('./routes/productsRoutes')
const admin = require('firebase-admin');
const serviceAccount = require('./utils/productsapp-89db0-firebase-adminsdk-h6c3e-e65bd57b91.json');

const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Welcome to Dummy Server !!')
})
app.use('/users', userRouter)
app.use('/products', productRouter)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.post('/send-notification', (req, res) => {
  // const registrationToken = req.body.token; // Assuming you are sending the token in the request body

  const registrationToken = "ejnNFlICikNSoCFscLAv7O:APA91bF7vdNgK4K1vs5gg1hgwU5jY2lqT5-W7u2QBla57SRu_zBlIGgzhBKFdsWbQnMuRzlTuRfc6nxsduK1UkXgG1wuEkTpONHyR9mR8ifQ_nQxS6siNn0z6Aaoa-Re2fNyMYSIEKhe"
  console.log("test",req.body)
  const message = {
    notification: {
      title: 'Notification Title',
      body: 'Notification Body',
    },
    token: registrationToken,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.status(200).json({ success: true, message: 'Notification sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: 'Failed to send notification' });
    });
});
const PORT = 8080
app.listen(PORT, async () => {
  try {
    await connection()
    console.log('Connected to DB')
    console.log(`App is listening to ${PORT}`)
  }
  catch (error) {
    console.log(error)
  }
})