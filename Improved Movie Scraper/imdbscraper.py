from bs4 import BeautifulSoup
import requests
from lxml import html
import sys

session = True

while session == True:
	movie = input("What ratings do you want to see?\nTo quit, press y.\n")
	if movie == 'y':
		sys.exit()

	movie = movie.strip()
	movie = movie.lower()
	movie = movie.replace(" ", "+")
	url = "https://www.imdb.com/find?ref_=nv_sr_fn&q=" + movie + "&s=all"

	urlRequest = requests.get(url)

	if urlRequest.status_code == 404:
		print("Could not find that particular title. Please try again with correct spelling")
		sys.exit()

	htmlFile = urlRequest.text

	soup = BeautifulSoup(htmlFile, 'html.parser')

	temp = soup.findAll('table', class_ = 'findList')

	allTitles = []
	allLinks = []
	results = []
	number = 1;
	allTitles = temp[0].findAll('td', class_ = 'result_text')

	for i in allTitles:
		results.append(i.text)
		allLinks.append(i.a.attrs['href'])

	for i in results:
		strNumber = str(number)
		print(strNumber + ". ")
		print(i.strip())
		print('\n')
		number = number + 1

	selection = input("Select the correct Movie/TV Show: " + '\n')
	selection = int(selection)
	link = allLinks[selection - 1]
	link = link.strip()

	newUrl = "https://www.imdb.com" + link

	newUrlRequest = requests.get(newUrl)
	if newUrlRequest.status_code == 404:
		print("Could not find proper path")
		sys.exit()

	newHtmlFile = newUrlRequest.text
	newSoup = BeautifulSoup(newHtmlFile, 'html.parser')
	ratingList = newSoup.findAll('span', itemprop = "ratingValue")
	numberOfRatings = newSoup.findAll('span', itemprop = "ratingCount")
	
	rating = ratingList[0].text
	numberRatings = numberOfRatings[0].text
	print('\n' + results[selection - 1].strip())
	print("Average Rating: " + rating)
	print("Number of Ratings: " + numberRatings + '\n')




