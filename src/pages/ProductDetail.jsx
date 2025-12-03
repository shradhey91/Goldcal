import React, { useState } from "react";
import { api } from "../api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ProductDetail = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProduct = () => {
    if (!id) {
      setError("Please enter a valid Product ID.");
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    
    api.get(`/products/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(`Product with ID '${id}' not found.`);
        setData(null);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
         Product Detail
      </Typography>

      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Enter Product ID"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
            required
            size="medium"
          />
          <Button
            variant="contained"
            onClick={loadProduct}
            sx={{ height: '56px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Load Product"}
          </Button>
        </Box>
      </Paper>

      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      
      {data && data.product && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {data.product.name}
          </Typography>

          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText primary="SKU" secondary={data.product.sku} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Weight" secondary={`${data.product.weight}g`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Purity" secondary={`${data.karat}K (${data.product.purity})`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Metal Type" secondary={data.product.metalType} />
                </ListItem>
              </List>
            </Grid>

            
            <Grid item xs={12} sm={6}>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText primary="Metal Base Price" secondary={`₹ ${data.basePrice?.toFixed(2)}`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Making Charge" secondary={`₹ ${data.makingCharge?.toFixed(2)}`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Taxes (e.g., GST)" secondary={`₹ ${data.tax?.toFixed(2)}`} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography variant="h5" color="success.main" gutterBottom>
               Final Price
            </Typography>
            <Typography variant="h3" component="p" fontWeight="bold">
              ₹ {data.finalPrice?.toFixed(2)}
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default ProductDetail;