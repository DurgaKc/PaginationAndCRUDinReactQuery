import { Box, Typography, Paper, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const fetchPostDetails = (postId) => {
  return axios.get(`http://localhost:4000/posts/${postId}`);
};

const PostsDetailsRQ = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostDetails(postId),
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  const { title, body } = data?.data || {};
  return (
    <Paper
      elevation={3}
      sx={{
        width: "900px",
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
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.5,
          }}
        >
          {body}
        </Typography>
        <Button
          variant="contained"
          size="small"
          
          onClick={() => navigate('/query')}
          sx={{
            fontSize: "12px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none",
            marginTop: "10px",
            backgroundColor:"green"
          }}
        >
          GO BACK
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.975rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Copyright &copy;
          <Link
            to="https://www.facebook.com/dur.gaa.kc.438763"
            target="_blank"
             style={{
          color: "gray", // Force black color
          textDecoration: "none", // Remove underline
          '&:hover': {
            textDecoration: "underline", // Add underline on hover
          },
        }}
          >
            Durgakc
          </Link>
          2025
        </Typography>
      </Box>
    </Paper>
  );
};

export default PostsDetailsRQ;
