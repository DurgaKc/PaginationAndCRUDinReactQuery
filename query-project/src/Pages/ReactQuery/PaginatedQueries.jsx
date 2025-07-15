import { Box, Typography, Paper, Button } from "@mui/material";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from "react";

// Fetch fruits from server with limit and page
const fetchFruits = (pageId) => {
  // return axios.get(`http://localhost:4000/fruits/?_limit=3&_page=${pageId}`);
  return axios.get(`http://localhost:4000/fruits/?_start=${pageId}&_limit=3`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,

  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <Box
      sx={{
        width: "1000px",
        margin: "0 auto",
        p: 3,
        mb: 2,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      {data?.data.map((fruit) => (
        <Paper
          key={fruit.id}
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
              {fruit.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.5,
              }}
            >
              {fruit.body}
            </Typography>
          </Box>
        </Paper>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          onClick={() => setPage((prev) =>(prev - 3))}
          disabled={page == 0 ? true : false}
          variant="contained"
        >
          Prev
        </Button>
         <h4>{page/3 + 1}</h4>
        <Button
          onClick={() => setPage((prev) => prev + 3)}
          disabled={data?.data.length < 3}
          variant="contained"
        >
          Next
        </Button>
      </Box>

      {isFetching && <Typography sx={{ mt: 2 }} color="text.secondary">Loading new page...</Typography>}
    </Box>
  );
};

export default PaginatedQueries;
