# doctorAI
democratizing healthcare through a simulated online check up for https://hacktj2021.devpost.com/
## Inspiration
Across the world, millions of people lack access to healthcare due to either its extremely high costs or the unavailability of resources. Additionally, with the COVID-19 Pandemic, the demand for the skills of medical workers has reached all-time highs. There are simply too many people in need, and not enough workers to go address those needs. That is where doctorAI comes in. We propose an artificially intelligent virtual doctor in the form of a simulated wellness visit, that can screen and help diagnose the needs of people. As previously mentioned, there are simply too many people in need and the workers are being completely overworked, so this virtual doctor aims to be like a "second helping hand" that can give patients their information remotely, helping workers take care of their workloads and help them focus on their job of saving more lives. 

## What it does
This website provides all our users with an extremely immersive virtual check-up experience through our sleek and cutting-edge interface. 

Our system measures the pulse rate (solely with video) through a JavaScript implementation of Remote photoplethysmography. It first meticulously tracks the face, then sends signal series based on the facial coloring, which is filtered and analyzed to estimate the heart rate 

By leveraging the Face-API built over TensorFlow, we were able to focus more on functionality rather than the tedious technical aspects. We were able to evaluate the mental state and mood of our users and in live time, we're able to deduce their mood as neutral, sad, surprised, angry, or happy. 

By using Natural Language Processing, Infermedica-API, and the Web Speech API, we are able to ask the user a series of health questions, which we use to create a diagnosis based on the symptoms. Additionally, we're able to provide recommendations and information about the diseases and drugs that the user is diagnosed with by web scraping Healthline. 

Moreover, we developed a model to accurately classify if a child has Autism with an accuracy rate of over 90% through Google's innovative autoML (on a test data of over 3,000 patient data). Our program is also capable of detecting skin tones that lets us accurately analyze skin diseases such as acne. 

## How we built it

The process was both long and arduous but unmistakably fruitful. When we started this project we knew next to nothing about OpenCV and other libraries, but our passion pushed us forward. 

We created our front-end model using javascript and implemented Bootstrap and HTML and CSS to make our page extremely smooth and appealing. An example includes our implementation of the "Counter-UP," which displays the data rising from zero to the actual number. After that, we used OpenCV and Tensorflow to display a video recording on the website. After meeting that first requirement, we used the Face-API that's wrapped with Tensorflow with OpenCV to recognize the face, get the emotion, and keep track of the heart rate. Then, we implemented the Web Speech API to take in the user's responses to questions that we came up with. From this string data, we implemented the  Infermedica-API that checks the problems that the user described and identified the symptoms and possible conditions. To give more information to the user we used MediaWiki to get a summary and send Healthline information. After that, we also took advantage of the Google autoML and developed an image classification program that can diagnosis if a child has autism with an accuracy rate of over 90% on a Kaggle open-source dataset. Additionally, we used Clarifai and created a custom image classification model on a Kaggle dataset to analyze skin tones and specifically acne. 


## Challenges we ran into

We had many challenges throughout our entire process that temporarily put a halt to all things coding. One of the major challenges was making the heart detector, facial recognition, and emotional detector work simultaneously in the same video in REAL-TIME! Additionally, a major problem was the tedious bootstrap formatting that constantly slowed us down. Getting access to the APIs also posed a challenge as it took several hours before receiving an access key. Additionally, working with Google's autoML was difficult due to it taking hours on end for each process. Finally, there were many speech-to-text converters, but many were incompatible and failed, so it posed us a challenge and we were lucky to find an API that let us take in the audio and convert it to a string. 

## Accomplishments that we're proud of

Some accomplishments that we're proud of include creating an attractive website using Bootstrap and building a functional frontend that connects to the backend. Also, the fact that we were able to get everything in live time was an extreme accomplishment for us. Finally, we're proud of the fact that we were able to effectively implement several APIs into our project. 

## What we learned

This process was one of the biggest learning experiences for us in our years of participating in Hackathons. We learned (or learned more about) OpenCV, Tensor Flow, Javascript, Bootcamp, Ajax, Node.js, Google autoML Vision, HTML/CSS, Express, Web-APIs, and Intermedica–API. We not only learned about the language, but we were able to test and practice what we learned through implementing our project. 

## What's next for doctorAI

In the future, we wish to make the program even more interactive. An example would be if a user says that he has a headache, the program would continue to engage on that topic and ask about the severity. Additionally, we'd like to see our model be tested in real situations, so we'd contact our local hospitals to see if they could possibly test and implement our website. Finally, we would also try and add more detection features to our doctor such as detection dyslexia through an eye scan. 
# References  

```
https://github.com/prouast/heartbeat-js 
https://www.kaggle.com/gpiosenka/autistic-children-data-set-traintestvalidate 
```

# Dependencies
```bash
npm install express
npm install jquery
npm install body-parser
npm install jade
```
