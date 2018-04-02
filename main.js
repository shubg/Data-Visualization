var chart = null;
var dataPoints = [];
var JSONdata = [] ;
var getUserDataByLike = function (UsersData) {
    var UsersByLike = {};
    UsersData.map(Users => {
        var likes =  Users["likes"];
        likes.map(like => {
            if (!UsersByLike[like]) UsersByLike[like] = 0;
            UsersByLike[like] += 1;
        });
    });
    return UsersByLike;
};

window.onload = function() {
    chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Data by Likes",
            titleFontSize: 48
        },
        axisY: {
            title: "Number of Users",
            titleFontSize: 24
        },
        axisX: {
            labelFontSize: 12
        },
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    });

    $.getJSON("./Random_Users_Data.json", callback);
}

function callback(data) {
    JSONdata = data;
    var UsersData = getUserDataByLike(data);
    Object.keys(UsersData).forEach(function(key) {
        dataPoints.push({
            label: key,
            y: UsersData[key]
        });
    });
    chart.render();
}