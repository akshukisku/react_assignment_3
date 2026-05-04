import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ID, tablesDB } from "../../lib/appwrite.conifg";
import { useForm } from "react-hook-form";
import type { userDetails } from "../../typescript/interface/userdetails.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDetailsSchema } from "../../service/validation/userdetails.validation";
import { userDetailsForm } from "../../service/json/userdetails.input";
import DynamicInput from "../../components/DynamicInput";
import { toast } from "sonner";
import { profileDetailsForm } from "../../service/json/profile.input";
const User = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isAddLoading, setisAddLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<string | null>(null);
  const [userDetails, setuserDetails] = useState<any[]>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  

  //USeForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userDetails>({
    resolver: yupResolver(userDetailsSchema),
  });

  

  //   fetching the student details
  useEffect(() => {
    const fetchUser = async () => {
      setisLoading(true);
      try {
        const response = await tablesDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
          tableId: "student",
        });

        console.log("Userdetails", response);

        // ✅ store data
        setuserDetails(response.rows);
      } catch (error: any) {
        setisError(error?.message);
      } finally {
        setisLoading(false);
      }
    };

    fetchUser();
  }, []);

// const onSubmit = async (data: userDetails) => {
//   setisAddLoading(true);
//   try {
//     // You need a selected user's ID to update — add state for it
//     const response = await tablesDB.createRow({
//       databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
//       tableId: "student",
//       rowId: ID.unique(),
//       data: {
//         name: data.name,
//         email: data.email,
//         phone: data.phone,
//         course: data.course,
//         address: data.address,
//       },
//     });

//     if (response) {
//       toast.success("User details added!");
//       setopenDialog(false);
//       reset();
//       // Re-fetch to update the table
//       setuserDetails((prev) => [...prev, response]);
//     }
//   } catch (error: any) {
//     toast.error(error?.message);
//   } finally {
//     setisAddLoading(false);
//   }
// };

const onSubmit = async () => {
  // Trigger both forms' validation and get data
  const profileValid = await handleSubmitProfile(async (profileData) => {
    // handle profile data
  })();

  const userValid = await handleSubmitUser(async (userData) => {
      setisAddLoading(true);
  try {
    // You need a selected user's ID to update — add state for it
    const response = await tablesDB.createRow({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
      tableId: "student",
      rowId: ID.unique(),
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        course: data.course,
        address: data.address,
      },
    });

    if (response) {
      toast.success("User details added!");
      setopenDialog(false);
      reset();
      // Re-fetch to update the table
      setuserDetails((prev) => [...prev, response]);
    }
  } catch (error: any) {
    toast.error(error?.message);
  } finally {
    setisAddLoading(false);
  }
  })();
};



  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">User Account</Typography>
        <Button variant="contained" onClick={() => setopenDialog(true)}>
          Add
        </Button>
        <Dialog open={openDialog} onClose={() => setopenDialog(false)}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogContentText>Profile Creation</DialogContentText>
              {profileDetailsForm.map((int)=>(
                <DynamicInput key={int.name} name={int.name} label={int.label} type={int.type} required={int.required} register={register} errors={errors} />
              ))}
              <DialogContentText>User Details</DialogContentText>
              {userDetailsForm.map((int) => (
                <DynamicInput
                  key={int.name}
                  name={int.name}
                  label={int.label}
                  type={int.type}
                  required={int.required}
                  register={register}
                  errors={errors}
                />
              ))}
              <DialogActions>
                <Button onClick={() => setopenDialog(false)}>Close</Button>
                <Button
                  type="submit"
                  disabled={isAddLoading}
                  variant="contained"
                >
                  {isAddLoading ? <CircularProgress size={20} /> : "Add"}
                </Button>
              </DialogActions>
            </DialogContent>
          </Box>
        </Dialog>
      </Box>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            {/* ✅ HEAD */}
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* ✅ BODY */}
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                userDetails.map((user: any) => (
                  <TableRow key={user.$id}>
                    <TableCell>{user.$id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.course || "No"}</TableCell>
                    <TableCell>{user.active ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenDialog(user.$id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default User;
