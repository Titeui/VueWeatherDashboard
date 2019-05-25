<template>
  <div class="mr-5 ml-5">
    <div class="row justify-content-center">
      <div class="col-lg-3">
          <base-input label="City"
                      v-model="data.city" 
                      @keyup.enter="linechart()"></base-input>
      </div>
      <div class="col-lg-3">
          <base-input label="country"
                      v-model="data.country" 
                      @keyup.enter="linechart()"></base-input>
      </div>
    </div>
    <div class="row card">
        <div type="chart">
            <!-- <div class="row"> -->
              
            <div class="card-header pt-0 pb-0">
                <div >
                    <p class="mb-1 pt-1">{{this.data.cityname}}</p>
                </div>   
            </div>
            <div class="card-body">

             <h5>기온, 풍속, 습도</h5>
                    
                <div class="nav justify-content-end card-header-tabs btn-group-toggle btn-sm mb-2"
                    data-toggle="buttons">
                    <label v-for="(option, index) in bigLineChartCategories"
                            :key="option"
                            class="nav-item btn btn-sm btn-light btn-simple"
                            :class="{active: bigLineChart.activeIndex === index}"
                            :id="index">
                        <input type="radio"
                            class="nav-link active"
                            @click="initBigChart(index)"
                            name="options" autocomplete="off"
                            :checked="bigLineChart.activeIndex === index">
                        {{option}}
                    </label>
                </div>
    
              
          <!--큰 선형 그래프 (BMI, Heart Rate, Weight, Activity)-->
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
        <div class="col-sm pl-0 pr-0 mr-3">
            <div class="card">
                <div class="card-header pb-0 pt-0">
                    <p class="mb-1 mt-1">{{this.data.cityname}}</p>
                </div>
                <div class="card-body pb-0">
                    <h5 class="card-title">5일간 날씨 변화</h5>
                    <base-table :data="this.data.tableData"
                    :columns="this.data.tableColumns"
                    thead-classes="text-primary">
                    </base-table>
                </div>
            </div>
        </div>      
      <div class="col-sm pl-0 pr-0">
        <div class="card">
            <div class="card-header pb-0 pt-0">
                <p class="mb-1 mt-1">{{this.data.cityname}}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title">오늘의 날씨</h5>
                <div class="row d-flex justify-content-center">
                    <div class="col">
                    <h2><img v-bind:src="this.data.icon" width="10%">{{this.bigLineChart.allData[0][0]}}°C</h2>
                    </div>
                </div>
            
                <div class="col">
                    <table class="table table-borderless">
                    <tbody>
                        <tr>
                    <slot name="columns">
                        <td>하늘</td>
                        <td>{{this.data.sky}}</td>
                    </slot>
                    </tr>
                    <tr>
                        <slot name="columns">
                        <td>최저 기온</td>
                        <td>{{this.data.min}}</td>
                        </slot>
                    </tr>
                    <tr>
                    <slot name="columns">
                        <td>최고 기온</td>
                        <td>{{this.data.max}}</td>
                    </slot>
                    </tr>
                    <tr>
                    <slot name="columns">
                        <td>바람</td>
                        <td>{{this.bigLineChart.allData[1][0]}}</td>
                    </slot>
                    </tr>
                    </tbody>   
                    </table>
                </div>  
            </div>  
        </div>
      </div>
      
  </div>
  </div>
</template>

<script>
  import LineChart from '../components/Charts/LineChart';
  import * as chartConfigs from '../components/Charts/config';
  import config from '@/config';
  import * as api from "./api.js";

   //인풋 테이블
  import BaseInput from '../components/BaseInput.vue';
  import BaseTable from "../components/BaseTable.vue";
  



  export default {
    components: {
      LineChart,
      BaseTable,
      BaseInput
    },
    data() {
      return {
        data:{
           //추가
          city: 'Seoul',
          time: [],
          country:'kr',
          categorie:['기온', '풍속', '습도'],
          tableData:[],
          tableColumns:['date','weather','temp','cloud',"cityname"],
          icon:'',
          min:'',
          max:'',
          sky:'',
          cityname:'',
        },
       

        bigLineChart: {
          allData: [//[3][12]
            [],
            [],
            []
          ],
          activeIndex: 0,
          chartData:null,
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
       
      }
    },
    computed: {     
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      bigLineChartCategories() {
        return this.data.categorie;
      }
    },
    methods: {
      linechart(){
        
        var baseURI = 'https://api.openweathermap.org/data/2.5/forecast?q='+this.data.city+','+this.data.country+'&APPID=f771230ab7da7dcecc547d9e600585f5';
        this.$http.get(`${baseURI}`)
        .then((result)=>{
        api.linechart(result, this.data)
        console.log(this.data.cityname)
        var data=result.data
        this.data.cityname = data.city.name + ", "+data.city.country
        data = data.list
        
        this.bigLineChart.allData[0]=[]
        this.bigLineChart.allData[1]=[]
        this.bigLineChart.allData[2]=[]
        this.data.time=[]
        for (var i in data){
          if (i<=10){
            // console.log(data[i])
            this.data.time.push((data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"+ (data[i].dt_txt).substring(11,13)+"시")
            this.bigLineChart.allData[0].push(((data[i].main.temp)-273.15).toFixed(1))
            this.bigLineChart.allData[1].push(data[i].wind.speed)
            this.bigLineChart.allData[2].push(data[i].main.humidity)
            // console.log(this.bigLineChart.allData[0])
          }

          if (i==1){
            this.data.min=((data[i].main.temp_min)-273.15).toFixed(1)
            this.data.max=((data[i].main.temp_max)-273.15).toFixed(1)
            this.data.icon='http://openweathermap.org/img/w/'+(data[i].weather[0].icon)+'.png'
            this.data.sky = data[i].weather[0].description
          }
        } 

        var num=1
        this.data.tableData=[]
        for (var i=0; i<data.length; i+=8){
          var info = new Object();
          info.id = num++
          info.date = (data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"
          info.weather = data[i].weather[0].main
          info.temp = ((data[i].main.temp)-273.15).toFixed(1)
          info.cloud = data[i].clouds.all
          info.cityname = this.data.cityname
          this.data.tableData.push(info)
        }
        })
        
        
      },
      initBigChart(index) {
        let Data = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          // labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          labels: this.data.time
        }
        this.$refs.bigChart.updateGradients(Data);
        this.bigLineChart.chartData = Data;
        this.bigLineChart.activeIndex = index;
      }
    },
    async created(){
      //weather api 불러오기
      const baseURI = 'https://api.openweathermap.org/data/2.5/forecast?q='+this.data.city+','+this.data.country+'&APPID=f771230ab7da7dcecc547d9e600585f5';
      await this.$http.get(`${baseURI}`)
      .then((result)=>{
        var data=result.data
        this.data.cityname = data.city.name + ", "+data.city.country
        data = data.list
        for (var i in data){
          if (i<=10){
            this.data.time.push((data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"+ (data[i].dt_txt).substring(11,13)+"시")
            this.bigLineChart.allData[0].push(((data[i].main.temp)-273.15).toFixed(1))
            this.bigLineChart.allData[1].push(data[i].wind.speed)
            this.bigLineChart.allData[2].push(data[i].main.humidity)
          }
           if (i==1){
            this.data.min=((data[i].main.temp_min)-273.15).toFixed(1)
            this.data.max=((data[i].main.temp_max)-273.15).toFixed(1)
            this.data.icon='http://openweathermap.org/img/w/'+(data[i].weather[0].icon)+'.png'
            this.data.sky = data[i].weather[0].description
          }

        } 

        //테이블
        var num=1
        for (var i=0; i<data.length; i+=8){
          var info = new Object();
          info.id = num++
          info.date = (data[i].dt_txt).substring(5,7) + "월" + (data[i].dt_txt).substring(8,10) + "일"
          info.weather = data[i].weather[0].main
          info.temp = ((data[i].main.temp)-273.15).toFixed(1)
          info.cloud = data[i].clouds.all
          info.cityname = this.data.cityname
          this.data.tableData.push(info)
        }
        
        
      })
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);


      
      


    },
    
  };



</script>
<style>
</style>
