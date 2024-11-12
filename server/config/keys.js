import dotenv from 'dotenv';

dotenv.config();
export const keys = {
  app: {
    name: 'News Website',
    apiURL: `${process.env.BASE_API_URL}`,
    clientURL: process.env.CLIENT_URL
  },
  port: process.env.PORT,
  database: {
    url: process.env.MONGO_URI
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },

  firebase: {
    
  }
};