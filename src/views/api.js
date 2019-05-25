var city_name = ''



export function linechart(result, data){
  var data=result.data
  this.data.cityname = data.city.name + ", "+data.city.country
  console.log(this.data.cityname)
  // data = data.list

  // this.bigLineChart.allData[0]=[]
  // this.bigLineChart.allData[1]=[]
  // this.bigLineChart.allData[2]=[]
  // this.time=[]
  // for (var i in data){
  //   if (i<=10){
  //     // console.log(data[i])
  //     this.time.push((data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"+ (data[i].dt_txt).substring(11,13)+"시")
  //     this.bigLineChart.allData[0].push(((data[i].main.temp)-273.15).toFixed(1))
  //     this.bigLineChart.allData[1].push(data[i].wind.speed)
  //     this.bigLineChart.allData[2].push(data[i].main.humidity)
  //     // console.log(this.bigLineChart.allData[0])
  //   }

  //   if (i==1){
  //     this.min=((data[i].main.temp_min)-273.15).toFixed(1)
  //     this.max=((data[i].main.temp_max)-273.15).toFixed(1)
  //     this.icon='http://openweathermap.org/img/w/'+(data[i].weather[0].icon)+'.png'
  //     this.sky = data[i].weather[0].description
  //   }
  // } 

  // var num=1
  // this.tableData=[]
  // for (var i=0; i<data.length; i+=8){
  //   var info = new Object();
  //   info.id = num++
  //   info.date = (data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"
  //   info.weather = data[i].weather[0].main
  //   info.temp = ((data[i].main.temp)-273.15).toFixed(1)
  //   info.cloud = data[i].clouds.all
  //   info.cityname = this.cityname
  //   this.tableData.push(info)
  // }
};

export let data={
  city: 'Seoul',
  cityname: city_name
};
