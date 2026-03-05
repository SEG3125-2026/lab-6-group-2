const fs = require('fs');

module.exports = function(app){

    const dataFile = './data/results.json';

    app.get('/niceSurvey', function(req, res){
        res.render('niceSurvey');
    });

    app.post('/submitSurvey', function(req, res){
        const responses = req.body;

        let data = {};
        if(fs.existsSync(dataFile)){
            data = JSON.parse(fs.readFileSync(dataFile));
        }

        // Initialize counts if first time
        const keys = ['navigation','rec','visual'];
        keys.forEach(key => {
            if(responses[key]){
                if(!data[key]) data[key] = {};
                if(!data[key][responses[key]]) data[key][responses[key]] = 0;
                data[key][responses[key]]++;
            }
        });

        // Save open text answers separately
        if(!data.textResponses) data.textResponses = [];
        data.textResponses.push({
            like_dislike: responses.task,
            improvement: responses.improvement
        });

        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.redirect('/analysis');
    });

    app.get('/analysis', function(req, res){
        let data = {};
        if(fs.existsSync(dataFile)){
            data = JSON.parse(fs.readFileSync(dataFile));
        }
        res.render('showResults', { results: data });
    });

};
