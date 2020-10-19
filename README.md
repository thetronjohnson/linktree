# 👷 LinkTree

A linktree style website using [Cloudflare Workers](https://workers.cloudflare.com/)

#### What does this project do?
- A JSON api at [/links](https://linktree.kiranjohns.workers.dev/links) endpoint
- Overwriting a [Static Site](https://static-links-page.signalnerve.workers.dev/) to make it into a profile page
Project is deployed [here](https://linktree.kiranjohns.workers.dev/)

## Assignment Task

#### Deploy a JSON API

Create a new Workers project using Wrangler. This project will respond to two kinds of requests, one to generate a JSON API (defined below), and second, to serve an HTML page (see "Set up an HTML page")

To begin, you should define an array of links. The links should be a JavaScript array, with a number of link objects, each with a name and URL string. See the below example for one of these link objects:

`{ "name": "Link Name", "url": "https://linkurl" }`
You should define at least three link objects inside of your array.

Once you've defined this array, set up a request handler to respond to the path /links, and return the array itself as the root of your JSON response.

In addition, you should ensure that the API response has the correct Content-Type header to indicate to clients that it is a JSON response.

You should be able to test that this works as expect by running wrangler dev to access your Workers application locally. 
Visit localhost:8000/links to confirm that your application returns the link array as a JSON response.

#### Set up an HTML page
With your API deployed, you can flesh out the rest of your application. If the path requested is not /links, your application should render a static HTML page, by doing the following steps:

#### Retrieve a static HTML page
Get the links from your previously deployed JSON response

Use HTMLRewriter to add these links to the static HTML page

Return the transformed HTML page from the Worker

Retrieve a static HTML page and modify it as required

Your Worker should begin by making a fetch request to https://static-links-page.signalnerve.workers.dev.
