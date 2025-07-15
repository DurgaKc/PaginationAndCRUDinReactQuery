import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const PostsTraditional = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }
  if (isError) {
    return <div>Error has occured...</div>;
  }
  return (
    <TableContainer component={Paper} sx={{ width: "700px", margin: "50px" }}>
      <Table>
        <TableHead sx={{backgroundColor: "#99aaa5"}}>
          <TableRow >
            <TableCell
            sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}
            >
              <strong>Id</strong>
            </TableCell>
            <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Body</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{post.id}</TableCell>
              <TableCell sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)' }}>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostsTraditional;
