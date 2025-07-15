import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import PostsTraditional from '../Pages/PostsTraditional'
import Layout from '../Components/Layout'
import PostsRQ from '../Pages/ReactQuery/PostsRQ'
import PostsDetailsRQ from '../Pages/ReactQuery/PostsDetailsRQ'
import PaginatedQueries from '../Pages/ReactQuery/PaginatedQueries'
import InfiniteQueries from '../Pages/ReactQuery/InfiniteQueries'
import InfiniteAutoScroll from '../Pages/ReactQuery/InfiniteAutoScroll'
import PostData from '../Pages/AddData/PostData'

const Routing = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home/>}/>
            <Route path='/posts' element={<PostsTraditional/>}/>
            <Route path='/query' element={<PostsRQ/>}/>
            <Route path='/query/:postId' element={<PostsDetailsRQ/>}/>
            <Route path='/paginated-fruits' element={<PaginatedQueries/>}/>
            <Route path='/infinite-fruits' element={<InfiniteQueries/>}/>
            <Route path='/infinite-autoscroll' element={<InfiniteAutoScroll/>}/>
            <Route path='/post-data' element={<PostData/>}/>
          </Route>
        </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default Routing