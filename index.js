// Array containing the links
var links = [
	{"name": "Website", "url": "https://kiranjohns.xyz"},
	{"name": "LinkedIn", "url": "https://linkedin.com/in/kiranjohns"},
	{"name": "GitHub", "url": "https://github.com/thetronjohnson"},
]

// Profile object with source to profile pic and username
var profile = {
	"src":"https://www.kiranjohns.xyz/assets/static/kiran.0544d94.2c2990a03d6a20fe553f08508539dff2.webp",
	"name":"@kiranjohns"
}

// Array with the url and icon of social media
var social = [
	{
		"icon": `
				<svg viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
  				<path d="
    			M 630, 425
    			A 195, 195 0 0 1 331, 600
    			A 142, 142 0 0 0 428, 570
    			A  70,  70 0 0 1 370, 523
    			A  70,  70 0 0 0 401, 521
    			A  70,  70 0 0 1 344, 455
    			A  70,  70 0 0 0 372, 460
			    A  70,  70 0 0 1 354, 370
			    A 195, 195 0 0 0 495, 442
			    A  67,  67 0 0 1 611, 380
			    A 117, 117 0 0 0 654, 363
			    A  65,  65 0 0 1 623, 401
			    A 117, 117 0 0 0 662, 390
			    A  65,  65 0 0 1 630, 425
			    Z"
			    style="fill:#3BA9EE;"/>
				</svg>
				`,
		"url":'https://twitter.com/thetronjohnson'
	}
]


// JSONify the link array and return a response
async function handleLinkRequest(request) {
	const jsonLinks = JSON.stringify(links,null,2)
	return new Response(jsonLinks, {
		headers: { 'content-type': 'application/json;charset=UTF-8' }, // Return a JSON response
	})
}

// Function to retrive the static website
async function getHTML(request){
	const staticURL = 'https://static-links-page.signalnerve.workers.dev' // URL of the static website
	html = await fetch(staticURL).then((res)=>{
		return res.text() // Fetch the response text
	})
	return new Response(html, { 
		headers: { 'content-type': 'text/html' } // Return an HTML response
	})
}

// Function to rewrite the retrived HTML from the static website
async function rewriteHTML(request) {
	const response = await getHTML(request)
	return new HTMLRewriter().on("div#links", new LinksTransformer()).
	on("div#profile", new ProfileTransformer())
	.on("img#avatar", new ImageTransformer())
	.on("h1#name", new Nametransformer())
	.on("div#social", new SocialTransformer())
	.on("title", new TitleTransformer())
	.on("body", new BackgroundTransformer())
	.transform(response)
}


// Transformer class to show display the required links
class LinksTransformer {
	constructor(links){
		this.links = links
	}

	async element(element){

		links.forEach(i=>{
			element.append(`<a href="${i.url}">${i.name}</a>\n`,{html:true})
		})
	}
}

// Transformer class to remove an attribute
class ProfileTransformer {
	async element(element){
		element.removeAttribute('style')
	}
}

// Transformer class to show display user profile picture
class ImageTransformer{
	constructor(profile){
		this.profile = profile
	}

	async element(element){
		element.setAttribute("src",`${profile.src}`)
	}
}

// Transformer class to show display username
class Nametransformer{
	constructor(profile){
		this.profile = profile
	}

	async element(element){
		element.append(`${profile.name}`)
	}
}

// Transformer class to change the title of the webpage
class TitleTransformer{
	async element(element){
		element.replace(`<title>Kiran Johns</title>`,{html:true})
	}
}

// Transformer class to show the social icon
class SocialTransformer{
	constructor(social){
		this.social = social
	}
	async element(element){
		element.removeAttribute('style')
		social.forEach((i)=>{
			element.append(
			`
  				<a href="${i.url}">
   			 		${i.icon}
  				</a>
			`,
			{html:true}
		)
		})
	}
}

// Transformer class to change the background color
class BackgroundTransformer{
	async element(element){
		element.setAttribute("class","bg-green-400")
	}
}

// Evenr listener
addEventListener('fetch', event => {
  	const url = new URL(event.request.url)
  	if(url.pathname === '/links') {
		event.respondWith(handleLinkRequest(event.request)) // if path is <domainname>/links return the API
	}
	else {
		event.respondWith(rewriteHTML(event.request)) // for any other path show the rewrited static webpage
	}
})