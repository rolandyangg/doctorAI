import requests
from bs4 import BeautifulSoup
import lxml
import os
import codecs

def getBBCLink():
  return 'https://www.bbc.com/news/coronavirus'

def getCNNLink():
  return 'https://www.cnn.com/world/live-news/coronavirus-pandzemic-vaccine-updates-04-10-21/index.html'

def bbcExtractor():
  bbcHtml = requests.get(getBBCLink()).text
  with codecs.open('bbc.html', 'w', encoding='utf8', errors='ignore') as f:
        f.write(bbcHtml)
  with codecs.open('bbc.html', 'r', encoding='utf8', errors='ignore') as html_file:
    soup = BeautifulSoup(html_file, 'lxml')
  covidSection = soup.find_all('div', class_='nw-c-seven-slice')[-1]
  articleBody = covidSection.find('div', class_='gel-layout')
  images = [i.img['src'] for i in articleBody.find_all('div', class_='gs-o-responsive-image')]
  articles = articleBody.find_all('div', class_='gs-c-promo-body')
  headings = [a.div.a.h3.text for a in articles]
  summaries = [a.div.p.text for a in articles]
  times = ['Time Default' for a in articles]
  return [[headings[i], summaries[i], times[i], images[i]] for i in range(len(headings))]

def cnnExtractor():
  cnnHtml = requests.get(getCNNLink()).text
  with codecs.open('cnn.html', 'w', encoding='utf8', errors='ignore') as f:
        f.write(cnnHtml)
  with codecs.open('cnn.html', 'r', encoding='utf8', errors='ignore')as html_file:
    soup = BeautifulSoup(html_file, 'lxml')
  covidSection = soup.find_all('article', class_='jjVnED')
  times = [a.header.span.text for a in covidSection]
  headings = [a.header.h2.text for a in covidSection]
  summaries = [' '.join(' '.join([i.text for i in a.div.find_all('p', class_='sc-gZMcBi')]).strip().split(' ')[:30])+'...' for a in covidSection]
  images = [a.find('img', class_='gubAgz')['src'] if a.find('img', class_='gubAgz') != None else None for a in covidSection]
  return [[headings[i], summaries[i], times[i], images[i]] for i in range(len(headings)) if images[i] != None]