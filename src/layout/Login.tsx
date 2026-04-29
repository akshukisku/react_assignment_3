// import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account, tablesDB } from "../lib/appwrite.conifg";
import { Query } from "appwrite";
import { useForm } from "react-hook-form";
import type { loginformvalue } from "../typescript/type/login.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../service/validation/login.validation";
import { toast } from "sonner";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<string | null>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<loginformvalue>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginformvalue) => {
    setisLoading(true);
    try {
      //we are using this query finding the user from the daatabse
      const findUser = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "users",
        queries: [Query.equal("email", [data.email])],
      });
      console.log("Find User Details", findUser);
      if (findUser.rows.length > 0) {
        await account.createEmailPasswordSession({
          email: data.email,
          password: data.password,
        });

        Cookies.set("token", "true");
        Cookies.set("role", findUser?.rows?.[0]?.role);
        Cookies.set("user", JSON.stringify(findUser?.rows?.[0]));
        toast.success("Login Successfully!!");
        reset();
        if (findUser?.rows?.[0]?.role === "admin") {
          console.log("checking....");
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        toast.error("User not found!!");
      }
    } catch (error: any) {
      setisError(error?.message);
      toast.error(error?.message)
    } finally {
      setisLoading(false);
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
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sign in with email
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Make a new doc to bring your words, data, and teams together. For free
        </Typography>

        {/* Inputs */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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

          {/* Forgot Password */}
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "right", cursor: "pointer" }}
          >
            Forgot password?
          </Typography>

          {/* Button */}
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
            {isLoading ? <CircularProgress size={35} /> : "Login"}
          </Button>
        </Box>

        {/* Social Icons */}
        <Typography sx={{ mt: 2 }}>
          Don't have an Account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            Signup
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
