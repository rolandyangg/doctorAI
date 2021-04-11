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
                mentions.forEach(mention => evidence.push({ id: mention.id , choice_id: mention.choice_id}))
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
                return resolve(json);
            })
            .catch(err => {
                return reject(err);
            })
    })

}



async function getDiagnosis(text, age, sex) {
    let data = await evidence(text, age, sex)
    console.log(data);

    console.log();

    let diagnosis = await diagnose(data, 34, 'male')
    console.log(diagnosis);
}

let text = "I often feel depressed. I have back pain. I also have breast pain. I have diabetes";
getDiagnosis(text, 34, 'male');