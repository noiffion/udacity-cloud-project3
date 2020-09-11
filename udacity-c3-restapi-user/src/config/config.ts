import dotenv from 'dotenv';
dotenv.config();

export const config = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey:  process.env.AWS_SECRET_KEY,
  awsRegion: process.env.AWS_REGION,
  awsProfile: process.env.AWS_PROFILE,
  awsMediaBucket: process.env.AWS_BUCKET,
  frontUrl: process.env.FRONT_URL,
  jwtSecret: process.env.JWT_SECRET,
}
