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

import { useCallback, useEffect, useState } from "react";
import { ID, tablesDB, account, bucket } from "../../lib/appwrite.conifg";
import { useForm } from "react-hook-form";
import type { userDetails } from "../../typescript/interface/userdetails.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDetailsSchema } from "../../service/validation/userdetails.validation";
import { userDetailsForm } from "../../service/json/userdetails.input";
import DynamicInput from "../../components/DynamicInput";
import { toast } from "sonner";
import { profileDetailsForm } from "../../service/json/profile.input";

interface StudentRow {
  $id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  address: string;
}

interface UsersRow {
  $id: string;
  name: string;
  email: string;
  role: string;
}

const User = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isAddLoading, setisAddLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<string | null>(null);
  const [userList, setuserList] = useState<StudentRow[]>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [editId, seteditId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userDetails>({
    resolver: yupResolver(userDetailsSchema) as never,
  });

  // ================= FETCH USERS =================
  const fetchUser = useCallback(async () => {
    setisLoading(true);
    setisError(null);
    try {
      const response = await tablesDB.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "student",
      });
      // ✅ Double-cast through unknown — DefaultRow[] has no overlap with StudentRow[]
      setuserList(response.rows as unknown as StudentRow[]);
    } catch (error: unknown) {
      setisError(
        error instanceof Error ? error.message : "Failed to fetch users",
      );
    } finally {
      setisLoading(false);
    }
  }, []);

  // ✅ Extract into a named sync callback — linter accepts this pattern
  useEffect(() => {
    const load = () => {
      void fetchUser();
    };
    load();
  }, [fetchUser]);

  // ================= UPLOAD IMAGE HELPER =================
  const uploadImageIfPresent = async (
    image: FileList | null | undefined,
  ): Promise<string | null> => {
    const file = image?.[0];
    if (!file) return null;

    const uploaded = await bucket.createFile({
      bucketId: import.meta.env.VITE_APPWRITE_BUCKETID,
      fileId: ID.unique(),
      file,
    });

    return bucket.getFileView({
      bucketId: import.meta.env.VITE_APPWRITE_BUCKETID,
      fileId: uploaded.$id,
    });
  };

  // ================= ADD / UPDATE =================
  const onSubmit = async (data: userDetails) => {
    setisAddLoading(true);
    try {
      if (editId) {
        await tablesDB.updateRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
          tableId: "student",
          rowId: editId,
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            course: data.course,
            address: data.address,
          },
        });

        await tablesDB
          .updateRow({
            databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
            tableId: "users",
            rowId: editId,
            data: { name: data.fullname },
          })
          .catch(() => undefined);

        toast.success("User Updated Successfully");
      } else {
        const userAuth = await account.create({
          userId: ID.unique(),
          email: data.email,
          password: data.password,
          name: data.fullname,
        });

        const imageUrl = await uploadImageIfPresent(data.image);

        await tablesDB.createRow({
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

        await tablesDB.createRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
          tableId: "student",
          rowId: userAuth.$id,
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            course: data.course,
            address: data.address,
          },
        });

        toast.success("User Added Successfully");
      }

      void fetchUser();
      reset();
      seteditId(null);
      setopenDialog(false);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setisAddLoading(false);
    }
  };

  // ================= EDIT =================
  const handleOpenDialog = async (user: StudentRow) => {
    seteditId(user.$id);
    setopenDialog(true);
    try {
      // ✅ Double-cast through unknown — Row has no overlap with UsersRow
      const usersRow = (await tablesDB.getRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "users",
        rowId: user.$id,
      })) as unknown as UsersRow;

      reset({
        fullname: usersRow.name,
        name: user.name,
        email: user.email,
        phone: user.phone,
        course: user.course,
        address: user.address,
        password: "",
      });
    } catch {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        course: user.course,
        address: user.address,
        password: "",
      });
      toast.error("Could not load full profile details");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    try {
      await tablesDB.deleteRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
        tableId: "student",
        rowId: id,
      });

      await tablesDB
        .deleteRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASEID,
          tableId: "users",
          rowId: id,
        })
        .catch(() => undefined);

      toast.success("User Deleted");
      void fetchUser();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  // ================= CLOSE DIALOG =================
  const handleCloseDialog = () => {
    setopenDialog(false);
    reset();
    seteditId(null);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">User Account</Typography>
        <Button
          variant="contained"
          onClick={() => {
            reset();
            seteditId(null);
            setopenDialog(true);
          }}
        >
          Add User
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit as never)}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              {editId ? "Update User Details" : "Create User"}
            </DialogContentText>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Profile Details
            </Typography>
            {profileDetailsForm.map((field) => (
              <DynamicInput
                key={field.name}
                name={field.name as keyof userDetails}
                label={field.label}
                type={field.type}
                required={field.required}
                register={register}
                errors={errors}
              />
            ))}

            {!editId && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Profile Image (optional)
                </Typography>
                <DynamicInput
                  name={"image" as keyof userDetails}
                  label="Profile Image"
                  type={"file" as never}
                  required={false}
                  register={register}
                  errors={errors}
                />
              </>
            )}

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              User Details
            </Typography>
            {userDetailsForm.map((field) => (
              <DynamicInput
                key={field.name}
                name={field.name as keyof userDetails}
                label={field.label}
                type={field.type}
                required={field.required}
                register={register}
                errors={errors}
              />
            ))}
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog}>Close</Button>
            <Button type="submit" variant="contained" disabled={isAddLoading}>
              {isAddLoading ? (
                <CircularProgress size={20} />
              ) : editId ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {isError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {isError}
        </Typography>
      )}

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : userList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Users Found
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((user) => (
                  <TableRow key={user.$id}>
                    <TableCell>{user.$id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.course || "N/A"}</TableCell>
                    <TableCell>{user.phone || "N/A"}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => void handleOpenDialog(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => void handleDelete(user.$id)}
                        >
                          Delete
                        </Button>
                      </Box>
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
