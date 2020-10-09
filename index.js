var links = [
	{"name": "Link 1", "url": "https://google.com"},
	{"name": "Link 2", "url": "https://twitter.com"},
	{"name": "Link 3", "url": "https://cloudflare.com"}
]

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
	console.log(links)
	return new Response(html, { 
		headers: { 'content-type': 'text/html' }
	})
}



addEventListener('fetch', event => {
  	const url = new URL(event.request.url)
  	if(url.pathname === '/links') {
		event.respondWith(handleLinkRequest(event.request))
	}
	else {
		event.respondWith(getHTML(event.request))
	}
})