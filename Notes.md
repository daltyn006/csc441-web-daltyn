A problem I had was getting the asset in the top right to continue to work with another item aligned to the left of it. My fix was to convert it to a web image instead of indexing each asset.

## Week 9, Friday.
1. I chose 40rem as the breakpoint, it was on the assignment, so I am assuming an accuracy to other devices I do not have in my knowledge.
2. I did not find anything wrong with the web-pages. The only thing that is not essentially desired is the middle photo in the gallery being shrunk to fit correctly with the rest of them while being a different format. I do not think I will "fix" this as it is not exactly a bug, but I might try to alter the box to shrink to fit the image instead of staying a square, although it looks alright.
3. Justify-content makes positions alter left and right, align-items moves items up and down 
4. I would assume that most modern laptops and desktops have higher compute for allocating resources for browsing, and having browser take a heavier load would mean that smartphones are able to run faster on the pages.
Why does the plain rule hold the narrow layout and the media query
hold the wide one, instead of the other way round?

## Week 10, Wednesday.

1. Html is the structure of a webpage. Css is the visuals of a webpage. Javascript is the controls in the webpage. 
2. Defer most likely tries to synchronize or allow time for something to initialize before calling it.
3. It works because all variables were set in the root, and when you change those variables you change the whole site. 
4. I would assume if nothing is coming through the javascript file was not being called. 
5. I'm not completely sure how to add dropdown bars, auto-scrolling images, CAPTCHAs, banners, authentication, **flash** - video & audio, tables, hr, br, sup, sub, b, i, abbr, cite, dfn, strong, em, blockquote, address, ins, def, searching, etc.  

## Week 10, Friday.
1.  Event prevent default claims the event is being explicitly handled, so its default action, such as page scrolling, link navigation, or pasting text, should not be taken. For this function; I assume, would be having the event automatically be passed instead of allowing HTML to check the values in the box forcing javascript to do all. It would most likely reset the contents in the field as well. Or: "a form's default behavior: [is to] hand
the data to a server and load whatever comes back. You do not have a server, so it reloads the same page and loses the lot."
2. The javascript function tried to access a property that was not assigned yet, because form-status was not set before the script initialized it. 
3. I added a duplicate text detector so that bots can't spam random letters at me, I might add a restriction on how often messages can be sent as well. I used reused what was on my kotlin project but simplified.
4. It still looks fine to me, nothing overflows, nothing looks bad in dark mode at least. 
5. I think that a. the link to my address/server is missing b. the function call to send the email to my address c. the people to send me the email.

## Week 11.
live site: https://daltynlandas.netlify.app/

1. Github hosts the files that netlify uses on the web, so github is the remote server that netlify pulls from to use its dns to resolve.
2. The webpage will not change because we are not hosting the development page, we are hosting the release. 
3. The padlock means that this has an https connection instead of an unstable http. One difference between the protocols used on the web and local on machine. 
4. I would hand a stranger my images on a piece of paper. I do not have my email address attached to this, phone number, credit card number, SSN, or passwords/login info, so I think I am safe. After the class I will be deleting the screenshots.

# Week 11, Friday.

Biggest problem is probably going to be figuring out SLS for the default .me address, I don't see anything about setting this up just yet. Another problem I had was resizing the sprite sheet to a smaller size since it took me a minute to think about how to format it correctly before implementing. After the test I slowed my cpu down 20x and it still ran in under a second swap. Only other problem I had was the lab PDF clipping off-screen.

1. The honey-pot field is an input field hidden from human users so they never see or fill it out. It's a trap to catch automated scrapers or auto-fill forms before they can submit anything since if anything is submitted into the field it is instantly dismissed.

2. A deploy preview is a temporary website every time you push a branch or open a pull request. It's good to look over what the webpage will look like after Netlify changes its fields in display.

3. Everything still looks alright, has enough spacing, large enough sizing, no overflow unless the user specifically zooms in on their screen, everything resizes correctly. I don't think I have any CSS widths or oversized images that force the page to scroll horizontally on narrow screens, it does not occur on my phone at least,  all containers should be fluid.

4. I write and commit code locally on your laptop on a working branch. I push that branch to my remote repository on GitHub. I open a PR into main. Netlify detects this and builds a temporary Deploy Preview from your feature branch. The PR is merged into my release branch on GitHub. Netlify automatically triggers a new production build from the main branch and deploys the compiled assets globally to the public web.

5. Both addresses point to the Github repository, the .netlify.app subdomain is the default address assigned by Netlify. My custom domain is linked via DNS records that point traffic to Netlify's content network. When a browser requests the page, Netlify's servers receive the request, inspect the HTTP Host header to see which domain was asked for, and serve the exact same site files accordingly.

6. I'd like to try to implement something like what every single site is doing with using ai on the site. I'd probably train a tiny model off of SmolLM2 or qwen2.5:0.5b to run off huggingface and pull weights to the consumer gpu for answering some questions on the site from some sort of database set into it explaining a bunch of things.


## Week 12, Wednesday, S19
Topic: Digital Images
Supabase project: CSC441-api-daltynlandas
Table: showcase_items
Project URL: https://cdfichxcvdpjewcovyqk.supabase.co
GET endpoint: https://cdfichxcvdpjewcovyqk.supabase.co/rest/v1/showcase_items?select=*&order=id.asc
HTTP status: 200 OK
Records returned: 5

## Week 12, Wednesday, Lab 19
  1. What's stored in a database table?
  Data about one kind of thing, organised into rows and columns. Each row is one record (one post, one user, one product), and each column is a field that record has (title, category, created_at). So a posts table isn't "the posts page" — it's just the raw entries the page gets built from.
  
  2. Table vs API endpoint?
  The table is where the data actually lives. The endpoint is a URL you send requests to — a door that lets your app reach that data over HTTP. The table is storage; the endpoint is access. One endpoint usually sits in front of a table, but it can also pull from several tables or return something computed, so they aren't the same thing.
  
  3. What does GET do? What format came back?
  
  GET asks the server to send data back. It's the read method — it fetches, it doesn't create, edit or delete anything. My endpoint returned JSON: an array of objects, one object per row, with the column names as keys, e.g.
  4. Why a publishable key and not a secret key?
  Because anything in front-end code is public — anyone can open DevTools and read it. The publishable key is designed to be exposed: it identifies the project and can only do what the Row Level Security policies allow. A secret key skips those rules and has full access to everything, so if it ships in the browser, anyone could read, change or wipe the whole database. Secret keys stay on a server; publishable keys go in the client.
  
  5. What changed with select=title,category?
  Only the columns that came back. select=* returns every column for each row (id, body, created_at, whatever else exists). Naming the columns returns just those two fields per object — same number of rows, less data sent, less noise to dig through, and no columns exposed that the page doesn't need. It's choosing fields, not filtering rows — that's a separate where/filter step.
