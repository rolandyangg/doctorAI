const fetch = require('node-fetch');

function evidence(text, age, sex) {
    return new Promise((resolve, reject) => {
        let body = {
            text: text,
            age: { value: age },
            sex: sex
        }

        fetch("https://api.infermedica.com/v3/parse", {
            body: JSON.stringify(body),
            headers: {
                "App-Id": "695d2931",
                "App-Key": "f30672e78749625608e6d62d6dab0aa3",
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
                let evidence = [];
                let mentions = json.mentions;
                mentions.forEach(mention => evidence.push({ id: mention.id, choice_id: mention.choice_id }))
                return resolve(evidence);
            })
            .catch(err => {
                return reject(err);
            });
    })
}

function diagnose(evidence, age, sex) {
    return new Promise((resolve, reject) => {
        let body = {
            evidence: evidence,
            age: { value: age },
            sex: sex
        }

        fetch("https://api.infermedica.com/v3/diagnosis", {
            body: JSON.stringify(body),
            headers: {
                "App-Id": "695d2931",
                "App-Key": "f30672e78749625608e6d62d6dab0aa3",
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
                return resolve(json.conditions);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

function specialists(evidence, age, sex) {
    return new Promise((resolve, reject) => {
        let body = {
            evidence: evidence,
            age: { value: age },
            sex: sex
        }

        fetch("https://api.infermedica.com/v3/recommend_specialist", {
            body: JSON.stringify(body),
            headers: {
                "App-Id": "695d2931",
                "App-Key": "f30672e78749625608e6d62d6dab0aa3",
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
            return resolve(json.recommended_specialists);
            })
            .catch(err => {
            return reject(err);
            })
    })
}

async function getDiagnosis(text, age, sex) {
    result = {};

    let data = await evidence(text, age, sex)
    result.symptoms = data;

    let specialist = await specialists(data, age, sex);
    result.specialists = specialist;

    let diagnosis = await diagnose(data, 34, 'male')
    result.conditions = diagnosis;

    console.log(result);
    return result;
}

let text = "My legs hurt a bit when I walk. I do too much work. I feel stressed during the weekdays. I don't feel super supported by my family and friends. Sometimes I feel depressed.";
getDiagnosis(text, 34, 'male');