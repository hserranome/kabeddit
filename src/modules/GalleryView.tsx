import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { Spin, Row, BackTop } from 'antd';

import { useSelector } from 'react-redux';


import getPosts from '../services/getPosts';
import Post from '../components/Post';

const PostsContainer = styled.div`
	@media (min-width: 640px) {	
		padding-top: 50px;
	}
`;

const Loader = () => (
	<Row
		type="flex"
		justify="center"
		align="middle"
		style={{ height: 200, width: '100vw' }}
	>
		<Spin size="large" />
	</Row>
)

const GalleryView = (props) => {
	const { subreddits, order, time, showNSFW, blurNSFW, showThumbnails } = useSelector(state => state.filters);
	const { initialized } = useSelector(state => state);
	
	const [posts, setPosts] = useState();
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	
	const getMorePosts = async () => {
		if (!loading && posts) {
			if (!loadingMore && posts.fetchMore) {
				setLoadingMore(true);
				const newPosts = await posts.fetchMore({ amount: 20, skipReplies: false });
				setPosts(newPosts);
				setLoadingMore(false);
			}
		}
	}

	useEffect(() => {
		const getPostsAsync = async () => {
			setLoading(true);
			setPosts([]);
			const posts = await getPosts({ subreddits, order, time });
			setPosts(posts);
			setLoading(false);
		}
		if (initialized) {
			getPostsAsync();
		}
	}, [order, subreddits, time, initialized]);


	// Filter NSFW posts if it applies
	const extensions = ['jpg', 'jpeg', 'png', 'gif'];
	const filteredPosts = posts 
		? posts
			.filter(post => {
				if (!showNSFW && post.over_18 === true) {
					return false
				} else {
					return true;
				}
			})
			.filter(res => {
				let { url } = res;
				let postExtension = url.substr(url.lastIndexOf('.') + 1);
				return extensions.includes(postExtension);
			})
		: [];

	return (
		<PostsContainer>

			<InfiniteScroll
				pageStart={0}
				loadMore={getMorePosts}
				hasMore={true}
				threshold={500}
				loader={<Loader key="loader"/>}
			>
				<Masonry>
					{
						filteredPosts.map(post => (
							<Post
								key={post.permalink}
								post={post}
								showThumbs={showThumbnails}
								blur={blurNSFW && post.over_18}
							/>
						))
					}
				</Masonry>
			</InfiniteScroll>
			<BackTop />
		</PostsContainer>
	)
}
export default GalleryView;
