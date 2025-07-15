import { DialogContent, Box, Typography, TextField, Button, DialogActions } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { useState } from 'react';

const updateUniversity = ({ id, title, body }) => {
  return axios.put(`http://localhost:4000/universities/${id}`, { title, body });
};

const EditUniData = ({ id, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    body: initialData?.body || ''
  });
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(['universities']);
      onClose();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      title: formData.title,
      body: formData.body
    });
  };

  return (
    <>
      <DialogContent>
        <Box sx={{ maxWidth: "1900px", mx: "auto", p: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: "1000px",
              mx: "auto",
              mb: 4,
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ marginX: "100px" }}
            >
              Update University Data
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
              rows={3}
              fullWidth
            />

            <DialogActions sx={{ pb: 2, pr: 0 }}>
              <Button 
                onClick={onClose} 
                variant="outlined"
                disabled={updateMutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? 'Updating...' : 'Update'}
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </DialogContent>
    </>
  )
}

export default EditUniData;