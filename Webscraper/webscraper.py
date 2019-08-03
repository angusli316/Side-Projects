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
	movie = movie.replace(" ", "_")
	url = 'https://www.rottentomatoes.com/m/' + movie

	urlRequest = requests.get(url)

	if urlRequest.status_code == 404:
		print("Could not find that particular title. Please try again with correct spelling")
		sys.exit()

	htmlFile = urlRequest.text

	soup = BeautifulSoup(htmlFile, 'html.parser')

	temp = soup.findAll('div', class_ = 'mop-ratings-wrap__half')

	critic = temp[0].findAll('span', class_ = 'mop-ratings-wrap__percentage')
	print("Critic Score: " + critic[0].text.strip())
	print("Critic Ratings: " + temp[0].small.text.strip())
	
	audience = temp[1].findAll('span', class_ = 'mop-ratings-wrap__percentage')
	print("Audience Score: " + audience[0].text.strip())
	print(temp[1].strong.text.strip())


