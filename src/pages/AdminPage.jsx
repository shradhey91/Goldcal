import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AdminPage = () => {
  const [rate, setRate] = useState("");
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    images: "",
    metalType: "GOLD",
    purity: "K24",
    weight: "",
    makingChargeType: "FLAT",
    makingChargeValue: "",
  });

  const loadRate = () => {
    api
      .get("/admin/gold-price")
      .then((res) => setRate(res.data.pricePerGram24K || 0))
      .catch((error) => console.error("Error loading rate:", error));
  };

  const updateRate = () => {
    api
      .put("/admin/gold-price", { pricePerGram24K: Number(rate) })
      .then(() => alert("Rate Updated"))
      .catch((error) => console.error("Error updating rate:", error));
  };

  const loadProducts = () => {
    api
      .get("/admin/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error loading products:", error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    api
      .post("/admin/products", form)
      .then(() => {
        alert("Product Added");

        setForm({
          name: "",
          sku: "",
          images: "",
          metalType: "GOLD",
          purity: "K24",
          weight: "",
          makingChargeType: "FLAT",
          makingChargeValue: "",
        });
        loadProducts();
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  useEffect(() => {
    loadRate();
    loadProducts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Admin Panel
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Gold Price (24K per Gram)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Current Rate"
            variant="outlined"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            onClick={updateRate}
            sx={{ height: "56px" }}
          >
            Update Rate
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add New Product
        </Typography>
        <Box component="form" onSubmit={addProduct} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="SKU"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Image URLs (comma-separated)"
                name="images"
                value={form.images}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Metal Type</InputLabel>
                <Select
                  label="Metal Type"
                  name="metalType"
                  value={form.metalType}
                  onChange={handleChange}
                >
                  <MenuItem value="GOLD">Gold</MenuItem>
                  <MenuItem value="SILVER">Silver</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Purity</InputLabel>
                <Select
                  label="Purity"
                  name="purity"
                  value={form.purity}
                  onChange={handleChange}
                >
                  <MenuItem value="K24">24K</MenuItem>
                  <MenuItem value="K22">22K</MenuItem>
                  <MenuItem value="K18">18K</MenuItem>
                  <MenuItem value="K14">14K</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Weight (g)"
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Making Charge Type</InputLabel>
                <Select
                  label="Making Charge Type"
                  name="makingChargeType"
                  value={form.makingChargeType}
                  onChange={handleChange}
                >
                  <MenuItem value="FLAT">Flat</MenuItem>
                  <MenuItem value="PERCENT">Percent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Making Charge Value"
                name="makingChargeValue"
                type="number"
                value={form.makingChargeValue}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "56px" }}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          All Products ({products.length})
        </Typography>
        <List>
          {products.map((p) => (
            <ListItem key={p.id} divider>
              <ListItemText
                primary={p.name}
                secondary={`${p.weight}g - ${p.purity} - SKU: ${p.sku}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AdminPage;
