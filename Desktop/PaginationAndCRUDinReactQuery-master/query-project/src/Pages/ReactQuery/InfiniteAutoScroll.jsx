import { Box, Typography, Paper, Button } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


const fetchFruits = ({ pageParam = 0 }) => {
  return axios.get(`http://localhost:4000/fruits/?_start=${pageParam}&_limit=3`);
};
const InfiniteAutoScroll = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = allPages.flatMap(page => page.data).length;
      return totalItems < 15 ? totalItems : undefined; 
    },
  })
  const {ref, inView} = useInView();
     useEffect(()=>{
        if(inView){
            fetchNextPage();
        }
     },[fetchNextPage, inView])
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
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </Box>
  );
};

export default InfiniteAutoScroll;
