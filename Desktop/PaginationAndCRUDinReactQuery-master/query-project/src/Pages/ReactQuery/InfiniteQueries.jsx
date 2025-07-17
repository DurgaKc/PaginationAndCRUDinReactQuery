import { Box, Typography, Paper, Button } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
// import { create } from 'zustand';

const fetchFruits = ({ pageParam = 0 }) => {
  return axios.get(`http://localhost:4000/fruits/?_start=${pageParam}&_limit=3`);
};

// const useStore = create((set) => ({
//   maxItems: 15, // Default
//   setMaxItems: (value) => set({ maxItems: value }),
// }));

const InfiniteQueries = () => {
  // const { maxItems } = useStore();
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage,  isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
     if (lastPage.data.length < 3) return undefined;
       const totalItems = allPages.flatMap(page => page.data).length;
      return totalItems;
    },
  });
  console.log(data, "data");

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
      {data?.pages?.map((page, i) =>
        page?.data.map((fruit) => (
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
        ))
      )}
      <Button 
      variant="contained"
        sx={{marginLeft:"30px"}}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >Load more...</Button>
    </Box>
  );
};

export default InfiniteQueries;
