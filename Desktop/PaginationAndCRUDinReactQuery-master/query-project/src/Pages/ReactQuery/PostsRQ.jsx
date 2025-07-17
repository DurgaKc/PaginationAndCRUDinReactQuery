import { Box, Typography, Paper, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime: 30000  keep fresh until 30ms
    refetchInterval: 1000,
    refetchIntervalInBackground: true,

    enabled: false,
  });
  if (isLoading) {
    return <div>Page is Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <Box>
       {!data && (
      <Button
        onClick={refetch}
        size="small"
        variant="contained"
        sx={{
          marginBottom: "10px",
          marginLeft: "190px",
          backgroundColor: "#35834dff",
        }}
      >
        Fetch Posts
      </Button>  )}
      {data?.data.map((post) => (
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
                {post.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                }}
              >
                <Button
                variant="contained"
                size="small"
                          component={Link}
                          to={`/query/${post.id}`}
                           style={{ textDecoration: "none" }}
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Arial, sans-serif",
                            textTransform: "none",
                            // marginRight:"10px"
                          }}
                >View Details</Button>
              </Typography>
            
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default PostsRQ;
