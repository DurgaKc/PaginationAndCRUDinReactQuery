import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import axios from "axios";
import UniversitiesList from "./UniversitiesList";

// Post method
const addData = (university) => {
  return axios.post("http://localhost:4000/universities", university);
};

const PostData = () => {
  const queryClient = useQueryClient();
  const refetch = () => queryClient.invalidateQueries(["universities"]);
  
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  // Mutation for posting data
  const { mutate } = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      refetch(); // Refetch posts after successful submission which don't need to refresh page to load newly added data
    },
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      title: formData.title,
      body: formData.body,
    };
    mutate(post);
    setFormData({
      title: "",
      body: "",
    });
  };
 
  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: "500px",
          mx: "auto",
          mb: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Add new data
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />

        <TextField
          label="Body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          multiline
          rows={4}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      <UniversitiesList/>   
    </Box>
  );
};

export default PostData;
