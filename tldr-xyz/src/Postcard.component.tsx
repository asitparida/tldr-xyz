import * as React from 'react';
import { Post, PostContent, FlaskLanguage, PostCategory } from './Postcard.models';

const jsLogo = 'images/js.png';
const htmlLogo = 'images/html5.png';
const cssLogo = 'images/css3.png';
const scssLogo = 'images/scss.png';

interface OwnProps {
	post: Post;
}

declare var Prism: any;

interface OwnState { }

function createMarkup(code: any, lang: any) {
	if (lang && Prism.languages[lang]) {
		return { __html: Prism.highlight(code, Prism.languages.javascript) };
	} else {
		return code;
	}
}

export class Postcard extends React.Component<OwnProps, OwnState> {
	state: Post;
	constructor(props: any) {
		super(props);
	}
	render() {
		const { post } = this.props;
		const contentCollection = post.ContentItems.map((content: PostContent, index: number) => {
			const flaskLanguage = content.FlaskLang !== null ? 'language-' + FlaskLanguage[content.FlaskLang] : '';
			const html = createMarkup(content.Data, FlaskLanguage[content.FlaskLang]);
			return (
				<div className="Postcard-Content-Item" key={index}>
					{
						content.Type === 1 &&
						<pre className={flaskLanguage}><code className={flaskLanguage} dangerouslySetInnerHTML={html} /></pre>
					}
					{
						content.Type === 0 &&
						<p className="Postcard-Content-Item-Text">{content.Data}</p>
					}
				</div>
			);
		});
		const tags = post.Tags.map((tag: string, index: number) => {
			return <label className="Postcard-Tag" key={index}>{tag}</label>;
		});
		let postType = '';
		let postLogo = '';
		switch (post.Category) {
			case PostCategory.any:
			case PostCategory.js: postType = 'JavaScript'; postLogo = jsLogo; break;
			case PostCategory.css: postType = 'CSS'; postLogo = cssLogo; break;
			case PostCategory.html5: postType = 'HTML5'; postLogo = htmlLogo; break;
			case PostCategory.scss: postType = 'SCSS'; postLogo = scssLogo; break;
			default: break;
		}
		return (
			<div className={"Postcard " + postType} id={post.id}>
				<div className="Postcard-Header">
					<img className="Postcard-Header-Logo" src={postLogo} />
					<h5 className="Postcard-Header-Type">{postType}</h5>
					<br />
					<h5 className="Postcard-Header-Meta">Posted by <a href="http://www.asitparida.com/" target="_blank" className="Postcard-Header-Meta-User">asitparida</a> | 
						<div className="Postcard-Tag-Container">
							{tags.length > 0 && tags}
						</div>
					</h5>
				</div>
				<div className="Postcard-Content">
					<h3>{post.Title}</h3>
					{contentCollection.length > 0 && contentCollection}
				</div>
			</div>
		);
	}
}
