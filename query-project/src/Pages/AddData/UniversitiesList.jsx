import { Box, Paper, Typography, Button, Dialog } from '@mui/material'
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DeleteData from '../DeleteUniversity/DeleteData';
import EditUniData from '../EditData/EditUniData';


// Fetch method
const fetchPosts = () => {
  return axios.get("http://localhost:4000/universities");
};
const UniversitiesList = () => {

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);

 const { data } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchPosts,
  });

const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

const handleEditClick = (id) =>{
    setSelectedId(id);
    setOpenEditDialog(true);
}

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };
const handleCloseEditDialog = () => {
setOpenEditDialog(false);
setSelectedId(null);
};
  return (
   <Paper>
    <Box textAlign="center" mb={3}>
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
          List of Universities
        </Typography>
      </Box>
      {data?.data.map((university) => (
        <Paper
          key={university.id}
          elevation={3}
          sx={{
            width: "100%",
            margin: "0 auto",
            p: 3,
            mb: 2,
            borderRadius: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "primary.main",
              }}
            >
              {university.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.5,
              }}
            >
              {university.body}
            </Typography>

            <Button
             onClick={() => handleEditClick(university.id)}
              variant="contained"
              size="small"
              sx={{
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                textTransform: "none",
                background: "#1e9832ff",
                padding: "0",
                marginTop: "8px",
                marginRight:"10px"
              }}
            >
              Edit
            </Button>
            <Button
             onClick={() => handleDeleteClick(university.id)}
              variant="contained"
              size="small"
              sx={{
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                textTransform: "none",
                background: "#d22117ff",
                padding: "0",
                marginTop: "8px",
              }}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      ))}
      {/* Delete Confirmation Dialog */}
      <Dialog 
      open={openDeleteDialog} 
      onClose={handleCloseDeleteDialog}>
        
      <DeleteData
      id={selectedId}
      onClose={handleCloseDeleteDialog}
      />
      </Dialog>

      <Dialog 
      open={openEditDialog} 
      onClose={handleCloseEditDialog}>
        
      <EditUniData
      id={selectedId}
      initialData={data?.data.find((university) => university.id === selectedId)}
      onClose={handleCloseEditDialog}
      />
      </Dialog>

   </Paper>
  )
}

export default UniversitiesList