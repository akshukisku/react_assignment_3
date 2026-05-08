import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

type FormState = {
  customerName: string;
  email: string;
  phone: string;
  productName: string;
  quantity: string;
  price: string;
  discount: string;
  taxRate: string;
  shipping: string;
  notes: string;
};

const initialState: FormState = {
  customerName: "",
  email: "",
  phone: "",
  productName: "",
  quantity: "1",
  price: "0",
  discount: "0",
  taxRate: "18",
  shipping: "0",
  notes: "",
};

const FormOptimizer = () => {

  console.log("A")
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const totalCost = useMemo(() => {
    const quantity = Number(formData.quantity) || 0;
    const price = Number(formData.price) || 0;
    const discount = Number(formData.discount) || 0;
    const taxRate = Number(formData.taxRate) || 0;
    const shipping = Number(formData.shipping) || 0;

    const subtotal = quantity * price;
    const discountAmount = (subtotal * discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const finalTotal = taxableAmount + taxAmount + shipping;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      finalTotal,
    };
  }, [
    formData.quantity,
    formData.price,
    formData.discount,
    formData.taxRate,
    formData.shipping,
  ]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log({
        ...formData,
        totalCost,
      });

      alert(`Final Total: ${totalCost.finalTotal}`);
    },
    [formData, totalCost]
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Large Form Optimizer
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Using useMemo and useCallback optimization
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount %"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Tax %"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Shipping"
                name="shipping"
                value={formData.shipping}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#f5f5f5",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Cost Summary
            </Typography>

            <Typography>
              Subtotal: ₹{totalCost.subtotal.toFixed(2)}
            </Typography>

            <Typography>
              Discount: ₹{totalCost.discountAmount.toFixed(2)}
            </Typography>

            <Typography>
              Tax: ₹{totalCost.taxAmount.toFixed(2)}
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              Final Total: ₹{totalCost.finalTotal.toFixed(2)}
            </Typography>
          </Box>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormOptimizer;