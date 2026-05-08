// import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../service/validation/signup.validation";
import { account, bucket, ID, tablesDB } from "../lib/appwrite.conifg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { signupForm } from "../typescript/type/signup.type";
const Register = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

const {
  register,
  handleSubmit,
  setValue,
  reset,
  formState: { errors },
} = useForm<signupForm>({
  resolver: yupResolver(signupSchema) as never,
  defaultValues: {
    fullname: "",
    email: "",
    password: "",
    image: null,
  },
});

  const onSubmit = async (data: signupForm) => {
    setLoading(true);
    try {
      // Account Creation for Auth Table
      const userAuth = await account.create({
        userId: ID.unique(),
        email: data.email,
        password: data.password,
        name: data.fullname,
      });
      console.log("userauth", userAuth);
      let imageUrl: string | null = null;
      if (data.image) {
        console.log("comming image", data.image);

        // Bucket Id For image storafe
        const uploadImage = await bucket.createFile({
          bucketId: import.meta.env.VITE_APPWRITE_BUCKETID,
          fileId: ID.unique(),
          file: data.image,
        });
        console.log("upload img", uploadImage);

        const viewImage = bucket.getFileView({
          bucketId: import.meta.env.VITE_APPWRITE_BUCKETID,
          fileId: uploadImage.$id,
        });

        console.log("vew img", viewImage);
        imageUrl = viewImage;
      }

      // Account Create for users table in database
      const user = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "users",
        rowId: userAuth.$id,
        data: {
          name: data.fullname,
          email: data.email,
          password: data.password,
          role: "user",
          images: imageUrl,
        },
      });

      const userAccount = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "student",
        rowId: userAuth.$id,
        data: {
          name: data.fullname,
          email: data.email,
        },
      });

      console.log("student create Successfully", userAccount);
      console.log("user rgister res", user);
      if (user) {
        toast.success("User Register Successfully!!");
        reset();
        setPreview(null);
        navigate("/login");
      }
    } catch (error: any) {
      console.log("errosr", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #cfd9df, #e2ebf0)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 50,
            height: 50,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "#f1f3f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ➜
        </Box>

        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Create Account
        </Typography>

        {/* Inputs */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              size="small"
              {...register("fullname")}
              error={!!errors.fullname}
              helperText={errors?.fullname?.message}
            />
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              variant="outlined"
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
          </Stack>
          {/* upload img btn */}
          <Stack sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            {preview && (
              <Box
                component="img"
                src={preview}
                alt="img"
                sx={{ width: "150px", height: "150px", borderRadius: "7px" }}
              />
            )}
            <Button
              variant="outlined"
              onClick={() => document.getElementById("fileInput")?.click()}
              // onClick={() => fileRef.current?.click()}
            >
              UPload Image
            </Button>

            <Box
              // ref={fileRef}
              id="fileInput"
              component="input"
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setValue("image", file);

                const imgUrl = URL.createObjectURL(file);
                setPreview(imgUrl);
              }}
            ></Box>
          </Stack>

          {/* img preview */}

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 3,
              color: "#fff",
              background: "linear-gradient(to right, #232526, #414345)",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            {isLoading ? <CircularProgress /> : "Get Started"}
          </Button>
        </Box>

        {/* Button */}

        {/* Social Icons */}
      </Paper>
    </Box>
  );
};

export default Register;
