var links = [
	{"name": "Website", "url": "https://kiranjohns.xyz"},
	{"name": "LinkedIn", "url": "https://linkedin.com/in/kiranjohns"},
	{"name": "GitHub", "url": "https://github.com/thetronjohnson"},
]

var profile = {
	"src":"https://www.kiranjohns.xyz/assets/static/kiran.0544d94.2c2990a03d6a20fe553f08508539dff2.webp",
	"name":"@kiranjohns"
}
async function handleLinkRequest(request) {
	const jsonLinks = JSON.stringify(links,null,2)
	return new Response(jsonLinks, {
		headers: { 'content-type': 'application/json;charset=UTF-8' },
	})
}

async function getHTML(request){
	const staticURL = 'https://static-links-page.signalnerve.workers.dev'
	//const baseURL = new URL(request.url)
	html = await fetch(staticURL).then((res)=>{
		return res.text()
	})
	return new Response(html, { 
		headers: { 'content-type': 'text/html' }
	})
}

async function rewriteHTML(request) {
	const response = await getHTML(request)
	return new HTMLRewriter().on("div#links", new LinksTransformer()).
	on("div#profile", new ProfileTransformer())
	.on("img#avatar", new ImageTransformer())
	.on("h1#name", new Nametransformer()).transform(response)
}


class LinksTransformer {
	constructor(links){
		this.links = links
	}

	async element(element){

		links.forEach(i=>{
			element.append(`\n<a href="${i.url}">${i.name}</a>\n`,{html:true})
		})
	}
}

class ProfileTransformer {
	async element(element){
		element.removeAttribute('style')
	}
}

class ImageTransformer{
	constructor(profile){
		this.profile = profile
	}

	async element(element){
		element.setAttribute("src",`${profile.src}`)
	}
}

class Nametransformer{
	constructor(profile){
		this.profile = profile
	}

	async element(element){
		element.append(`${profile.name}`)
	}
}



addEventListener('fetch', event => {
  	const url = new URL(event.request.url)
  	if(url.pathname === '/links') {
		event.respondWith(handleLinkRequest(event.request))
	}
	else {
		event.respondWith(rewriteHTML(event.request))
	}
})