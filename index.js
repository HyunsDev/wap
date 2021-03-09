var api_key = '2c6fbc2a7d3c4252a08a844a37703555'
var school_id = '8140089'
var office_code = 'N10'

var today = moment().format("YYYYMMDD")
var next_month = moment().add("1", "M").format("YYYYMMDD")

console.log(today)
console.log(next_month)

var url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&KEY=${api_key}&ATPT_OFCDC_SC_CODE=${office_code}&SD_SCHUL_CODE=${school_id}&MLSV_FROM_YMD=${today}&MLSV_TO_YMD=${next_month}`

console.log(url)

$.ajax({
    url: url,
    type: 'GET',
    dataType : "json"

}).done(function(json) {
    console.log(json)

    var eat_row = json["mealServiceDietInfo"]
    var eat_memu
    var eat_date
    var eat_day

    if (eat_row[0]['head'][1]['RESULT']['CODE'] == 'INFO-000') {
        console.log("성공")

        eat_row[1]['row'].sort(function(a,b) {
            return a['MLSV_YMD'] < b['MLSV_YMD'] ? -1 : a['MLSV_YMD'] > b['MLSV_YMD'] ? 1 : 0;
        })

        eat_row[1]['row'].forEach(eat => {
            eat_memu = eat['DDISH_NM']
            eat_day = moment(eat['MLSV_YMD']).day()

            if (eat_day == 0) {
                eat_day = "일"
            } else if (eat_day == 1) {
                eat_day = "월"
            } else if (eat_day == 2) {
                eat_day = "화"
            } else if (eat_day == 3) {
                eat_day = "수"
            } else if (eat_day == 4) {
                eat_day = "목"
            } else if (eat_day == 5) {
                eat_day = "금"
            } else if (eat_day == 6) {
                eat_day = "토"
            }

            eat_date = moment(eat['MLSV_YMD']).format('M월 D일') +" ["+ eat_day + "] " + eat['MMEAL_SC_NM']

            $('#memus').append(`
            <div class="memu">
                <div class="memu_date">${eat_date}</div>
                <div class="memu_list">${eat_memu}</div>
            </div>`)
        });
    }


    
}).fail(function(err) {
    console.log("실패")
})