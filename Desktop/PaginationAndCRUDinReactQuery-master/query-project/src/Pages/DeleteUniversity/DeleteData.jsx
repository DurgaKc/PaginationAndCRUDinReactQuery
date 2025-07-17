import {
  Typography,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteUniversity = (id) => {
  return axios.delete(`http://localhost:4000/universities/${id}`);
};

const DeleteData = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () =>{
      
      // Invalidate and refetch the universities query
      queryClient.invalidateQueries(['universities']);
      
      // Close the dialog
      onClose?.();
    }
  });

  const handleDelete = () => {
    if (id) {
      deleteMutation(id);
    }
  };

  return (
    <>
      <DialogContent>
        <Typography sx={{ px: 4, pt: 4, pb: 2 }}>
          Are you sure you want to delete this data permanently?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteData;