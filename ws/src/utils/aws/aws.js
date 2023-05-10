const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
require('dotenv').config();

module.exports = {
  IAM_USER_KEY: process.env.USER_KEY,
  IAM_USER_SECRET: process.env.USER_SECRET,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  uploadToS3: async function(file, filename) {
      const IAM_USER_KEY = this.IAM_USER_KEY;
      const IAM_USER_SECRET = this.IAM_USER_SECRET;
      const BUCKET_NAME = this.BUCKET_NAME;
      const AWS_REGION = this.AWS_REGION;
      
      let s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET,
        }
      });

      const fileContent = fs.readFileSync(file.path);
      const fileBuffer = Buffer.from(fileContent);

      var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fileBuffer,
      };

      try {
        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        console.log(data);
        return { error: false, message: data };
      } catch (err) {
        console.log(err);
        return { error: true, message: err.message };
      }
  },
  deleteFileS3: async function(key) {
    const IAM_USER_KEY = this.IAM_USER_KEY;
    const IAM_USER_SECRET = this.IAM_USER_SECRET;
    const BUCKET_NAME = this.BUCKET_NAME;
    const AWS_REGION = this.AWS_REGION;

    const s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
      }
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    try {
      const command = new DeleteObjectCommand(params);
      const data = await s3Client.send(command);
      console.log(data);
      return { error: false, message: data };
    } catch (err) {
      console.log(err);
      return { error: true, message: err.message };
    }
  },
};