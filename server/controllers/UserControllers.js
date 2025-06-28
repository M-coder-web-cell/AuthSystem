import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient();


const createUser = async ({ name, email, password, passwordConfirm }) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const passCheck = await bcrypt.compare(passwordConfirm, hashedPassword);
  if (!passCheck) {
    throw new Error("Passwords do not match");  // Let the outer catch handle this
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const { password: pw, shopIds, isVerified, updatedAt, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const getOwnUserInfo = async (req, res)=>{
  try{
    
    const {password, __v, createdAt, updatedAt, ...userInfo} = req.user

    res.status(200).json({
      status: "success",
      userInfo
    })
  }catch(err){
    res.status(404).json({
      status:"failed",
      message: err
    })
  }
}

export { prisma , createUser, getOwnUserInfo};