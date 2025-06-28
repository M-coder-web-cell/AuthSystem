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

const resetPassPage = async (req, res) => {
  const token = req.params.token;

  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded shadow max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

      <!-- Password -->
      <div class="mb-4">
        <input
          id="Password"
          type="password"
          placeholder="New Password"
          class="w-full p-3 border rounded focus:outline-none focus:ring"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-6">
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm New Password"
          class="w-full p-3 border rounded focus:outline-none focus:ring"
        />
      </div>

      <!-- Reset Button -->
      <button
        id="reset-button"
        class="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
      >
        Reset Password
      </button>
    </div>

    <script>
      const token = "${token}";

      document.getElementById("reset-button").addEventListener("click", async () => {
        const password = document.getElementById("Password").value.trim();
        const passwordConfirm = document.getElementById("passwordConfirm").value.trim();

        if (!password || !passwordConfirm) {
          alert("Please fill in both password fields.");
          return;
        }

        if (password !== passwordConfirm) {
          alert("Passwords do not match.");
          return;
        }

        try {
          const response = await fetch("http://localhost:4000/api/Auth/resetPassword/" + token, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, passwordConfirm }),
          });

          const data = await response.json();

          if (response.ok) {
            alert("Password reset successfully!");
            // Optionally redirect to login page:
            // window.location.href = "/login.html";
          } else {
            alert("Error: " + data.message);
          }
        } catch (err) {
          console.error(err);
          alert("An error occurred. Please try again.");
        }
      });
    </script>
  </body>
</html>
  `);
};

export { prisma , createUser, getOwnUserInfo, resetPassPage};