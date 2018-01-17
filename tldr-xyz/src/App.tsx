import * as React from 'react';
import './App.scss';
import { Postcard } from './Postcard.component';
import { PlaylistPan } from './PlaylistPan.component';
import 'whatwg-fetch';

class App extends React.Component {
	state = {
		posts: []
	};
	constructor(props: any) {
		super(props);
	}
	componentDidMount() {
		fetch('/posts.json').then((response: any) => {
			return response.json();
		}).then((response: any) => {
			if (response.length > 0) {
				this.setState({
					posts: response
				});
			}
		});
	}
	public render() {
		const PostCollection = this.state.posts.map((post: any, index: number) => {
			return <Postcard key={index} post={post} />;
		});
		return (
			<div className="App">
				{<PlaylistPan posts={this.state.posts} activeIndex={10} title={'JavaScript Snips'} />}
				<div className="PostsHolder" >
					{PostCollection}
				</div>
			</div>
		);
	}
}

export default App;
