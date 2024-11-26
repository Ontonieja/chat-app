import { PutObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";

interface uploadToS3Props {
  file: Express.Multer.File;
  userId: number;
}

const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.BUCKET;

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export const uploadToS3 = async ({ file }: uploadToS3Props) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Invalid file type");
  }

  const key = `${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  });

  try {
    const uploadResult = await s3.send(command);
    return {
      fileUrl: `${process.env.AWS_BUCKET_URL}${key}`,
    };
  } catch (error) {
    throw new Error("Error uploading to S3: " + error);
  }
};
