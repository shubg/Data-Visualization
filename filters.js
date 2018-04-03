
function handleSubmitClick () {
  var genderElem = document.getElementById("gender");
  var gender = genderElem.value;
  var regionElem = document.getElementById("region");
  var region = regionElem.value.toString();
  if (gender || region) {
      var UsersByFilters = {};
      JSONdata.map(Users => {
          var userGender = Users["gender"];
          var userRegion = Users["contact"]["region"];
          var likes =  Users["likes"];
           if (region) {
               if (userRegion === region) {
                   if (gender == 'both' || userGender === gender) {
                       likes.map(like => {
                           if (!UsersByFilters[like])
                       UsersByFilters[like] = 0;
                       UsersByFilters[like] += 1;
                   });
                   }
               }
           } else if (userGender === gender || gender == 'both') {
               likes.map(like => {
                   if (!UsersByFilters[like]) UsersByFilters[like] = 0;
               UsersByFilters[like] += 1;
              });
           }
      });
  }
  chart.options.data[0].dataPoints = [];
  dataPoints = [];
  Object.keys(UsersByFilters).forEach(function(key) {
      chart.options.data[0].dataPoints.push({
          label: key,
          y: UsersByFilters[key]
      });
  });
  chart.render();
}
