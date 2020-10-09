async function renderLinks(request){
	return new Response("Home", { status: 200})
}

async function handleLinkRequest(request) {
	const links = [
		{"name": "Link 1", "url": "https://google.com"},
		{"name": "Link 2", "url": "https://twitter.com"},
		{"name": "Link 3", "url": "https://cloudflare.com"}
	]

	const jsonLinks = JSON.stringify(links,null,2)
	return new Response(jsonLinks, {
		headers: { 'content-type': 'application/json;charset=UTF-8' },
	})
}

async function pageNotFoundError(request) {
	return new Response("Page Not Found!",{ status: 404})
}


addEventListener('fetch', event => {
  	const url = new URL(event.request.url)
  	console.log(url.pathname)
  	if(url.pathname === '/') {
  		event.respondWith(renderLinks(event.request))
  	}
  	else if(url.pathname === '/links') {
		event.respondWith(handleLinkRequest(event.request))
	}
	else {
		event.respondWith(pageNotFoundError(event.request))
	}
})